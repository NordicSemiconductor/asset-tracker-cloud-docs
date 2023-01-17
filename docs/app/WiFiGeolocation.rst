.. _app-wifigeolocation:

Wi-Fi geolocation
#################

.. contents::
   :local:
   :depth: 2

If Wi-Fi site survey geolocation (Ground Fix service) is implemented, the devices can be shown on the map based on the location of the Wi-Fi access points nearest to them.

Locating device based on the nearest access points data
*******************************************************

The device can survey the nearest access points and requests for geolocation using the following JSON format.

.. code-block:: json

  {
    "ts": 1670591331896,
    "v": [
      {
        "mac": "40:01:7a:c9:10:22",
        "ssid": "TnGroup",
        "rssi": -65,
        "chan": 1
      },
      {
        "mac": "80:e0:1d:2a:92:f2",
        "ssid": "TnGroup",
        "rssi": -70,
        "chan": 1
      },
      {
        "mac": "40:01:7a:c9:10:21",
        "ssid": "Telenor_Guest",
        "rssi": -65,
        "chan": 1
      },
      {
        "mac": "40:01:7a:c9:10:27",
        "ssid": "TnNorgeMacOS",
        "rssi": -65,
        "chan": 1
      }
    ]
  }

Third-party location APIs
*************************

nRF Asset Tracker implements the following third-party location APIs:

 * nRF Cloud Location Services

These APIs enable calculation of the rough location of a device as soon as it sends the information for the nearest Wi-Fi access points to the cloud.

Follow the configuration guide in the respective implementation to enable nRF Cloud's Ground Fix API:

* :ref:`AWS <aws-nrf-cloud-location-services>`

