.. _azure-upgrade-installation:

Upgrading an existing installation
##################################

If you already have an installation and you want to upgrade to the latest release, perform the following steps:

.. code-block:: bash

    git pull
    npm ci
    npx tsc
    az deployment group create \
        --resource-group ${RESOURCE_GROUP:-nrfassettracker} \
        --mode Complete \
        --name update-`uuidgen` \
        --template-file azuredeploy.json \
        --parameters \
            appName=${APP_NAME:-nrfassettracker} \
            appRegistrationClientId=$APP_REG_CLIENT_ID \
            b2cTenant=${B2C_TENANT:-nrfassettrackerusers} \
            unwiredlabsApiKey=${UNWIRED_LABS_API_KEY}
    func azure functionapp publish ${APP_NAME:-nrfassettracker}API --typescript

Docker variant (in case you get a ``Permission denied.`` error):

.. code-block:: bash

    docker run --rm -v ${PWD}:/workdir -v ${HOME}/.azure:/root/.azure ghcr.io/nordicsemiconductor/asset-tracker-cloud-azure-js:latest \
        func azure functionapp publish ${APP_NAME:-nrfassettracker}API --typescript

.. tip::

   You can verify the validity of a template using the following command:

   .. code-block:: bash

       az deployment group validate \
           --resource-group ${RESOURCE_GROUP:-nrfassettracker} \
           --mode Complete \
           --name update-`uuidgen` \
           --template-file azuredeploy.json \
           --parameters \
               appName=${APP_NAME:-nrfassettracker} \
               appRegistrationClientId=$APP_REG_CLIENT_ID \
               b2cTenant=${B2C_TENANT:-nrfassettrackerusers} \
               unwiredlabsApiKey=${UNWIRED_LABS_API_KEY}

If the command gives an error, you can find the detailed log message using the following command:

.. parsed-literal::
   :class: highlight

    az monitor activity-log list --correlation-id "*tracking id*" \
        | jq '.[].properties.statusMessage | fromjson'

It can take a few minutes for the detailed log message to be populated.
