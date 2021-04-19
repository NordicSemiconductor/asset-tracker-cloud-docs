.. _azure-getting-started-app:

Deploy the Cat Tracker web application
######################################

.. contents::
   :local:
   :depth: 2

To deploy the Cat Tracker web application to Azure, complete the following steps:

1. Configure the web application
#. Deploy the web application
#. Register a new user

Before starting, navigate to the working directory :file:`~/nrf-asset-tracker`.

.. include:: ../../app/Includes.rst
   :start-after: clone_web_app_start
   :end-before: clone_web_app_end

Run-time configuration
**********************
   
.. include:: ../../app/Includes.rst
   :start-after: configure_web_app_start
   :end-before: configure_web_app_end

Configure the IDs of your Azure resources
=========================================

The web application requires the IDs of the Azure resources that were created during the setup of the stack.
Run the following command in the :file:`cat-tracker-web-app` directory to copy the output to the :file:`.env.local` file:

.. code-block:: bash

   cd ../azure
   node cli react-config > ../cat-tracker-web-app/.env.local
   cd ../cat-tracker-web-app

.. include:: ../../app/Includes.rst
   :start-after: provide_versionstring_start
   :end-before: provide_versionstring_end

Example for the .env.local file
-------------------------------

Following is an example for the contents of the :file:`.env.local` file:

.. code-block:: bash

   REACT_APP_CLOUD_FLAVOUR=Azure
   REACT_APP_AZURE_B2C_TENANT=nrfassettrackerprodusers
   REACT_APP_AZURE_CLIENT_ID=fa8d9edc-3a85-455b-bcc4-f7389764184b
   REACT_APP_AZURE_API_ENDPOINT=https://nrfassettrackerprodapi.azurewebsites.net/
   REACT_APP_VERSION=v8.6.50

Deploy the web application
**************************

To build and deploy the web application to the Storage Account created while setting up *Bifravst* in your Azure account, run the following commands:

.. code-block:: bash

   cd ../azure
   export PUBLIC_URL=`az storage account show -g ${RESOURCE_GROUP:-nrfassettracker} -n ${APP_NAME:-nrfassettracker}app --query 'primaryEndpoints.web' --output tsv | tr -d '\n'`
   export APP_STORAGE_CONNECTION_STRING=`az storage account show-connection-string --name ${APP_NAME:-nrfassettracker}app --query 'connectionString'`
   export APP_STORAGE_ACCOUNT_NAME=${APP_NAME:-nrfassettracker}app
   cd ../cat-tracker-web-app
   npm run build
   az storage blob upload-batch --connection-string ${APP_STORAGE_CONNECTION_STRING} --account-name ${APP_STORAGE_ACCOUNT_NAME} -s ./build -d '$web'
   echo "Done. Now open $PUBLIC_URL to view the web app."

After running the above commands, you can open the domain name printed in ``APP_URL`` to view the web application.

Register a new user
*******************

Since there are no predefined user accounts in the B2C Active Directory, you need to register a new user.

.. figure:: ./images/register-account.png
    :alt: Register a new user

    Register a new user
