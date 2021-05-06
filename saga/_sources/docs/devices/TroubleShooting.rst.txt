Troubleshooting
###############

.. contents::
   :local:
   :depth: 2

Following are some of the common errors and the related information.

Connection
**********

Error code ``-22``
==================

Verify the client ID, the endpoint, and the certificates.

Cellular connection
===================

Since 5G support is currently being deployed by mobile phone network operators, there is a high chance of connection issues in your location.

It is generally recommended to try multiple SIM cards from different vendors in case you experience connectivity issues.

GPS
***

Error: ``GPS_EVT_OPERATION_BLOCKED``
====================================

This error occurs if the network provider does not grant Power Saving Mode (PSM) and the GPS takes a long time to acquire a fix.
For more details, see the `DevZone post related to the GPS and LTE issue <https://devzone.nordicsemi.com/f/nordic-q-a/51962/gps-and-lte-issue/210272#210272>`_.

A solution is to switch to a SIM card that grants PSM.

Another solution is to use assisted GPS (A-GPS) to speed up the time to fix.

One form of A-GPS is using SUPL and it can be optionally enabled in the firmware using the `SUPL client  <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/include/supl_os_client.html>`_.
The `nRF Asset Tracker firmware project <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-aws/pull/9>`_ optionally supports building the firmware images with SUPL enabled.

.. note::

    Note that the A-GPS data is downloaded after every boot of the device and the data is around 30 KB in size.

GPS Timeout configuration
=========================

Since the `firmware currently does not support A-GPS <https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/discussions/9>`_, depending on the device location, it can take a long time to acquire a GPS fix.
Therefore, a timeout of at least 1000 seconds must be chosen in the web application.
