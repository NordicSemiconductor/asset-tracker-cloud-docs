.. _device-cloud-protocol:

Device-to-Cloud Protocol
########################

This sections documents the protocol and the considerations we made when selecting the device-to-cloud protocol for the Cat Tracker.

.. note::

   *Communication* is the most important aspect to optimize for when developing an ultra-low-power product because initiating and maintaining network connection is relatively expensive compared to other device operations (for example reading a sensor value).
   It is therefore recommended to invest a reasonable amount of time to revisit the principles explained here and customize them to your specific needs.
   The more the modem-uptime can be reduced and the smaller the total transferred amount if data becomes, the longer will your battery and your data contingent last.

.. toctree::
   :titlesonly:

   TransportAndData.rst
   FourKindsOfData.rst
   SensorDataAndConfiguration.rst
   