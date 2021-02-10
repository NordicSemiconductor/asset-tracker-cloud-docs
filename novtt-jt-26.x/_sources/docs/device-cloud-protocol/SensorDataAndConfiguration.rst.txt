Device Data and Configuration
#############################

The data published by the device and the configuration options are described in detail in the state JSON schema file for `AWS <./state.reported.aws.schema.json>`_.
See `this state JSON document for an AWS example <./state.reported.aws.json>`_.

Sending and receiving this data is different per cloud-operator, see implementation details for :ref:`AWS here <aws-iot-shadow-topics>` .

State vs Messages
*****************

Most data is stored in the digital twin of the device, this is useful to be able to quickly query the last known data from the device.
However some data does not fit well into this model, e.g. because of its ephemeral nature.
In the Cat Tracker example we send the button pushes as a message and do not store it in the digital twin; after all it is a UI element and it in case of push buttons has no *state* which could be restored on the device or persists over a longer time.

The messages published by the device are described in detail in `the messages JSON schema file <./messages.schema.json>`_.
See `this messages JSON document example <./message.json>`_ for an example device state.

Batch data
**********

The firmware may send data as batch, using the schema described `in this JSON schema file <./batch.schema.json>`_.
See `this JSON document <./batch-message.json>`_ for an example batch message.

For sending batched data from the device, the topic ``<deviceId>/batch`` is used.
