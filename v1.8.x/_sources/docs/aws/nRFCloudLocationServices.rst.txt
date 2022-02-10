.. _aws-nrf-cloud-location-services:

nRF Cloud Location Services
###########################

Prerequisites
*************

To use any nRF Cloud Location Service, you need to configure your team ID.

Run the following command to configure your team ID:

.. parsed-literal::
    :class: highlight

    node cli configure thirdParty nrfcloud teamId *your team ID*

Cell Location Service
*********************

You can enable the :ref:`cell geolocation lookup <app-cellgeolocation>` for single cells and neighboring cell reports for the application using `nRF Cloud's Cell Location Service API <https://api.nrfcloud.com/v1#tag/Cell-Position>`_ in your deployment.

To use the API, complete the following steps:

1. Configure your service key.
#. Enable the API using the CLI.
#. Redeploy the stack.

Use the following commands:

.. parsed-literal::
    :class: highlight

    cat *location of your Cell Location Service Key file* | node cli configure thirdParty nrfcloud cellLocationServiceKey
    node cli configure context stack nrfcloudCellLocation 1
    npx cdk deploy '*'

This will update the StateMachine, which resolves cells from devices to use the nRF Cloud API as a resolver.

Assisted GPS Location Service
*****************************

You can enable your devices to request assisted GPS data using `nRF Cloud's Assisted GPS Location Service API <https://api.nrfcloud.com/v1#tag/Assisted-GPS>`_ in your deployment.

To use the API, complete the following steps:

1. Configure your service key.
#. Enable the API using the CLI.
#. Redeploy the stack.

Use the following commands:

.. parsed-literal::
    :class: highlight

    cat *location of your Assisted GPS Location Service key file* | node cli configure thirdParty nrfcloud agpsLocationServiceKey
    node cli configure context stack nrfcloudAGPS 1
    npx cdk deploy '*'

This will update the StateMachine, which resolves A-GPS request from devices to use the nRF Cloud API as a resolver.

Predicted GPS Location Service
******************************

You can enable your devices to request predicted GPS data using `nRF Cloud's Predicted GPS Location Service API <https://api.nrfcloud.com/v1#tag/Predicted-GPS>`_ in your deployment.

To use the API, complete the following steps:

1. Configure your service key.
#. Enable the API using the CLI.
#. Redeploy the stack.

Use the following commands:

.. parsed-literal::
    :class: highlight

    cat *location of your Predicted GPS Location Service key file* | node cli configure thirdParty nrfcloud pgpsLocationServiceKey
    node cli configure context stack nrfcloudPGPS 1
    npx cdk deploy '*'

This will update the StateMachine, which resolves P-GPS request from devices to use the nRF Cloud API as a resolver.
