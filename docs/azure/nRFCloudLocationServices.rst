.. _azure-nrf-cloud-location-services:

nRF Cloud Location Services
###########################

Cell Location Service
*********************

You can enable the :ref:`cell geolocation lookup <app-cellgeolocation>` for single cells and neighboring cell reports for the application using `nRF Cloud's Cell Location Service API <https://api.nrfcloud.com/v1#tag/Cell-Position>`_ in your deployment.

To use the API, set the ``enableNrfCloudCellLocation`` parameter to ``true`` and set the ``nrfCloudTeamId`` parameter to your team ID when deploying the solution.

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
            enableNrfCloudCellLocation=true \\
            nrfCloudTeamId=*your team ID*

This command enables the ``geolocateCellFromNrfCloud`` function to resolve cells.
Otherwise, this function returns a ``402`` status on the API route ``cellgeolocation/nrfcloud``.

Store the service key into the key vault as follows:

.. parsed-literal::
   :class: highlight

   az keyvault secret set --vault-name ${APP_NAME:-nrfassettracker} \\
     --name nrfCloudCellLocationServiceKey \\
     --file *location of your Cell Location Service Key file*
