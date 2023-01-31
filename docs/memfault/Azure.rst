.. _azure-memfault-integration:

Memfault integration for Azure
##############################

.. contents::
   :local:
   :depth: 2

.. include:: ./Index.rst
   :start-after: intro_start 
   :end-before: intro_end

You can use the integration standalone without an existing instance of :ref:`nRF Asset Tracker for Azure <azure-getting-started>`.

Prerequisites
*************

Before you start setting up the Memfault integration for Azure, make sure that you fulfill the following prerequisites:

.. include:: ../azure/GettingStarted/Index.rst
   :start-after: prerequisites_start
   :end-before: prerequisites_end

Clone the project and install the dependencies
**********************************************

To clone the `nRF Asset Tracker Memfault integration for Azure IoT Hub <https://github.com/NordicSemiconductor/asset-tracker-cloud-memfault-azure-js>`_ project and install the dependencies, use the following commands:

.. parsed-literal::

    git clone --branch |version| --single-branch \\
      https://github.com/NordicSemiconductor/asset-tracker-cloud-memfault-azure-js memfault-azure
    
    cd memfault-azure 
    
    # Install the dependencies
    npm ci
    
Configure Memfault settings
***************************

You can retrieve the project settings from the settings page of the Memfault dashboard of your organization.

.. parsed-literal::
   :class: highlight

   az keyvault secret set --vault-name ${KEY_VAULT_NAME:-assetTracker} --name memfaultProjectKey --value *<your memfault project key>*
   az keyvault secret set --vault-name ${KEY_VAULT_NAME:-assetTracker} --name memfaultOrganization --value *<your organization slug>*
   az keyvault secret set --vault-name ${KEY_VAULT_NAME:-assetTracker} --name memfaultProject --value *<your project slug>*

Administrators can access and manage the organization authorization token at :guilabel:`Admin` > :guilabel:`Organization Auth Tokens` in the Memfault UI.

.. parsed-literal::
   :class: highlight

   az keyvault secret set --vault-name ${KEY_VAULT_NAME:-assetTracker} --name memfaultAuthToken --value *<your auth token>*

Deploy the solution to your Azure account
*****************************************

This adds the Memfault integration to the existing nRF Asset Tracker for Azure resources.

.. code-block:: bash

   az deployment group create \
   --mode Incremental \
   --name memfault-integration-deployment \
   --resource-group ${RESOURCE_GROUP:-nrfassettracker} \
   --template-file memfault-integration.bicep \
   --parameters \
      appName=${APP_NAME:-nrfassettracker} \
      keyVaultName=${KEY_VAULT_NAME:-assetTracker} \
      storageAccountName=${STORAGE_ACCOUNT_NAME:-nrfassettrackermemfault}
   # Deploy the functions
   npx tsc
   npx tsx scripts/pack-app.ts
   az functionapp deployment source config-zip -g ${RESOURCE_GROUP:-nrfassettracker} -n ${APP_NAME:-nrfassettracker}-memfault-integration --src dist/functionapp.zip

If the command gives an error, you can find the detailed log message using the printed tracking ID and the following command:

.. parsed-literal::
   :class: highlight

   az monitor activity-log list --correlation-id "*tracking ID*" \\
      | jq '.[].properties.statusMessage | fromjson'

It can take a few minutes for the detailed log message to be populated.

If the error message does not include a tracking ID, navigate to the resource group in the Azure portal and review the deployments.
There is a failed deployment called ``memfault-integration-deployment``.
Examine its error details.