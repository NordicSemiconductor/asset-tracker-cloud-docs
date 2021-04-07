.. _transport-data-protocol:

Transport and Data Protocol
###########################

.. contents::
   :local:
   :depth: 2

The nRF Asset Tracker uses LTE-M, MQTT, and JSON as the main communication protocols between the device and the cloud. 

LTE-M for the cellular connection
*********************************

The firmware is configured to operate in LTE-M mode to connect to the cellular network.
LTE-M provides global roaming capabilities, which is a critical feature for an asset tracker.
The firmware supports NB-IoT also.

MQTT as the transport protocol
******************************

The nRF Asset Tracker uses MQTT to connect the device to the cloud provider.
MQTT is the default protocol used for IoT in the cloud solutions of the various cloud providers.
This example currently focuses on AWS, Microsoft Azure, and Google Cloud.

JSON as the data format
***********************

The nRF Asset Tracker uses JSON to represent all the transferred data.
It offers a very good support in tooling and is human readable.
JSON verbosity is valuable especially during development.

Possible Optimizations
======================

As a data-optimization and power-optimization technique, it is recommended to explore the denser data protocols, especially since the majority of IoT applications (as in this example) will always send data in the same structure.
Only the values change in the data.

Consider the following GPS message:

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

In JSON notation, this document (without newlines) has 114 bytes.
If the message is to be transferred for example, using `Protocol Buffers <https://developers.google.com/protocol-buffers/>`_, the data can be encoded with just 62 bytes (an improvement by 46%) (`source code <https://gist.github.com/coderbyheart/34a8e71ffe30af882407544567971efb>`_).

Note that even though the savings in transferred data over the lifetime of a device are significant, there is an extra cost of maintaining the source code on the device side and on the cloud side that enables the use of a protocol, which is not supported natively by the cloud provider.

See `RION Performance Benchmarks <http://tutorials.jenkov.com/rion/rion-performance-benchmarks.html>`_ also.

`FlatBuffers <https://google.github.io/flatbuffers/>`_ seems to be `a good candidate <https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/issues/59>`_ for a resource-constrained device like the nRF9160 DK.
