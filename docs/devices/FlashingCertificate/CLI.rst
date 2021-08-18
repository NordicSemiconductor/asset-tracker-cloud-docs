.. _devices-provisioning-certificate-cli:

Provisioning using the CLI
##########################

.. body_start

.. note::

   Provisioning the certificates and programming the firmware through CLI are not currently supported on WSL 2 since it lacks support for serial devices.
   For more information, see the `issue on WSL 2 <https://github.com/microsoft/WSL/issues/4322>`_.
   Instead, :ref:`use nRF Connect for Desktop to provision your certificates <devices-provisioning-certificate-desktop>` and then :ref:`program the firmware <program-the-firmware>`.

   
First, make sure you have `Segger JLink <https://www.segger.com/downloads/jlink/>`_ installed in your path.

To provision the device certificates using the CLI, run the following command:

.. parsed-literal::
   :class: highlight

    node cli flash "*imei*" -f /path/to/firmware.hex
    # default secTag is 42
    # default board is the Thingy:91, use --dk to program a DK
    # when programming a Thingy:91, most likely you need to override the default port: -p /dev/ttyACM2
    # pass --help to see the additional options, for example, option that enables the use of a different secTag

Provisioning of the certificate using CLI also results in the following actions:

* Programming of the `AT Client sample <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/samples/nrf9160/at_client/README.html>`_ onto the device.
* Provisioning of the created device credentials for the respective cloud flavour :ref:`AWS <aws-device-credentials>`, or :ref:`Azure <azure-device-credentials>`.
* Programming of the :ref:`configured and built firmware <firmware-configuration>` to the device.

.. body_end
