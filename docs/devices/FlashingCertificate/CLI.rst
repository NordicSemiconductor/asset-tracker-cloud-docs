.. _devices-provisioning-certificate-cli:

Provisioning using the CLI
##########################

.. body_start

.. note::

   Provisioning the certificates and programming the firmware through CLI are not currently supported on WSL 2 since it lacks support for serial devices. 
   For more information, see the `issue on WSL2 <https://github.com/microsoft/WSL/issues/4322>`_.
   Instead, :ref:`use nRF Connect for Desktop to provision your certificates <devices-provisioning-certificate-desktop>` and then :ref:`program the firmware <program-the-firmware>`.

   
To provision the device certificate using CLI, you must have `Segger JLink <https://www.segger.com/downloads/jlink/>`_ installed in your path.

Use the CLI to provision the device certificates:

.. code-block:: bash

    node cli flash "<imei>" -f /path/to/firmware.hex
    # default secTag is 42
    # default board is the Thingy:91, use --dk to flash a DK
    # when flashing a Thingy you most likely need to override the default port: -p /dev/ttyACM2
    # pass --help to see additional options, e.g. how to use a different secTag

Provisioning of the certificate using CLI also results in the following actions:

1. Programming the `AT client sample <https://github.com/NordicSemiconductor/at_client-hex>`_ onto device
#. Provisioning the device credentials created :ref:`in the previous step <aws-device-credentials>`
#. Programming of the firmware that you have :ref:`configured and built before <firmware-configuration>` to the device

.. body_end
