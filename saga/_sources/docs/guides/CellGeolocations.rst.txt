Cell geolocations
#################

.. contents::
   :local:
   :depth: 2

Locating a device is an important aspect of any IoT solution.
It is one of the primary functions in the case of an asset tracker.
Sometimes, acquiring a GNSS fix is not possible, for example, when the device is indoors.
In such case, other data can be used to approximately calculate the location of the device.
If the device has a cellular connection, the ID of the cells with which the device modem communicates can be used to calculate its location.
Smartphones use this technique and combine the data from other wireless networks to quickly estimate a location down to a few meters.
The approximate location of the device is then used by the GNSS module to speed up the time to the first GNSS fix since it can limit the number of GNSS satellites that must be queried to the ones that are currently visible in the sky.

However, smartphones are powerful devices and there is a concrete need to have the location information on the device instantly (for example, for showing the location of the user in a navigation application while the device is indoors).
Smartphones have location-dependent features, while most of the IoT devices do not have such features.
For example, the nRF Asset Tracker has no feature that depends on a location, it only reports the location to the cloud backend.
In this case, only the mobile app that visualizes the location of the nRF Asset Tracker requires the location of the device.

.. note::

    Since it is efficient to resolve cell geolocations on the cloud, this can be ideally the responsibility of the cloud backend.

Assisted GPS (A-GPS)
********************

The only location-dependent feature of the nRF Asset Tracker is A-GPS, which speeds up the time to acquire the first GNSS fix (seconds instead of minutes). 
Complex location triangulation based on mobile network cells or Wi-Fi MAC addresses is not required.
It is sufficient to have an up-to-date `GPS almanac <https://en.wikipedia.org/wiki/GPS_signals#Almanac>`_ and an approximate location, which can be derived from the mobile network operator's country code.
This data enables the GNSS module to calculate a GPS fix quickly.

Geolocating cells
*****************

A user may need to know the location of the device instantly on a UI.
Depending on the tracked subject, an accuracy of a few hundred meters might be enough.
Thus, an approximate location can be sufficient.
An approximate position is always better than no location information (if the device cannot acquire a GNSS fix).
Therefore, it is beneficial to geolocate the current mobile network cell.

Geolocating cells using other devices
=====================================

Resolving the cell location on the cloud backend has unique advantages over resolving it on the device.
It removes the limitations caused by the firmware image size and the memory usage on the device and it can attend to other devices after GPS fixes.
If many devices are closely located, it saves a lot of resources since a cell's geolocation needs to be resolved only once and then it can be made available to all the devices.
This must be the preferred approach when developing an IoT product that has location-specific features and relies on the approximate location of cell towers to operate.
If a device knows its cell tower, it is normally safe to assume that it has an internet connection to request the approximate location from the cloud.
This allows to offload expensive calculations to the cloud and reduce the resource usage on the device.

In the nRF Asset Tracker, whenever a device reports a GNSS fix, the position is stored together with the cell ID.
An up-to-date cell location database independent of a third-party API is built over time.
This database is used as the primary means of geolocating cells in the nRF Asset Tracker.
The third-party API will be called (if it is enabled) only if a cell has not been geolocated by a device previously.

Geolocating cells using nRF Cloud Location Services
===================================================

`nRF Cloud <https://nrfcloud.com/>`_ has a database of cell tower locations and provide an API to query their locations.

The nRF Asset Tracker implements the optional resolution on the cloud side for :ref:`AWS <aws-nrf-cloud-location-services>` and :ref:`Azure <azure-nrf-cloud-location-services>` for the cells that have not been geolocated by the devices.