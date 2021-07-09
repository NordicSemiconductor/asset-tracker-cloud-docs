.. _aws-nrf-connect-for-cloud-api:

nRF Connect for Cloud API
#########################

You can enable the :ref:`cell geolocation lookup <app-cellgeolocation>` for the application using the `nRF Connect for Cloud's geolocation API <https://api.nrfcloud.com/v1/#operation/GetSingleCellLocation>`_  in your deployment.

To use the API, complete the following steps:

1. Configure your API key.
#. Enable the API using the CLI.
#. Redeploy the stack.

Use the following commands:

.. parsed-literal::
    :class: highlight

    node cli configure thirdParty nrfconnectforcloud apiKey *API key*
    node cli configure context stack nrfconnectforcloud 1
    npx cdk deploy '*'

This will update the StateMachine, which resolves cells from devices to use the nRF Connect for Cloud's API as a resolver.
