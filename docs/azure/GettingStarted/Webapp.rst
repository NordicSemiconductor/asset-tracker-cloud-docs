.. _azure-getting-started-app:

Deploy the nRF Asset Tracker web application
############################################

.. contents::
   :local:
   :depth: 2

To deploy the :ref:`index-web-app` to Azure, complete the following steps:

1. Clone the project and install the dependencies
#. Configure the web application
#. Deploy the web application
#. Register a new user

Before starting, navigate to the working directory :file:`~/nrf-asset-tracker`.

Clone the project and install the dependencies
**********************************************

Clone the `nRF Asset Tracker web application <https://github.com/NordicSemiconductor/asset-tracker-cloud-app-js>`_ project and install the dependencies:

.. parsed-literal::

    git clone --branch |version| --single-branch \\
      https://github.com/NordicSemiconductor/asset-tracker-cloud-app-js.git web-app
    cd web-app
    npm ci

Configure the web application
*****************************
   
You need to configure the web application to be able to run it with your account.

Configure the IDs of your Azure resources
=========================================

The web application requires the IDs of the Azure resources that were created during the setup of the stack.
Run the following command in the :file:`web-app` directory to copy the output to the :file:`.env.local` file:

.. code-block:: bash

   cd ../azure
   node cli react-config > ../web-app/.env.local
   cd ../web-app

Version string
--------------

Run the following command to provide the version to the application:

.. code-block:: bash

    echo REACT_APP_VERSION=`git describe --tags $(git rev-list --tags --max-count=1)` >> .env.local

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

To build and deploy the web application to the Storage Account created while setting up the nRF Asset Tracker in your Azure account, run the following commands:

.. code-block:: bash

   cd ../azure
   export PUBLIC_URL=`az storage account show -g ${RESOURCE_GROUP:-nrfassettracker} -n ${STORAGE_ACCOUNT_NAME:-nrfassettracker} --query 'primaryEndpoints.web' --output tsv | tr -d '\n'`
   export APP_STORAGE_CONNECTION_STRING=`az storage account show-connection-string --name ${STORAGE_ACCOUNT_NAME:-nrfassettracker} --query 'connectionString'`
   cd ../web-app
   npm run build
   az storage blob service-properties update \
      --connection-string ${APP_STORAGE_CONNECTION_STRING} \
      --account-name ${STORAGE_ACCOUNT_NAME} \
      --static-website \
      --404-document index.html \
      --index-document index.html
   az storage blob upload-batch \
      --connection-string ${APP_STORAGE_CONNECTION_STRING} \
      --account-name ${STORAGE_ACCOUNT_NAME} \
      -s ./build -d '$web'
   echo "Done. Open $PUBLIC_URL to view the web app."

After running the above commands, you can open the domain name printed in ``APP_URL`` in your browser to view the web application.

Register a new user
*******************

Since there are no predefined user accounts in the B2C Active Directory, you need to register a new user.

.. figure:: ./images/register-account.png
    :alt: Register a new user

    Register a new user
