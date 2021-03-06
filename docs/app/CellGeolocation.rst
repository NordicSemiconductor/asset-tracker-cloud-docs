.. _app-cellgeolocation:

Cell geolocation
################

.. contents::
   :local:
   :depth: 2

If cell geolocation is implemented, the devices can be shown on the map based on the location of their cell, even before obtaining a GPS fix.
It allows to locate devices within a radius of a few kilometers, which can be beneficial depending on your use case.
It can be useful in the case of tracking assets like parcels, where the approximate location can be combined with known points of interest (for example, warehouses and ports), to know if a shipment has arrived at the destination.

Locating cells based on device data
***********************************

GPS position fixes that are acquired by the devices and the cell information (cell id, area id, MCC/MNC) of these devices are stored together and it is used to `calculate the location of the cell <https://github.com/NordicSemiconductor/cell-geolocation-helpers#cellfromgeolocations>`_.

The following image shows the location calculation of a device using the device geolocation data:

.. figure:: ./images/map.gif
   :alt: Calculating the location of a cell using the device geolocation data
    
   Calculating the location of a cell using the device geolocation data
 
If there is no device geolocation for the cell from your own devices, third-party services like `Unwired Labs <https://unwiredlabs.com/>`_ or `RXNetworks <https://rxnetworks.com/location.io#!RT-GNSS>`_ provide a database of cell geolocations.

Unwired Labs' API
*****************

The Unwired Labs' geolocation API is a commercial third-party solution that provides an API for resolving cell information to geolocation.
This is an optional feature, which you can enable.

In this way, it is possible to calculate the rough location of a device as soon as it sends the roaming information to the cloud.
The API provides the geolocation of nearly every cell tower and by using this information, devices can be located within a few kilometers around the location of the cell tower.

Note that cellular signals can travel many kilometers and `the tests <https://www.youtube.com/watch?v=p1_0OAlTcuY>`_ show that a range of 10 km and more is possible in certain conditions.

Follow the configuration guide in the respective implementation to enable Unwired Labs' geolocation API:

.. only:: not saga

   * :ref:`AWS <aws-unwired-labs-api>`

.. only:: saga

   * :ref:`AWS <aws-unwired-labs-api>`
   * :ref:`Azure <azure-unwired-labs-api>`