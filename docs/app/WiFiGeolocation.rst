.. _app-wifigeolocation:

Wi-Fi geolocation
################

.. contents::
   :local:
   :depth: 2

If Wi-Fi site survey geolocation (Ground Fix service) is implemented, the devices can be shown on the map based on the location of the Wi-Fi access points nearest to them.


Third-party location APIs
*************************

nRF Asset Tracker implements the following third-party location APIs:

 * nRF Cloud Location Services

These APIs enable calculation of the rough location of a device as soon as it sends the information for the nearest Wi-Fi access points to the cloud.

Follow the configuration guide in the respective implementation to enable nRF Cloud's Ground Fix API:

* :ref:`AWS <aws-nrf-cloud-location-services>`

