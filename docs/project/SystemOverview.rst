.. _system-overview:

System overview and technical considerations
############################################

.. contents::
   :local:
   :depth: 2

Devices connect to the message broker using TLS over TCP.
The messaging protocol is JSON over MQTT.
The TLS certificates are generated offline by the developer to simplify the provisioning during production.

.. figure:: ./system-overview.jpg
   :alt: System overview

   Overview of system components

The cloud and the web application are developed using `TypeScript <https://www.typescriptlang.org/>`_ (a typed superset of JavaScript).
JavaScript is the most popular language according to the `2019 Stack Overflow survey <https://insights.stackoverflow.com/survey/2019#technology>`_.
Most of the cloud providers provide their SDKs in JavaScript.

It provides the tools to configure the developer's cloud account for use with the developer's devices and the single-page application (SPA).
After the cloud account has been configured, it provides the necessary resources for the trackers to connect to the message broker and to send and receive messages.
It also provides the appropriate APIs for the SPA to interact with the developer's devices.

The mobile-first SPA is developed using `create-react-app <https://github.com/facebook/create-react-app>`_ and it provides a reference implementation of a user interface to control and interact with the devices.

The web application offers the following features:

* Registering the user

  * Includes password recovery
  * Optional feature
  * Requires user approval by an administrator

* Listing of asset trackers
* Viewing of asset trackers
  
  * Current and historical device data
    
    * GPS location
    * Battery voltage
    * Accelerometer
  
  * Configuring the asset tracker
    
    * Update interval
    * Sensor threshold

* Managing the asset trackers
  
  * Deleting the asset tracker
  * Upgrading the firmware