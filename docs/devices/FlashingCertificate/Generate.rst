.. _devices-provisioning-certificate-generate:

Generating a certificate
########################

.. body_start

You can use the CLI to generate a certificate for your device.
The firmware will use the IMEI of the device as the MQTT client ID.
You can get the IMEI of your device using the AT command ``AT+CGSN``.
The IMEI is also typically printed on a sticker on the device.

Following is the output of the command:

.. code-block:: bash

    # AT+CGSN
    352656100248049 OK

Use the IMEI when generating the certificate:

.. parsed-literal::
   :class: highlight

    node cli create-device-cert -d "*imei*"

.. note::

    The default lifetime for device certificates is 30 year.
    Run ``node cli create-device-cert --help`` to learn how to customize the lifetime.

.. body_end