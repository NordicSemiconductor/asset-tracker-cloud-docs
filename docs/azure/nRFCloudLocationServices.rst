.. _azure-nrf-cloud-location-services:

nRF Cloud Location Services
###########################

Cell Location Service
*********************

You can enable the :ref:`cell geolocation lookup <app-cellgeolocation>` for single cells and neighboring cell reports for the application using `nRF Cloud's Cell Location Service API <https://api.nrfcloud.com/v1#tag/Cell-Position>`_ in your deployment.

To use the API, set the ``enableNrfCloudCellLocationService`` parameter to ``true`` and set the ``nrfCloudTeamId`` parameter to your team ID when deploying the solution.

.. parsed-literal::
   :class: highlight

    az deployment group create \\
        --resource-group ${RESOURCE_GROUP:-nrfassettracker} \\
        --mode Complete \\
        --name enable-unwiredlabs \\
        --template-file azuredeploy.json \\
        --parameters \\
            appName=${APP_NAME:-nrfassettracker} \\
            appRegistrationClientId=$APP_REG_CLIENT_ID \\
            b2cTenant=${B2C_TENANT:-nrfassettrackerusers} \\
            keyVaultName=${APP_NAME:-nrfassettracker} \\
            enableNrfCloudCellLocationService=true \\
            nrfCloudTeamId=*your team ID*

This command enables the ``geolocateCellFromNrfCloud`` function to resolve cells.
Otherwise, this function returns a ``402`` status on the API route ``cellgeolocation/nrfcloud``.

Store the service key into the key vault as follows:

.. parsed-literal::
   :class: highlight

   # Grant the current user set permission to the key vault secrets
   USER_OBJECT_ID=`az ad signed-in-user show --query objectId -o tsv`
   az keyvault set-policy --name ${keyVaultName} --object-id ${USER_OBJECT_ID} --secret-permissions set
    
   # Store the API key
   az keyvault secret set --vault-name ${APP_NAME:-nrfassettracker} \\
     --name nrfCloudCellLocationServiceKey \\
     --file *location of your Cell Location Service Key file*

Assisted GPS Location Service
*****************************

You can enable your devices to request assisted GPS (A-GPS) data using `nRF Cloud's Assisted GPS Location Service API <https://api.nrfcloud.com/v1#tag/Assisted-GPS>`_ in your deployment.

To use the API, set the ``enableNrfCloudAGPSLocationService`` parameter to ``true`` and set the ``nrfCloudTeamId`` parameter to your team ID when deploying the solution.

.. parsed-literal::
   :class: highlight

    az deployment group create \\
        --resource-group ${RESOURCE_GROUP:-nrfassettracker} \\
        --mode Complete \\
        --name enable-unwiredlabs \\
        --template-file azuredeploy.json \\
        --parameters \\
            appName=${APP_NAME:-nrfassettracker} \\
            appRegistrationClientId=$APP_REG_CLIENT_ID \\
            b2cTenant=${B2C_TENANT:-nrfassettrackerusers} \\
            keyVaultName=${APP_NAME:-nrfassettracker} \\
            enableNrfCloudAGPSLocationService=true \\
            nrfCloudTeamId=*your team ID*

This command enables the ``agpsQueuedDeviceRequestsHandler`` function to resolve A-GPS requests from devices using the nRF Cloud Assisted GPS Location Service API.

Store the service key into the key vault as follows:

.. parsed-literal::
   :class: highlight

   # Grant the current user set permission to the key vault secrets
   USER_OBJECT_ID=`az ad signed-in-user show --query objectId -o tsv`
   az keyvault set-policy --name ${keyVaultName} --object-id ${USER_OBJECT_ID} --secret-permissions set

   # Store the API key
   az keyvault secret set --vault-name ${APP_NAME:-nrfassettracker} \\
     --name nrfCloudAGPSLocationServiceKey \\
     --file *location of your Assisted GPS Location Service Key file*

Predicted GPS Location Service
******************************

You can enable your devices to request predicted GPS (P-GPS) data using `nRF Cloud's Predicted GPS Location Service API <https://api.nrfcloud.com/v1#tag/Predicted-GPS>`_ in your deployment.

To use the API, set the ``enableNrfCloudPGPSLocationService`` parameter to ``true`` and set the ``nrfCloudTeamId`` parameter to your team ID when deploying the solution.

.. parsed-literal::
   :class: highlight

    az deployment group create \\
        --resource-group ${RESOURCE_GROUP:-nrfassettracker} \\
        --mode Complete \\
        --name enable-unwiredlabs \\
        --template-file azuredeploy.json \\
        --parameters \\
            appName=${APP_NAME:-nrfassettracker} \\
            appRegistrationClientId=$APP_REG_CLIENT_ID \\
            b2cTenant=${B2C_TENANT:-nrfassettrackerusers} \\
            keyVaultName=${APP_NAME:-nrfassettracker} \\
            enableNrfCloudPGPSLocationService=true \\
            nrfCloudTeamId=*your team ID*

This command enables the ``pgpsQueuedDeviceRequestsHandler`` function to resolve P-GPS requests from devices using the nRF Cloud Predicted GPS Location Service API.

Store the service key into the key vault as follows:

.. parsed-literal::
   :class: highlight

   # Grant the current user set permission to the key vault secrets
   USER_OBJECT_ID=`az ad signed-in-user show --query objectId -o tsv`
   az keyvault set-policy --name ${keyVaultName} --object-id ${USER_OBJECT_ID} --secret-permissions set

   # Store the API key
   az keyvault secret set --vault-name ${APP_NAME:-nrfassettracker} \\
     --name nrfCloudPGPSLocationServiceKey \\
     --file *location of your Predicted GPS Location Service Key file*