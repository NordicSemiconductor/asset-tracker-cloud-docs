.. _azure-programming:

Program the device firmware
###########################

.. include:: ../../firmware/Programming.rst
   :start-after: body_start
   :end-before: body_end

After the programming of the firmware, the device reboots and connects to the Azure IoT Hub, and eventually reports its state to the cloud:

.. code-block:: bash

   [00:00:35.591,644] <inf> event_manager: CLOUD_EVT_CONNECTED