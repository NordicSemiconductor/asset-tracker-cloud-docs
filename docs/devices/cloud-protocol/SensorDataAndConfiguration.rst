.. _device-data-configuration:

Device data and configuration
#############################

.. contents::
   :local:
   :depth: 2

Sending and receiving data is different for each cloud operator.

The data published by the device and the configuration options are described in detail in the `state JSON schema file for AWS <./state.reported.aws.schema.json>`_.
See the `state JSON document for an AWS example <./state.reported.aws.json>`_.

See :ref:`aws-iot-shadow-topics` for the implementation details for AWS.

Comparing state with messages
*****************************

Most of the data is stored in the digital twin of the device.
This is useful for a quick query of the last known data from the device.
However, some data does not fit well into this model because of its ephemeral nature.
For example, button pushes are sent as messages and are not stored in the digital twin.
Button is a UI element and in the case of push buttons, there is no state, which could be restored on the device or a state that persists over a longer time.

The messages published by the device are described in detail in the `messages JSON schema file <./messages.schema.json>`_.
For more information, see the `messages JSON document <./message.json>`_ for an example device state.

.. _batch-messages:

Batch data
**********

The firmware may send data as batch, using the schema that is described in the `JSON schema file <./batch.schema.json>`_.
See the `JSON document <./batch-message.json>`_ for an example batch message.

For sending batched data from the device, the topic ``<deviceId>/batch`` is used.
