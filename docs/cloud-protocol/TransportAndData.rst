.. _transport-data-protocol:

Transport and data protocol
###########################

.. contents::
   :local:
   :depth: 2

The nRF Asset Tracker uses LTE-M, MQTT, and JSON as the main communication protocols between the device and the cloud.

LTE-M for the cellular connection
*********************************

The firmware is configured to operate in LTE-M mode to connect to the cellular network.
LTE-M provides global roaming capabilities, which is a critical feature for an asset tracker.
The firmware supports also NB-IoT.

MQTT as the transport protocol
******************************

The nRF Asset Tracker uses MQTT to connect the device to the cloud provider.
MQTT is the default protocol used for IoT in the cloud solutions of the various cloud providers.
This example currently focuses on AWS, Microsoft Azure, and Google Cloud.

.. _json-format:

JSON as the data format
***********************

The nRF Asset Tracker uses JSON to represent all transferred data.
It offers very good support in tooling and is human readable.
JSON verbosity is valuable especially during development.

Possible optimizations
======================

For data optimization and power optimization, it is recommended to explore denser data protocols, because a great deal of IoT applications (as in this example, too) always send data in the same structure.
Only the values change in the data.

Consider the following GNSS message:

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
If the message is to be transferred for example, using `protocol buffers <https://developers.google.com/protocol-buffers/>`_, the data can be encoded with just 62 bytes (an improvement by 46%) (`source code <https://gist.github.com/coderbyheart/34a8e71ffe30af882407544567971efb>`_).

The savings in transferred data over the lifetime of a device may be significant.
However, there is an extra cost of maintaining the source code on the device side and on the cloud side.
The code must enable the use of a protocol, which is not supported natively by the cloud provider.

See also `RION Performance Benchmarks <http://tutorials.jenkov.com/rion/rion-performance-benchmarks.html>`_ .

Protocol buffers are available in Zephyr using `Nanopb <https://jpa.kapsi.fi/nanopb/>`_.
An example on how to use them is implemented in the `Alexa Gadget Bluetooth Peripheral Sample in NCS <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/samples/bluetooth/alexa_gadget/README.html>`_.
