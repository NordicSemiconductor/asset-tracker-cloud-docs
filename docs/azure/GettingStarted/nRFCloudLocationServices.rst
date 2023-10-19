.. _azure-nrf-cloud-location-services:

nRF Cloud Location Services
###########################

nRF Cloud Location Services are an essential component of any asset tracking solution and nRF Asset Tracker makes heavy use of them.

Configuring the Service Key
***************************

Store the service key into the key vault as follows:

.. parsed-literal::
   :class: highlight

   # Grant the current user set permission to the key vault secrets
   USER_OBJECT_ID=`az ad signed-in-user show --query objectId -o tsv`
   az role assignment create --role "Key Vault Secrets Officer" \
       --assignee-object-id ${USER_OBJECT_ID} \
       --scope /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP:-nrfassettracker}/providers/Microsoft.KeyVault/vaults/${APP_NAME:-nrfassettracker}
    
   # Store the API key
   az keyvault secret set --vault-name ${APP_NAME:-nrfassettracker} \\
     --name nrfCloudServiceKey \\
     --file *location of your Service Key file*
