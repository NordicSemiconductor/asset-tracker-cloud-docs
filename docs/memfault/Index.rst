.. _index_memfault:

Memfault integration
####################

.. intro_start

The `nRF Connect SDK <https://github.com/nrfconnect/sdk-nrf>`_ provides `integration with Memfault <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/libraries/others/memfault_ncs.html>`_. 

By default, Memfault data is sent using HTTPS.
Using MQTT is possible and preferred, because it reduces power consumption.
The `nRF Asset Tracker Memfault integration for AWS IoT <https://github.com/NordicSemiconductor/asset-tracker-cloud-memfault-aws-js>`_ provides the necessary cloud resources to send Memfault data using the established MQTT cloud connection.
Core dumps, which are collected when the application crashes, are still sent to Memfault using HTTPS.
This only happens once after a reboot and it allows you to identify issues with the MQTT connection.

.. intro_end

You can use the integration standalone and without an existing instance of :ref:`nRF Asset Tracker <getting-started>`.

.. toctree::
   :titlesonly:
   :caption: Subpages:

   AWS.rst
