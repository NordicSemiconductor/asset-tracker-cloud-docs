.. _device-cloud-protocol:

Device-to-Cloud Protocol
########################

This section documents the protocol and the considerations that were made when selecting the device-to-cloud protocol.

*Communication* is the most important aspect to optimize when developing an ultra-low power product since initiating and maintaining a network connection is relatively expensive compared to the other device operations (for example, reading a sensor value).
Reducing modem uptime and minimizing the total amount of transferred data results in longer battery life and reduced cost of data transfer.

To maximize the advantages of the solution, it is recommended to revisit the described principles and customize them to your specific needs.

.. toctree::
   :titlesonly:
   :caption: Subpages:

   TransportAndData.rst
   FourKindsOfData.rst
   SensorDataAndConfiguration.rst
   