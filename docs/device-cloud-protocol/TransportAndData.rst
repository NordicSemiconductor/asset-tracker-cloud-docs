Transport and Data Protocol
###########################

The *nRF Asset Tracker* uses LTE-m, MQTT and JSON as its main communication protocol between the device and the cloud. 

LTE-m for the cellular connection
*********************************

The firmware is configured to operate in LTE-m mode to connect to the cellular network. LTE-m provides global roaming capabilites which is a critical feature for an Asset Tracker. NB-IoT is supported as well.

MQTT as the transport protocol
******************************

The nRF Asset Tracker uses MQTT to connect the device to the cloud provider. MQTT is the default protocol for IoT at the cloud providers this example currently focuses on: AWS, Microsoft Azure, and Google Cloud.

JSON as the data format
***********************

The nRF Asset Tracker uses JSON to represent all transferred data.
If offers very good support in tooling and is human readable.
Especially during development its verbosity is valuable.

Possible Optimizations
======================

As a data- and power-optimization technique it is recommended to look into denser data protocols, especially since the majority of IoT applications (like in this example) will always send data in the same structure, only the values change.

Consider the GPS message:

.. code-block:: json

  {
    "v": {
      "lng": 10.414394,
      "lat": 63.430588,
      "acc": 17.127758,
      "alt": 221.639832,
      "spd": 0.320966,
      "hdg": 0
    },
    "ts": 1566042672382
  }

In JSON notation this document (without newlines) has 114 bytes.
If the message were to be transferred using for example `Protocol Buffers <https://developers.google.com/protocol-buffers/>`_ the data can be encoded with only 62 bytes (a 46% improvement) (`source code <https://gist.github.com/coderbyheart/34a8e71ffe30af882407544567971efb>`_).

Note that even though the savings in transferred data over the lifetime of a device are significant, there is an extra cost of maintaining the source code on the device side and on the cloud side that enables the use of a protocol that is not supported natively by the cloud provider.

See also: `RION Performance Benchmarks <http://tutorials.jenkov.com/rion/rion-performance-benchmarks.html>`_

`FlatBuffers <https://google.github.io/flatbuffers/>`_ seems like the best candidate for a resource constraint device like the 9160.
