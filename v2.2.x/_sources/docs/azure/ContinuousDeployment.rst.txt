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

#. Fork the `nRF Asset Tracker web application repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-app-js>`_.

#. Update the `deploy.webApp.repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/blob/fd3777cde331286faf10e481bdf1a30327882008/package.json#L111>`_ in the :file:`package.json` file of your nRF Asset Tracker for Azure fork. It must point to the repository URL of your fork of the nRF Asset Tracker web application.

Authenticate GitHub Actions against Azure using OpenID Connect
**************************************************************

To allow the continuous deployment GitHub Action workflow to authenticate against Azure with short-lived credentials using a service principal, complete the following steps:

.. _azure-continuous-deployment-configure-service-principal:

1. Follow the instructions to `Configure a service principal with a Federated Credential to use OIDC based authentication <https://github.com/Azure/login#configure-a-service-principal-with-a-federated-credential-to-use-oidc-based-authentication>`_.
   Use ``https://nrfassettracker.invalid/cd`` as the name.

   On the command line, use the following commands:

   .. code-block:: bash

      az ad app create --display-name 'https://nrfassettracker.invalid/cd'
      export APPLICATION_OBJECT_ID=`az ad app list | jq -r '.[] | select(.displayName=="https://nrfassettracker.invalid/cd") | .id' | tr -d '\n'`
      az rest --method POST --uri "https://graph.microsoft.com/beta/applications/${APPLICATION_OBJECT_ID}/federatedIdentityCredentials" --body '{"name":"GitHubActions","issuer":"https://token.actions.githubusercontent.com","subject":"repo:NordicSemiconductor/asset-tracker-cloud-azure-js:environment:production","description":"Allow GitHub Actions to modify Azure resources","audiences":["api://AzureADTokenExchange"]}' 

   Use the organization and repository name of your fork instead of ``NordicSemiconductor/asset-tracker-cloud-azure-js`` in the command.

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
     * ``B2C_TENANT``
     * ``APP_REG_CLIENT_ID``

     If you have enabled the :ref:`azure-unwired-labs-cell-geolocation`, add your API key ``UNWIRED_LABS_API_KEY`` as a secret as well.

   - Alternatively, set the secrets using the `GitHub CLI <https://cli.github.com/>`_:

     You can use the `GitHub CLI <https://cli.github.com/>`_  with the environment settings from above (make sure to create the ``production`` `deployment environment <https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment>`_ in your repository first):

    .. code-block:: bash

       export AZURE_CLIENT_ID=`az ad app list | jq -r '.[] | select(.displayName=="https://nrfassettracker.invalid/cd") | .appId' | tr -d '\n'`
       export AZURE_TENANT_ID=`az ad sp show --id ${AZURE_CLIENT_ID} | jq -r '.appOwnerOrganizationId' | tr -d '\n'`
       gh secret set AZURE_CLIENT_ID --env production --body "${AZURE_CLIENT_ID}"
       gh secret set AZURE_TENANT_ID --env production --body "${AZURE_TENANT_ID}"
       gh secret set AZURE_SUBSCRIPTION_ID --env production --body "${SUBSCRIPTION_ID}"
       gh secret set RESOURCE_GROUP --env production --body "${RESOURCE_GROUP}"
       gh secret set LOCATION --env production --body "${LOCATION}"
       gh secret set APP_NAME --env production --body "${APP_NAME}"
       gh secret set B2C_TENANT --env production --body "${B2C_TENANT}"
       gh secret set APP_REG_CLIENT_ID --env production --body "${APP_REG_CLIENT_ID}"

#. Grant the application created in :ref:`step 1 <azure-continuous-deployment-configure-service-principal>` Owner permissions for your resource group:

   .. code-block:: bash

      export AZURE_CLIENT_ID=`az ad app list | jq -r '.[] | select(.displayName=="https://nrfassettracker.invalid/cd") | .appId' | tr -d '\n'`
      az role assignment create --role Owner \
         --assignee ${AZURE_CLIENT_ID} \
         --scope /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP:-nrfassettracker}

#. Grant the application created in :ref:`step 1 <azure-continuous-deployment-configure-service-principal>` "Key Vault Secrets Officer" rights to the KeyVault:

   .. code-block:: bash

      export AZURE_CLIENT_ID=`az ad app list | jq -r '.[] | select(.displayName=="https://nrfassettracker.invalid/cd") | .appId' | tr -d '\n'`
      az role assignment create --role "Key Vault Secrets Officer" \
         --assignee ${AZURE_CLIENT_ID} \
         --scope /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP:-nrfassettracker}/providers/Microsoft.KeyVault/vaults/${APP_NAME:-nrfassettracker}

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

More information
****************

For more details about how GitHub Actions uses OIDC, read `About security hardening with OpenID Connect <https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect>`_ in the GitHub Actions documentation.
