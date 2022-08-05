.. _azure-firmware-ci:

Continuous integration of firmware
##################################

.. contents::
   :local:
   :depth: 2

The Azure implementation of the nRF Asset Tracker provides the resources for continuous testing of the firmware using real hardware.

Overview
********

Every commit to the `firmware repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-azure>`_ will trigger a CI run.
The CI run results in the following actions:

1. Creating a new device and credentials on AWS IoT.
#. Building a firmware that has the device ID hardcoded for the MQTT client ID.
#. Scheduling a run on a self-hosted GitHub Actions runner. See :ref:`azure-firmware_ci_runner_setup`.
#. Observing the firmware CI run until completion.
#. Running assertions against the log result.

The Firmware CI runner is running on a PC connected to GitHub Actions, where it receives the jobs to execute.
The Firmware CI runner performs the following actions:

1. Programming the firmware and the optional credentials using the connected debugger to the connected nRF9160 DK or Thingy:91.
#. Logging all output until one of the following conditions occur:

   * A timeout is reached
   * A stop condition is reached. (Wait for a log output to match a string.)

.. note::

   These devices connect to the existing instance of the nRF Asset Tracker, so the firmware tests will not set up a new empty nRF Asset Tracker Azure environment for every test.
   The test runs against the production environment.
   This is to ensure that the firmware release will work with the existing solution.
   This approach is designed for `trunk-based development <https://thinkinglabs.io/talks/feature-branching-considered-evil.html>`_.

Preparation
***********

Make sure you have successfully deployed the solution (see :ref:`Getting Started <azure-getting-started-deploy>`).

Authenticate GitHub Actions against Azure using OpenID Connect
**************************************************************

To allow the continuous deployment GitHub Action workflow to authenticate against Azure with short-lived credentials using a service principal, complete the following steps:

.. _azure-firmware-ci-configure-service-principal:

1. Follow the instructions to `Configure a service principal with a Federated Credential to use OIDC based authentication <https://github.com/Azure/login#configure-a-service-principal-with-a-federated-credential-to-use-oidc-based-authentication>`_.
   Use ``https://nrfassettracker.invalid/firmware-ci`` as the name.

   On the command line, use the following commands:

   .. code-block:: bash

      az ad app create --display-name 'https://nrfassettracker.invalid/firmware-ci'
      export APPLICATION_OBJECT_ID=`az ad app list | jq -r '.[] | select(.displayName=="https://nrfassettracker.invalid/firmware-ci") | .objectId' | tr -d '\n'`
      # Spaces replaced with _ because of https://github.com/Azure/azure-cli/issues/22550
      az rest --method POST --uri "https://graph.microsoft.com/beta/applications/${APPLICATION_OBJECT_ID}/federatedIdentityCredentials" --body '{"name":"GitHub_Actions","issuer":"https://token.actions.githubusercontent.com","subject":"repo:NordicSemiconductor/asset-tracker-cloud-firmware-azure:environment:production","description":"Allow_GitHub_Actions_to_modify_Azure_resources","audiences":["api://AzureADTokenExchange"]}' 

   Use the organization and repository name of your fork instead of ``NordicSemiconductor/asset-tracker-cloud-firmware-azure`` in the command.

