.. body_start

First, make sure you have `Segger JLink <https://www.segger.com/downloads/jlink/>`_ installed in your path.

.. note::

    Provisioning the certificates through CLI is currently not supported on WSL 2 because it lacks support for serial devices.
    For more information, see the `issue on WSL 2 <https://github.com/microsoft/WSL/issues/4322>`_.

Use the CLI to generate and provision a certificate for your device:

.. parsed-literal::
   :class: highlight

    node cli create-and-provision-device-cert
    # default secTag is 42
    # default board is the Thingy:91, use --dk to program a DK
    # when programming a Thingy:91, most likely you need to override the default port: -p /dev/ttyACM2
    # pass --help to see the additional options, for example, option that enables the use of a different secTag

.. note::

    The default lifetime for device certificates is 30 years.
    Run ``node cli create-and-provision-device-cert --help`` to learn how to customize the lifetime.

This will generate a new key on the device using the ``%KEYGEN`` AT command and then sign the generated certificate using the CA certificate.
The generated certificate is then provisioned onto the device.
The firmware will use the IMEI of the device as the MQTT client ID.

.. body_end
