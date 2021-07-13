.. _azure-continuous-deployment:

Continuous deployment
#####################

.. contents::
   :local:
   :depth: 2

You can automatically deploy all changes that you make to a fork of the nRF Asset Tracker for Azure.

.. note::

   It is optional to keep the deployment in your Azure account automatically synchronized with your fork's source code repository.

Fork the nRF Asset Tracker repositories
***************************************

To enable continuous deployment, complete the following steps:

1. Fork the `nRF Asset Tracker for Azure repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js>`_.

#. Fork the `Cat Tracker web application repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-app-js>`_.

#. Update the `deploy.webApp.repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/blob/fd3777cde331286faf10e481bdf1a30327882008/package.json#L111>`_ in the :file:`package.json` file of your nRF Asset Tracker for Azure fork. It must point to the repository URL of your fork of the Cat Tracker web application.

Acquire credentials for GitHub Actions
**************************************

To acquire credentials for GitHub Actions, complete the following steps:

1. Login using the shell:

   .. code-block:: bash

      az login

#. Export the identifier of the subscription which contains the nRF Asset Tracker resources:

   .. parsed-literal::
      :class: highlight

      export SUBSCRIPTION_ID="*subscription id*"

#. Make sure that you have enabled the correct subscription by running the following commands:

   .. code-block:: bash

      az account set --subscription $SUBSCRIPTION_ID
      # Verify that it is set to default
      az account list --output table

#. Create the CI credentials:

   .. code-block:: bash

      az ad sp create-for-rbac --name 'https://nrfassettracker.invalid/cd' --role contributor \
         --scopes \
            "/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP:-nrfassettracker}" \
         --sdk-auth \
         > cd-credentials.json

Provide the credentials to GitHub Actions
*****************************************

1. Add the following `secrets <https://docs.github.com/en/rest/reference/actions#secrets>`_ to an `environment <https://docs.github.com/en/actions/reference/environments#creating-an-environment>`_ called ``production`` in your fork of the nRF Asset Tracker for Azure:

   * ``AZURE_CREDENTIALS`` - Store the contents of the JSON file created in the above step.
  
#. Add the following following values from your :file:`.envrc` file as secrets as well:

   * ``RESOURCE_GROUP``
   * ``LOCATION``
   * ``APP_NAME``
   * ``B2C_TENANT``
   * ``APP_REG_CLIENT_ID``

#. If you have enabled the :ref:`azure-unwired-labs-cell-geolocation`, add your API key as a secret as well:

   * ``UNWIRED_LABS_API_KEY``

Trigger a deployment
********************

Commit a change to your fork to trigger a deployment.

Check the status of the continuous deployment
*********************************************

To check the status of the continuous deployment after making the changes, navigate to the :guilabel:`Actions` tab of your fork.
You can see a workflow run of the Continuous Deployment action:

.. figure:: ./actions.png
   :alt: GitHub Actions workflow run of Continuous Deployment

   GitHub Actions workflow run of Continuous Deployment
