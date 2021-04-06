.. _simulator:

Connect using the simulator
###########################

.. contents::
   :local:
   :depth: 2

The CLI provides a software implementation of the firmware for *testing purposes*.
This implementation allows to verify that the cloud configuration works, and this feature is also used for testing the nRF Asset Tracker using :ref:`aws-continuous-integration`.

To connect to a device and control the device using the simulator, complete the following steps:

* Create certificates for the device
* Connect to the device
* Use the device simulator UI to control the device

To create certificates for a simulated device, run the following command:

.. code-block:: bash

    node create-device-cert

As the next step, you can run a simulated device using the generated certificate by running the following command:

.. code-block:: bash

    npm exec -- @nordicsemiconductor/asset-tracker-cloud-device-simulator-aws "</path/to/certificate.json>"

The device simulator will print an endpoint to use with the device simulator UI.

Using the device simulator UI
*****************************

The `device-ui <https://github.com/NordicSemiconductor/device-ui>`_ provides a browser-based UI to control the simulated device.

.. figure:: ./device-simulator.png
   :alt: Device simulator UI

   Device simulator UI   

To use the device simulator UI, complete the following steps:

* Clone the project and install the dependencies
* Run the device simulator UI

Clone the project and install the dependencies
==============================================

Clone the latest version of the `device-ui`_ project and install the dependencies:

.. code-block:: bash

    git clone https://github.com/NordicSemiconductor/asset-tracker-cloud-device-ui-js.git cat-tracker-device-ui
    cd cat-tracker-device-ui
    npm ci

Run the device simulator UI
===========================

You can run the device simulator UI by using the following command:

.. code-block:: bash

    npm run

After executing the above command, copy the endpoint printed from ``npm exec -- @nordicsemiconductor/asset-tracker-cloud-device-simulator-aws "</path/to/certificate.json>"`` (for example, ``http://localhost:25336``) and use it in the device simulator UI.

.. _deploy_dev_sim_web_app:

Deploying the device simulator UI
*********************************

To build and setup the device simulator UI to the S3 bucket created when setting up the nRF Asset Tracker in your AWS account, run the following commands:

.. code-block:: bash

    export $(cd ../aws && node cli device-ui-config | xargs) 
    npm run build
    aws s3 cp build s3://$SNOWPACK_PUBLIC_DEVICE_UI_BUCKET_NAME \
    --recursive --metadata-directive REPLACE \
    --cache-control 'public,max-age=600' --expires ''
    aws cloudfront create-invalidation --distribution-id \
    $SNOWPACK_PUBLIC_CLOUDFRONT_DISTRIBUTION_ID_DEVICE_UI --paths /,/index.html
    echo "Done. Now open $SNOWPACK_PUBLIC_DEVICE_UI_BASE_URL to view the web app."

After executing the above commands, you can open the domain name printed in ``SNOWPACK_PUBLIC_DEVICE_UI_BASE_URL`` to view the device simulator UI.
