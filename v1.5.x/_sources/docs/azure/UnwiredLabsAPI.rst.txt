.. _azure-unwired-labs-api:

Unwired Labs API
################

You can enable the :ref:`cell geolocation lookup <app-cellgeolocation>` for the application using `Unwired Labs' <https://unwiredlabs.com/>`_ geolocation API in your deployment.

To use Unwired Labs' LocationAPI, provide the ``unwiredlabsApiKey`` parameter when deploying the solution:

.. code-block:: bash

    az deployment group create --resource-group ${APP_NAME:-nrfassettracker} \
        --mode Complete --name ${APP_NAME:-nrfassettracker} \
        --template-file azuredeploy.json \
        --parameters \
            appName=${APP_NAME:-nrfassettracker} \
            location=$LOCATION appRegistrationClientId=$APP_REG_CLIENT_ID \
            b2cTenant=$B2C_TENANT \
            unwiredlabsApiKey="<your API key>"

This command will enable the `geolocateCellFromUnwiredLabs` function to resolve cells.
Otherwise, this function will return a ``402`` status on the API route ``cellgeolocation/unwired``.

.. note::

   Unwired Lab’s LocationAPI is free for low volumes.
   However, `OpenCellid <https://opencellid.org/#zoom=16&lat=37.77889&lon=-122.41942>`_ allows free use of the underlying dataset.
   If it is relevant for you, vote in the `Integrate OpenCelliD data issue <https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/discussions/5>`_.
