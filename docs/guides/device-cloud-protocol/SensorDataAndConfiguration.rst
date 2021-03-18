.. _device-data-configuration:

Device data and configuration
#############################

The data published by the device and the configuration options are described in detail in the `state JSON schema file for AWS <./state.reported.aws.schema.JSON>`_.
See the `state JSON document for an AWS example <./state.reported.aws.JSON>`_.

Sending and receiving this data is different for each cloud operator.
See :ref:`aws-iot-shadow-topics` for the implementation details for AWS.

Comparing State with Messages
*****************************

Most of the data is stored in the digital twin of the device.
This is useful for a quick query of the last known data from the device.
However, some data does not fit well into this model because of its ephemeral nature.
For example, button pushes are sent as a message and are not stored in the digital twin.
Button is a UI element and in the case of push buttons, there is no *state*, which could be restored on the device or a *state* that persists over a longer time.

The messages published by the device are described in detail in the `messages JSON schema file <./messages.schema.JSON>`_.
For more information, see the `messages JSON document <./message.JSON>`_ for an example device state.

Batch data
**********

The firmware may send data as batch, using the schema that is described in the `JSON schema file <./batch.schema.JSON>`_.
See the `JSON document <./batch-message.JSON>`_ for an example batch message.

For sending batched data from the device, the topic ``<deviceId>/batch`` is used.