#. Set the secrets:

   - Set the secrets using the GitHub UI:

     Set the following `secrets <https://docs.github.com/en/rest/reference/actions#secrets>`_ to an `environment <https://docs.github.com/en/actions/reference/environments#creating-an-environment>`_ called ``production`` in your fork of the nRF Asset Tracker for Azure:

     * ``AZURE_CLIENT_ID`` - Store the application (client) ID of the service principal app registration created in the previous step.
     * ``AZURE_TENANT_ID`` - Store the directory (tenant) ID of the service principal app registration created in the previous step.
     * ``AZURE_SUBSCRIPTION_ID`` - Store the ID of the subscription containing the nRF Asset Tracker resources.

     Set also the following values from your :file:`.envrc` file as secrets:

     * ``RESOURCE_GROUP``
     * ``LOCATION``
     * ``APP_NAME``

     Set the ``AZURE_IOT_HUB_DPS_ID_SCOPE`` to the output of ``./cli.sh info -o iotHubDpsIdScope``:

     .. code-block:: bash

        # ~/nrf-asset-tracker/azure
  
        ./cli.sh info -o iotHubDpsIdScope

   - Alternatively, set the secrets using the `GitHub CLI <https://cli.github.com/>`_:

     You can use the `GitHub CLI <https://cli.github.com/>`_  with the environment settings from above (make sure to create the ``production`` `deployment environment <https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment>`_ in your repository first):

    .. code-block:: bash

       # ~/nrf-asset-tracker/azure

       export AZURE_CLIENT_ID=`az ad app list | jq -r '.[] | select(.displayName=="https://nrfassettracker.invalid/firmware-ci") | .appId' | tr -d '\n'`
       export AZURE_TENANT_ID=`az account show | jq -r '.tenantId' | tr -d '\n'`
       export AZURE_IOT_HUB_DPS_ID_SCOPE=`./cli.sh info -o iotHubDpsIdScope`

       cd ../firmware

       # ~/nrf-asset-tracker/firmware

       gh secret set AZURE_CLIENT_ID --env production --body "${AZURE_CLIENT_ID}"
       gh secret set AZURE_TENANT_ID --env production --body "${AZURE_TENANT_ID}"
       gh secret set AZURE_IOT_HUB_DPS_ID_SCOPE --env production --body "${AZURE_IOT_HUB_DPS_ID_SCOPE}"
       gh secret set AZURE_SUBSCRIPTION_ID --env production --body "${SUBSCRIPTION_ID}"
       gh secret set RESOURCE_GROUP --env production --body "${RESOURCE_GROUP}"
       gh secret set LOCATION --env production --body "${LOCATION}"
       gh secret set APP_NAME --env production --body "${APP_NAME}"
 
#. Create a service principal for the application:

   .. code-block:: bash

      # ~/nrf-asset-tracker/azure

      export APPLICATION_OBJECT_ID=`az ad sp list | jq -r '.[] | select(.displayName=="https://nrfassettracker.invalid/firmware-ci") | .objectId' | tr -d '\n'`
      az ad sp create --id $APPLICATION_OBJECT_ID

#. Grant the application created in :ref:`Step 1 <azure-firmware-ci-configure-service-principal>` Owner permissions for your resource group:

   .. code-block:: bash

      # ~/nrf-asset-tracker/azure

      export APPLICATION_ID=`az ad sp list --display-name https://nrfassettracker.invalid/firmware-ci | jq -r '.[] | .appId'  | tr -d '\n'`
      az role assignment create --role Owner \
         --assignee ${APPLICATION_ID} \
         --scope /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP:-nrfassettracker}

#. Grant the application created in :ref:`step 1 <azure-firmware-ci-configure-service-principal>` IoT Hub Data Contributor permissions for your IoT hub:

   .. code-block:: bash

      # ~/nrf-asset-tracker/azure

      export APPLICATION_ID=`az ad sp list --display-name https://nrfassettracker.invalid/firmware-ci | jq -r '.[] | .appId'  | tr -d '\n'`
       # role ID 4fc6c259-987e-4a07-842e-c321cc9d413f is "IoT Hub Data Contributor"
       az role assignment create --role 4fc6c259-987e-4a07-842e-c321cc9d413f \
         --assignee ${APPLICATION_ID} \
         --scope /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP:-nrfassettracker}/providers/Microsoft.Devices/IotHubs/${APP_NAME}IotHub

#. Grant the application created in :ref:`step 1 <azure-firmware-ci-configure-service-principal>` Storage Blob Data Contributor permissions for your storage account:

   .. code-block:: bash

      # ~/nrf-asset-tracker/azure

      export APPLICATION_ID=`az ad sp list --display-name https://nrfassettracker.invalid/firmware-ci | jq -r '.[] | .appId'  | tr -d '\n'`
      # role ID ba92f5b4-2d11-453d-a403-e96b0029c9fe is "Storage Blob Data Contributor"
      az role assignment create --role ba92f5b4-2d11-453d-a403-e96b0029c9fe \
      --assignee ${APPLICATION_ID} \
      --scope /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP:-nrfassettracker}/providers/Microsoft.Storage/storageAccounts/${APP_NAME}storage

.. _azure-firmware_ci_runner_setup:

Firmware CI runner setup
************************

To set up the Firmware CI runner, complete the following steps:

1. Prepare an environment that fulfills the :ref:`necessary system requirements <system-requirements>`.
#. Download `JLink <https://www.segger.com/downloads/jlink/>`_ for your platform, and ensure that :file:`JLinkExe` is in your path.
#. Follow `the instruction about self-hosted runners <https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners>`_ to set up a runner for your firmware repository.
   Make sure to use ``firmware-ci`` when prompted for the labels.

The Firmware CI starts to process all the scheduled jobs one after another.
