.. _index-cat-tracker-web-app:

Cat Tracker web application
###########################

The Cat Tracker web application is a reference single-page application (SPA) developed using `create-react-app <https://github.com/facebook/create-react-app>`_ in
`TypeScript <https://www.typescriptlang.org/>`_.
The `source code for the web application <https://github.com/NordicSemiconductor/asset-tracker-cloud-app-js>`_ is published on GitHub.

To learn more about customizing the Cat Tracker web application, see the `Getting started guide on Create React App <https://create-react-app.dev/docs/getting-started/>`_.

The web application offers the following features:

* Registering the user

  * Includes password recovery

* Listing of asset trackers
* Viewing of asset trackers
  
  * Current and historical device data
    
    * GPS location
    * Battery voltage
    * Accelerometer
  
  * Configuring the asset tracker
    
    * Update configuration
    * Sensor threshold

* Managing the asset trackers
  
  * Deleting the asset tracker
  * Upgrading the firmware

.. toctree::
   :titlesonly:
   :caption: Subpages:

   CellGeolocation.rst
