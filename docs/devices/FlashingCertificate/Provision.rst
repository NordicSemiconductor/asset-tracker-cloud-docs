.. body_start

First, make sure you have `Segger JLink <https://www.segger.com/downloads/jlink/>`_ installed in your path.

.. note::

    Provisioning the certificates through CLI is currently not supported on WSL 2 because it lacks support for serial devices.
    For more information, see the `issue on WSL 2 <https://github.com/microsoft/WSL/issues/4322>`_.

Use the CLI to generate and provision a certificate for your device:

.. parsed-literal::
   :class: highlight

    ./cli.sh create-and-provision-device-cert
    # default board is the Thingy:91, use --dk to program a DK
    # when programming a Thingy:91, most likely you need to override the default port: -p /dev/ttyACM2
    # pass --help to see the additional options, for example, option that enables the use of a different secTag

.. note::

    The default lifetime for device certificates is 30 years.
    Run ``./cli.sh create-and-provision-device-cert --help`` to learn how to customize the lifetime.

This will generate a new key on the device using the ``%KEYGEN`` AT command and then sign the generated certificate using the CA certificate.
The generated certificate is then provisioned onto the device.
The firmware will use the IMEI of the device as the MQTT client ID.

Flashing the credentials can time out on the Thingy:91 when using USB if it is running an outdated `Connectivity bridge <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/applications/connectivity_bridge/README.html>`_ application.
The time-out happens when the CA certificate size is above the internal buffer size of the application.
Make sure to update to the latest connectivity bridge by following the guide `Updating the firmware in the nRF52840 SoC <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/ug_thingy91_gsg.html#updating-the-conn-bridge-52840>`_.

.. body_end
