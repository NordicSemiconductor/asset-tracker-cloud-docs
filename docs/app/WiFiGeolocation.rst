.. _app-wifigeolocation:

WiFi geolocation
################

.. contents::
   :local:
   :depth: 2

If wi-fi site survey geolocation (ground fix service) is implemented, the devices can be shown on the map based on the location of their nearest wi-fi access points.


Third-party location APIs
*************************

nRF Asset Tracker implements the following third-party location APIs:

 - nRF Cloud Location Services

These APIs enable calculation of the rough location of a device as soon as it sends the nearest wi-fi access points information to the cloud.

Follow the configuration guide in the respective implementation to enable nRF Cloud's group fix API:

* :ref:`AWS <aws-nrf-cloud-location-services>`

