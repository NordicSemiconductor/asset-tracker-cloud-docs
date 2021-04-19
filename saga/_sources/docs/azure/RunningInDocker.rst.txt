.. _azure-running-app-locally:

Running the application locally with Docker
###########################################

If your system has a different version of Node.js, you can run the application locally in a `Docker container <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/blob/saga/Dockerfile>`_.

To run the application locally with Docker, complete the following steps:

1. Export the function app configuration as environment variables:

   .. code-block:: bash

      node cli functions-settings > local.settings.json

#. Either `Authenticate against the Google Container registry <https://docs.github.com/en/packages/guides/pushing-and-pulling-docker-images#authenticating-to-github-container-registry>`_  or build the Docker image using the following command:

     .. code-block:: bash

      docker build -t ghcr.io/nordicsemiconductor/asset-tracker-cloud-azure-js .

#. Run the function app by using the following command:

   .. code-block:: bash

       docker run --rm --net=host -P \
           -e IOT_HUB_CONNECTION_STRING \
           -e AVATAR_STORAGE_ACCOUNT_NAME \
           -e AVATAR_STORAGE_ACCESS_KEY \
           -e FOTA_STORAGE_ACCOUNT_NAME \
           -e FOTA_STORAGE_ACCESS_KEY \
           -e HISTORICAL_DATA_COSMOSDB_CONNECTION_STRING \
           -e UNWIREDLABS_API_KEY \
           -e UNWIREDLABS_API_ENDPOINT \
           -v ${PWD}:/workdir ghcr.io/nordicsemiconductor/asset-tracker-cloud-azure-js \
           func start --typescript

You can now use ``http://localhost:7071/`` as your ``REACT_APP_AZURE_API_ENDPOINT`` for the app.
