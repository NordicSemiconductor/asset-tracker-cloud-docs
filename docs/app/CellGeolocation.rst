.. _app-cellgeolocation:

Cell geolocation
################

.. contents::
   :local:
   :depth: 2

If cell geolocation is implemented, the devices can be shown on the map based on the location of their surrounding cells, even before obtaining a GPS fix.
It allows to locate devices within a radius of a few kilometers.
It can be useful, for example when tracking assets like parcels.
The approximate location of a parcel can be combined with known points of interest (for example, warehouses and ports) and you can find out if a shipment has arrived at the destination.

Precision of cell geolocation can be improved by using neighbor cell measurement reports that were introduced in version 1.3.0 of the nRF9160 modem firmware.
With very little energy costs, the modem can collect a report of all cells in the mobile phone network it currently can see.
This additional information can be used to improve the accuracy of the location estimation.

Locating cells based on device data
***********************************

GPS position fixes that are acquired by the devices and the cell information (cell ID, area ID, MCC/MNC) of these devices are stored together and used to `calculate the location of the cell <https://github.com/NordicSemiconductor/cell-geolocation-helpers#cellfromgeolocations>`_.

The following image demonstrates how the location of a device is calculated using the device geolocation data:

.. figure:: ./images/map.gif
   :alt: Calculating the location of a cell using the device geolocation data
    
   Calculating the location of a cell using the device geolocation data
 
If there is no device geolocation for the cell from your own devices, third-party services like `Unwired Labs <https://unwiredlabs.com/>`_ or `RXNetworks <https://rxnetworks.com/location.io#!RT-GNSS>`_ provide a database of cell geolocations.

Third-party location APIs
*************************

nRF Asset Tracker implements the following third-party location APIs:

 - nRF Connect for Cloud Location Services
 - Unwired Labs

These are commercial third-party solution that provide an API for resolving cell information to geolocation.
This is an optional feature that you can enable.

These APIs enable calculation of the rough location of a device as soon as it sends the roaming information to the cloud.
They provide the geolocation of nearly every cell tower and with this information, devices can be located within a few kilometers around the location of the cell tower.

.. note::

   Cellular signals can travel many kilometers and `the tests <https://www.youtube.com/watch?v=p1_0OAlTcuY>`_ show that a range of 10 km and more is possible in certain conditions.

Follow the configuration guide in the respective implementation to enable nRF Connect for Cloud's cell geolocation API:

.. only:: not v1_5_x

* :ref:`AWS <aws-nrf-connect-for-cloud-location-services>`

Follow the configuration guide in the respective implementation to enable Unwired Labs' cell geolocation API:

.. only:: v1_5_x

   * :ref:`AWS <aws-unwired-labs-cell-geolocation>`

.. only:: not v1_5_x

   * :ref:`AWS <aws-unwired-labs-cell-geolocation>`
   * :ref:`Azure <azure-unwired-labs-cell-geolocation>`
