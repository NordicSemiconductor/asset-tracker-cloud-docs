.. _aws-nrf-connect-for-cloud-api:

nRF Connect for Cloud API
#########################

You can enable the :ref:`cell geolocation lookup <app-cellgeolocation>` for the application using the `nRF Connect for Cloud's geolocation API <https://api.nrfcloud.com/v1/#operation/GetSingleCellLocation>`_  in your deployment.

To use nRF Connect for Cloud's geolocation API, configure your API key using the CLI and redeploy the stack using the following commands:

.. parsed-literal::
    :class: highlight

    node cli configure-api cellGeoLocation nrfconnectforcloud apiKey *API key*
    npx cdk -c nrfconnectforcloud=1 deploy '*'

This will update the StateMachine, which resolves cells from devices to use the nRF Connect for Cloud's API as a resolver.
