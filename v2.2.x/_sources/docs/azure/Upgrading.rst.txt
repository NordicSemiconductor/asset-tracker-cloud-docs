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
            storageAccountName=${STORAGE_ACCOUNT_NAME:-nrfassettracker} \
            appRegistrationClientId=$APP_REG_CLIENT_ID \
            b2cTenant=${B2C_TENANT:-nrfassettrackerusers} \
            keyVaultName=${APP_NAME:-nrfassettracker}
    node scripts/pack-app.js
    az functionapp deployment source config-zip -g ${RESOURCE_GROUP:-nrfassettracker} -n ${APP_NAME:-nrfassettracker}api --src dist/functionapp.zip

To verify the validity of a template, use the following command:

   .. code-block:: bash

       az deployment group validate \
           --resource-group ${RESOURCE_GROUP:-nrfassettracker} \
           --mode Complete \
           --name update-`uuidgen` \
           --template-file azuredeploy.json \
           --parameters \
               appName=${APP_NAME:-nrfassettracker} \
               storageAccountName=${STORAGE_ACCOUNT_NAME:-nrfassettracker} \
               appRegistrationClientId=$APP_REG_CLIENT_ID \
               b2cTenant=${B2C_TENANT:-nrfassettrackerusers} \
               keyVaultName=${APP_NAME:-nrfassettracker}

If the command gives an error, you can find the detailed log message using the printed tracking ID and the following command:

.. parsed-literal::
    :class: highlight

    az monitor activity-log list --correlation-id "*tracking ID*" \\
        | jq '.[].properties.statusMessage | fromjson'

It can take a few minutes for the detailed log message to be populated.

If the error message does not include a tracking ID, navigate to the resource group in the Azure portal and review the deployments.
There is a failed deployment called ``initial-setup``.
Examine its error details.
