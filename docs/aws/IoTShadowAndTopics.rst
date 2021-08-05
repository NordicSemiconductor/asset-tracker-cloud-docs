.. _aws-iot-shadow-topics:

AWS IoT Device Shadow service and MQTT topics
#############################################

.. contents::
   :local:
   :depth: 2

On AWS, the `IoT Device Shadow service <https://docs.aws.amazon.com/iot/latest/developerguide/iot-device-shadows.html>`_ is used to send device data and configuration through the JSON shadow documents.
A shadow document describes the different states of the device through a state property.
Examples of device states are:

* Reported state
* Desired state

Reported state
**************

The document is described in `JSON schema file <../cloud-protocol/state.reported.aws.schema.json>`_.
See `JSON document <../cloud-protocol/state.reported.aws.json>`_ for a sample device state.

Desired state
*************

The document contains the ``cfg`` object described in the above schema.
