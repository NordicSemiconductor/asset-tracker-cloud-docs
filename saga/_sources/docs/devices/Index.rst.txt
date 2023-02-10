.. _connect-using-real-device:

Connect using a real device
###########################

You can use any of the `supported development kits <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/applications/asset_tracker_v2/doc/asset_tracker_v2_description.html#requirements>`_ to connect to your account.

To connect the device to your account, complete the following steps:

1. Upgrade the modem firmware according to the instructions in the documentation:

   * `nRF9160 DK modem upgrade <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/working_with_nrf/nrf91/nrf9160_gs.html#updating-the-modem-firmware>`_
   * `Thingy:91 modem upgrade <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/working_with_nrf/nrf91/thingy91_gsg.html#update-the-modem-firmware-on-the-nrf9160-sip>`_

#. :ref:`Provision the certificate <devices-provisioning-certificate>`.

   .. _program-the-firmware:
#. Program the application firmware according to the instructions in the documentation:

   * `nRF9160 DK application firmware update <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/working_with_nrf/nrf91/nrf9160_gs.html#updating-the-application-firmware>`_
   * `Thingy:91 application firmware update <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/working_with_nrf/nrf91/thingy91_gsg.html#updating-the-firmware-in-the-nrf52840-soc>`_

.. toctree::
   :titlesonly:
   :caption: Subpages:

   TroubleShooting.rst
