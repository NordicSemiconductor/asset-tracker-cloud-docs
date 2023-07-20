.. _device-data-configuration:

Device data and configuration
#############################

.. contents::
   :local:
   :depth: 2

The schemas referenced on this page define the data format used by the device to encode data.
Currently, :ref:`JSON <json-format>` is the only supported encoding format.

While the schemas mark properties as required, the device can always send partial updates.
For example, the device might initially report the full roaming information after boot, but later only send the changed values, for example Reference Signal Received Power (RSRP), to the cloud to conserve data and power.
It is the responsibility of the cloud to store the updates in a way that full objects can be constructed from partial updates.

Sending and receiving data is different for each cloud operator.

AWS
===

The data published by the device and the configuration options are described in detail in the `state JSON schema file for AWS <./state.reported.aws.schema.json>`_.
See the `state JSON document for an AWS example <./state.reported.aws.json>`_.

See :ref:`aws-iot-shadow-topics` for the implementation details for AWS.

Azure
=====

The data published by the device and the configuration options are described in detail in the `state JSON schema file for Azure <./state.reported.azure.schema.json>`_.
See the `state JSON document for an Azure example <./state.reported.azure.json>`_.

See :ref:`azure-iot-shadow-topics` for the implementation details for AWS.

Comparing state with messages
=============================

Most of the data is stored in the digital twin of the device.
This is useful for a quick query of the last known data from the device.
However, some data does not fit well into this model because of its ephemeral nature.
For example, button pushes are sent as messages and are not stored in the digital twin.
Button is a UI element and in the case of push buttons, there is no state, which could be restored on the device or a state that persists over a longer time.

The messages published by the device are described in detail in the `messages JSON schema file <./messages.schema.json>`_.
See the `messages JSON document <./message.json>`_ for an example message.

The network survey is another piece of data that is not stored in the digital twin of the device.
It is published through a separate topic, because depending on the cloud platform, its size can exceed the allowed size of the digital twin document.
The network survey published by the device is described in detail in the `network survey JSON schema file <./network-survey.schema.json>`_.
See the `network survey JSON document <./network-survey.json>`_ for an example report.

A-GPS and P-GPS data
====================

Through  :ref:`aws-nrf-cloud-location-services`, the device can request A-GPS and P-GPS data through MQTT.

The A-GPS message published by the device is described in detail in the `A-GPS JSON schema file <./agps-request.schema.json>`_. 
See the `A-GPS request JSON document <./agps-request.json>`_ for an example request. 
The cloud publishes the requested types as binary to the ``<device Id>/agps`` topic. 
If the device requests ephemerides (type 2), this message is too large to combine with other types and will be published in a separate message.

The P-GPS message published by the device is described in the `P-GPS request JSON schema file <./pgps-request.schema.json>`_. 
See the `P-GPS request JSON document <./pgps-request.json>`_ for an example request. 
The cloud publishes a link to the data to the ``<device Id>/pgps`` topic in the format described in detail in the `P-GPS response JSON schema file <./pgps-response.schema.json>`_.
See the `P-GPS response JSON document <./pgps-response.json>`_ for an example response.
The device can then use HTTP or HTTPS to download the P-GPS data.

.. _batch-messages:

Batch data
==========

The firmware may send data as batch, using the schema that is described in the `JSON schema file <./batch.schema.json>`_.
See the `JSON document <./batch-message.json>`_ for an example batch message.

For sending batched data from the device, the topic ``<deviceId>/batch`` is used.
