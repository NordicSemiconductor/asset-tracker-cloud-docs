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

.. parsed-literal::
   :class: highlight

    node cli flash "*imei*" -f /path/to/firmware.hex
    # default secTag is 42
    # default board is the Thingy:91, use --dk to program a DK
    # when programming a Thingy:91, most likely you need to override the default port: -p /dev/ttyACM2
    # pass --help to see the additional options, for example, option that enables the use of a different secTag

Provisioning of the certificate using CLI also results in the following actions:

.. only:: not saga

    1. Programming of the `AT client sample <https://github.com/NordicSemiconductor/at_client-hex>`_ onto the device
    #. Provisioning of the :ref:`created device credentials <aws-device-credentials>`
    #. Programming of the :ref:`configured and built firmware <firmware-configuration>` to the device

.. only:: saga

    1. Programming of the `AT client sample <https://github.com/NordicSemiconductor/at_client-hex>`_ onto the device
    #. Provisioning of the created device credentials for the respective cloud flavour :ref:`AWS <aws-device-credentials>`, or :ref:`Azure <azure-device-credentials>`
    #. Programming of the :ref:`configured and built firmware <firmware-configuration>` to the device

.. body_end
