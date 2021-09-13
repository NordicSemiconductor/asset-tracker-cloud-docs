.. _azure-unwired-labs-cell-geolocation:

Unwired Labs Cell Geolocation
#############################

You can enable the :ref:`cell geolocation lookup <app-cellgeolocation>` for single cells for the application using `Unwired Labs' <https://unwiredlabs.com/>`_ geolocation API in your deployment.

To use Unwired Labs' LocationAPI, set the ``enableUnwiredLabsCellLocation`` parameter to ``true`` when deploying the solution:

.. code-block:: bash

    az deployment group create \
        --resource-group ${RESOURCE_GROUP:-nrfassettracker} \
        --mode Complete \
        --name enable-unwiredlabs \
        --template-file azuredeploy.json \
        --parameters \
            appName=${APP_NAME:-nrfassettracker} \
            appRegistrationClientId=$APP_REG_CLIENT_ID \
            b2cTenant=${B2C_TENANT:-nrfassettrackerusers} \
            keyVaultName=${APP_NAME:-nrfassettracker} \
            enableUnwiredLabsCellLocation=true

This command enables the ``geolocateCellFromUnwiredLabs`` function to resolve cells.
Otherwise, this function returns a ``402`` status on the API route ``cellgeolocation/unwired``.

Store the API key into the key vault as follows:

.. parsed-literal::
   :class: highlight

   # Grant the current user set permission to the key vault secrets
   USER_OBJECT_ID=`az ad signed-in-user show --query objectId -o tsv`
   az keyvault set-policy --name ${keyVaultName} --object-id ${USER_OBJECT_ID} --secret-permissions set
   
   # Store the API key
   az keyvault secret set --vault-name ${APP_NAME:-nrfassettracker} \\
     --name unwiredlabsApiKey \\
     --value *your API key*

.. note::

   Unwired Lab’s LocationAPI is free for low volumes.
   However, `OpenCellid <https://opencellid.org/#zoom=16&lat=37.77889&lon=-122.41942>`_ allows to use the underlying dataset for free.
   If you find it relevant, vote in the `Integrate OpenCelliD data issue <https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/discussions/5>`_.
