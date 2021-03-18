.. _aws-flashing:

Program the device firmware and provision the credentials
#########################################################

.. include:: ../../devices/FlashingCertificate/CLI.rst
   :start-after: body_start
   :end-before: body_end

After the programming of the firmware, the device reboots and connects to the AWS broker, and eventually reports its state to the cloud:

.. code-block::

   [00:00:35.591,644] <inf> event_manager: CLOUD_EVT_CONNECTED