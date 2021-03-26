Enable Device Update for IoT Hubs
=================================

1. For enabling Device Update for IoT Hubs in the next step, the namespace needs to be registered in the subscription:

.. code-block:: bash

   az provider register --namespace Microsoft.DeviceUpdate

#. Follow `the instructions on how the create a new Device Update instance <https://docs.microsoft.com/en-us/azure/iot-hub-device-update/create-device-update-account>`_.

#. Finally, connect it to your IoT Hub.