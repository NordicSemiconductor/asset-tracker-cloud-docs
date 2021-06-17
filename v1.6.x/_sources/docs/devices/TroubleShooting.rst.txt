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

GPS
***

Error: GPS_EVT_OPERATION_BLOCKED
================================

This error occurs if the network provider does not grant Power Saving Mode (PSM) and the GPS takes a long time to acquire a fix.
For more details, see the `DevZone post related to the GPS and LTE issue <https://devzone.nordicsemi.com/f/nordic-q-a/51962/gps-and-lte-issue/210272#210272>`_.

Try switching to a SIM card that grants PSM.

Alternatively, use assisted GPS (A-GPS) to speed up the time to fix.

.. only:: v1_5_x

    One form of A-GPS is using SUPL and it can be optionally enabled in the firmware using the `SUPL client  <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/include/supl_os_client.html>`_.
    The `nRF Asset Tracker firmware project <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-aws/pull/9>`_ optionally supports building the firmware images with SUPL enabled.

.. only:: not v1_5_x

    One form of A-GPS is using SUPL and it can be optionally enabled in the firmware using the `SUPL client  <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/include/supl_os_client.html>`_.
    The nRF Asset Tracker firmware projects `for AWS <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-aws/pull/9>`_ and `for Azure <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-azure#supl-client>`_ optionally support building the firmware images with SUPL enabled.

.. note::

    A-GPS data is downloaded after every restart of the device and the data is around 30 KB in size.

GPS timeout configuration
=========================

Since the `firmware does not currently support A-GPS <https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/discussions/9>`_, depending on the device location, it can take a long time to acquire a GPS fix.
Therefore, select a timeout of at least 1000 seconds in the web application.
