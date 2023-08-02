.. _app-cellgeolocation:

Cell geolocation
################

.. contents::
   :local:
   :depth: 2

The devices can be shown on the map based on the location of their surrounding cells, even before obtaining a GNSS fix.
It allows to locate devices within a radius of a few kilometers.
It can be useful, for example when tracking assets like parcels.
The approximate location of a parcel can be combined with known points of interest (for example, warehouses and ports) and you can find out if a shipment has arrived at the destination.

Precision of cell geolocation can be improved by using neighbor cell measurement reports that were introduced in version 1.3.0 of the nRF9160 modem firmware.
With very little power cost, the modem collects a report of all cells it currently sees in the mobile phone network.
This additional information can be used to improve the accuracy of the location estimation.

nRF Cloud Location APIs
***********************

nRF Asset Tracker implements the nRF Cloud Location Services that provide an API for resolving cell information to geolocation.
This is an optional feature that you can enable.

This API enables the calculation of the rough location of a device as soon as it sends the roaming information to the cloud.
It provides the geolocation of nearly every cell tower and with this information, devices can be located within a few kilometers around the location of the cell tower.

.. note::

   Cellular signals can travel many kilometers and `the tests <https://www.youtube.com/watch?v=p1_0OAlTcuY>`_ show that a range of 10 km and more is possible in certain conditions.

