.. _aws-nrf-connect-for-cloud-api:

nRF Connect for Cloud API
#########################

You can enable the :ref:`cell geolocation lookup <app-cellgeolocation>` for the application using the `nRF Connect for Cloud's geolocation API <https://api.nrfcloud.com/v1/#operation/GetSingleCellLocation>`_  in your deployment.

Creating an API device
**********************

The nRF Connect for Cloud API requires a device identifier for some calls.
It is recommended to create a new device for the API operations.

Create a new device using `httpie <https://httpie.io/>`_:

.. code-block:: bash

    API_KEY="<API Key>" # provide your nRF Connect for Cloud API key
    DEVICE_ID=`uuidgen`
    ENDPOINT=`http https://api.nrfcloud.com/v1/account Authorization:"Bearer ${API_KEY}" | jq -r '.mqttEndpoint'`
    http POST https://api.nrfcloud.com/v1/devices/${DEVICE_ID}/certificates \
        Authorization:"Bearer ${API_KEY}" > -v <<< 1234 \
        | jq --arg endpoint ${ENDPOINT} '. + {brokerHostname: $endpoint}' > ${DEVICE_ID}.json

Connect the device using the device simulator:

.. code-block:: bash

    npm exec -- @nordicsemiconductor/asset-tracker-cloud-device-simulator-aws \
        ${DEVICE_ID}.json

Once it prints ``connected``, you can terminate the simulator.
You can ignore the ``disconnected!`` warnings.

Associate the device to your account:

.. code-block:: bash

    http PUT https://api.nrfcloud.com/v1/association/${DEVICE_ID} \
        Authorization:"Bearer ${API_KEY}" -v <<< 1234

You are now ready to use the device for calls to the nRF Connect for Cloud geolocation API.

Enabling the nRF Connect for Cloud geolocation API
**************************************************

To use nRF Connect for Cloud's geolocation API, configure your API key and API device using the CLI and redeploy the stack using the following commands:

.. parsed-literal::
   class: highlight

    node cli configure-api cellGeoLocation nrfconnectforcloud apiKey *API Key*
    node cli configure-api cellGeoLocation nrfconnectforcloud apiDevice *API device*
    npx cdk -c nrfconnectforcloud=1 deploy '*'

This will update the StateMachine, which resolves cells from devices to use the nRF Connect for Cloud's API as a resolver.
