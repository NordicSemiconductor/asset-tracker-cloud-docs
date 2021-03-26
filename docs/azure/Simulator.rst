Connect using the simulator
###########################

The CLI provides a software implementation of Cat Tracker for *testing purposes*.
It allows the verification of the cloud configuration.
This feature is also used for testing the nRF Asset Tracker using :ref:`Continuous Integration <azure-continuous-integration>` .

To connect to a device and control the device using the simulator, complete the following steps:

* Create certificates for the device
* Connect to the device
* Use the device simulator web application to control the device

Running the simulator
*********************

To create certificates for a simulated device, run the following command:

.. code-block:: bash

    node create-device-cert

After executing the above command you can run the device simulator using ``npm exec -- @nordicsemiconductor/asset-tracker-cloud-device-simulator-azure "</path/to/certificate.json>"``.

.. note::

    The device simulator will print a link to the device simulator web application.
    For the link to work, either enable :ref:`Continuous Deployment <azure-continuous-deployment>`, or :ref:`manually deploy the device simulator web application <manually_deploy_device_sim>`.

Using the device simulator web application
******************************************

The `device-ui <https://github.com/NordicSemiconductor/asset-tracker-cloud-device-ui-js>`_ project provides a browser-based UI to control the simulated device.

.. figure:: ../aws/device-simulator.png
   :alt: Device simulator web application

   Device simulator web application

Clone the project and install dependencies
==========================================

Clone the latest version of the device-ui project and install the dependencies:

.. code-block:: bash

    git clone https://github.com/NordicSemiconductor/asset-tracker-cloud-device-ui-js device-ui
    cd device-ui
    npm ci

Run the device simulator web application
========================================

You can run the device simulator web application by using the following command:

.. code-block:: bash

    npm run

After executing the above command, copy the connection string printed from ``npm exec -- @nordicsemiconductor/asset-tracker-cloud-device-simulator-azure "</path/to/certificate.json>"`` (for example, ``?endpoint=http%3A%2F%2Flocalhost%3A23719``) and append it to the browser address. (for example, ``http://localhost:8080/?endpoint=http%3A%2F%2Flocalhost%3A23719``).

.. _manually_deploy_device_sim:

Deploying the device simulator web application
**********************************************

To build and setup the device simulator web application to the storage account created when setting up the nRF Asset Tracker in your Azure account, run the following commands:

.. code-block:: bash

    cd ../azure
    export $(cd ../azure && node cli device-ui-config | xargs)
    export APP_NAME=${APP_NAME:-nrfassettracker}
    cd ../device-ui
    export SNOWPACK_PUBLIC_VERSION=`git describe --tags $(git rev-list --tags --max-count=1)`

    npm run build

    export DEVICE_UI_STORAGE_CONNECTION_STRING=`az storage account show-connection-string --name ${APP_NAME}deviceui --query 'connectionString'` 
    az storage blob service-properties update --connection-string ${DEVICE_UI_STORAGE_CONNECTION_STRING} --account-name ${APP_NAME}deviceui --static-website --404-document index.html --index-document index.html
    az storage blob upload-batch --connection-string ${DEVICE_UI_STORAGE_CONNECTION_STRING} --account-name ${APP_NAME}deviceui -s ./build -d '$web'

    echo "Done. Now open $SNOWPACK_PUBLIC_DEVICE_UI_BASE_URL to view the web app."

After executing the commands, you can open the domain name printed in ``SNOWPACK_PUBLIC_DEVICE_UI_BASE_URL`` to view the device simulator web application.

