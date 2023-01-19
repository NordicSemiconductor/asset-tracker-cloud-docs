.. _index-web-app:

nRF Asset Tracker web application
#################################

The nRF Asset Tracker web application is a reference single-page application (SPA) developed using `TypeScript <https://www.typescriptlang.org/>`_.
The source code is published on GitHub:

- `nRF Asset Tracker Web Application for AWS <https://github.com/NordicSemiconductor/asset-tracker-cloud-app-aws-js>`_
- `nRF Asset Tracker Web Application for Azure <https://github.com/NordicSemiconductor/asset-tracker-cloud-app-js>`_

The web application offers the following features:

* Registering the user

  * Includes password recovery

* Listing of asset trackers
* Viewing of asset trackers
  
  * Current and historical device data, for example
    
    * GNSS location
    * Approximate location using :ref:`nRF Cloud Location Services <app-cellgeolocation>` and other third-party providers
    * Battery voltage
    * Temperature
  
* Managing the asset trackers, for example
  
  * Updating the real-time configuration
  * Upgrading the firmware overt the air (FOTA)
  * Deleting the asset tracker

.. toctree::
   :titlesonly:
   :caption: Subpages:

   CellGeolocation.rst
   WiFiGeolocation.rst