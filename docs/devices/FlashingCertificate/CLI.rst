.. _devices-provisioning-certificate-cli:

Provisioning using the CLI
##########################

.. body_start

.. note::

   To provision the device certificate using CLI, you must have `Segger JLink <https://www.segger.com/downloads/jlink/>`_ installed in your path.

Use the CLI to provision the device certificates:

.. code-block:: bash

    node cli flash "<imei>" -f /path/to/firmware.hex
    # default secTag is 42
    # default board is the Thingy:91, use --dk to flash a DK
    # when flashing a Thingy you most likely need to override the default port: -p /dev/ttyACM2
    # pass --help to see additional options, e.g. how to use a different secTag

Provisioning of the certificate using CLI also results in the following actions:

1. Programming the AT client sample onto device
#. Provisioning the device certificates
#. Programming of the firmware to the device

.. body_end
