.. _aws-nrf-cloud-location-services:

nRF Cloud Location Services
###########################

Prerequisites
*************

To use any nRF Cloud Location Service, you need to configure your team ID.

Run the following command to configure your team ID:

.. parsed-literal::
    :class: highlight

    ./cli.sh configure thirdParty nrfcloud teamId *your team ID*

Cell Location Service
*********************

You can enable the :ref:`cell geolocation lookup <app-cellgeolocation>` for single cells and neighboring cell reports for the application using `nRF Cloud's Cell Location Service API <https://api.nrfcloud.com/v1#tag/Ground-Fix>`_ in your deployment.

To use the API, complete the following steps:

1. Configure your service key.
#. Enable the API using the CLI.
#. Redeploy the stack.

Use the following commands:

.. parsed-literal::
    :class: highlight

    cat *location of your Cell Location Service Key file* | ./cli.sh configure thirdParty nrfcloud cellLocationServiceKey
    ./cli.sh configure context stack nrfcloudCellLocation 1
    npx cdk deploy --all

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

    cat *location of your Assisted GPS Location Service key file* | ./cli.sh configure thirdParty nrfcloud agpsLocationServiceKey
    ./cli.sh configure context stack nrfcloudAGPS 1
    npx cdk deploy --all

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

    cat *location of your Predicted GPS Location Service key file* | ./cli.sh configure thirdParty nrfcloud pgpsLocationServiceKey
    ./cli.sh configure context stack nrfcloudPGPS 1
    npx cdk deploy --all

This will update the StateMachine, which resolves P-GPS request from devices to use the nRF Cloud API as a resolver.

Ground Fix Services
*******************

You can enable `nRF Cloud's Ground Fix Service API <https://api.nrfcloud.com/v1#tag/Ground-Fix>`_ to geolocate Wi-Fi site surveys sent by devices in your development.

To use the API, complete the following steps:

1. Configure your service key.
#. Enable the API using the CLI.
#. Redeploy the stack.

Use the following commands:

.. parsed-literal::
    :class: highlight

    cat *location of your Ground Fix Service Key file* | ./cli.sh configure thirdParty nrfcloud groundFixServiceKey
    ./cli.sh configure context stack nrfCloudGroundFix 1
    npx cdk deploy --all

This will setup a StateMachine, which resolves the geolocation for Wi-Fi site surveys sent by devices.

