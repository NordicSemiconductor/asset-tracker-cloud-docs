.. _aws-nrf-cloud-location-services:

nRF Cloud Location Services
###########################

nRF Cloud Location Services are an essential component of any asset tracking solution and nRF Asset Tracker makes heavy use of them.

Prerequisites
*************

To use any nRF Cloud Location Service, you need to configure your team ID.

You can locate in in your nRF Cloud Account Dashboard.

Run the following command to configure your team ID:

.. parsed-literal::
    :class: highlight

    ./cli.sh configure thirdParty nrfcloud teamId *your team ID*

Configuring the Service Key
***************************

Enabling `nRF Cloud's Ground Fix Service API <https://api.nrfcloud.com/v1#tag/Ground-Fix>`_ provides location approximation for the devices.

Acquire your Location Services Service Key and use the following command to configure it:

.. parsed-literal::
    :class: highlight

    cat *location of your Ground Fix Service Key file* | ./cli.sh configure thirdParty nrfcloud serviceKey

This will setup a StateMachine, which resolves the geolocation for single cell, neighboring cell, and Wi-Fi site surveys sent by devices.

