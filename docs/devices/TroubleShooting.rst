Troubleshooting
###############

.. contents::
   :local:
   :depth: 2

This section lists some common errors and possible solutions to them.

Connection
**********

Error code -22
==============

If you see this error code, verify the client ID, the endpoint, and the certificates.

getaddrinfo, error -11
======================

.. code-block:: text

    <err> aws_iot: getaddrinfo, error -11
    <err> aws_iot: client_broker_init, error: -10

If you see this error, verify that your SIM did not run out of data.

Cellular connection
===================

Since 5G support is currently being deployed by mobile phone network operators, there is a high chance of connection issues in your location.

Try multiple SIM cards from different vendors if you experience connectivity issues.

GNSS
****

Error: GNSS_EVT_OPERATION_BLOCKED
=================================

This error occurs if the network provider does not grant Power Saving Mode (PSM) and the GNSS takes a long time to acquire a fix.
For more details, see the `DevZone post related to the GNSS and LTE issue <https://devzone.nordicsemi.com/f/nordic-q-a/51962/gps-and-lte-issue/210272#210272>`_.

Try switching to a SIM card that grants PSM.

Alternatively, use the nRF Cloud Assisted GPS Location Service to speed up the time to fix.

GNSS timeout configuration
==========================

If the nRF Cloud Assisted GPS Location Service is not used, it can take a long time to acquire a GNSS fix.
Therefore, select a timeout of at least 1000 seconds in the web application.
