.. _aws-flashing:

Flashing device firmware and credentials
########################################

.. include:: ../../devices/FlashingCertificate/CLI.rst
   :start-after: body_start
   :end-before: body_end

After flashing, the device will reboot and connect to the AWS broker, eventually reporting its state to the cloud:

.. code-block::

   [00:00:35.591,644] <inf> event_manager: CLOUD_EVT_CONNECTED