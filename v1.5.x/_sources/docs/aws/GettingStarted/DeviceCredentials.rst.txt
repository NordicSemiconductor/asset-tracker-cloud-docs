.. _aws-device-credentials:

Create device credentials
#########################

.. contents::
   :local:
   :depth: 2

On AWS devices, you can connect to IoT core using `TLS version 1.2 <https://docs.aws.amazon.com/iot/latest/developerguide/iot-security-identity.html>`_ and `Elliptic Curve Cryptography (ECC) based certificates <https://aws.amazon.com/blogs/iot/elliptic-curve-cryptography-and-forward-secrecy-support-in-aws-iot-3/>`_.

For creating device credentials, you must generate the following certificates:

* CA certificate
* Device certificate

Generate a CA certificate
*************************

Creating the CA certificate is a one-time operation.
If you have a directory called :file:`certificates` with a :file:`rootCA.pem` file in it, you have already completed this step.

It is recommended to use your `own Certificate Authority (CA) <https://docs.aws.amazon.com/iot/latest/developerguide/device-certs-your-own.html>`_ to create certificates for your devices since it allows generating device certificates offline.

Run the following script to generate and register a CA certificate in your AWS account:

.. code-block:: bash

    cd ~/nrf-asset-tracker/aws
    node cli create-ca

.. note::

   The default lifetime for CA certificates is 1 year.
   Run ``node cli create-ca --help`` to learn how to customize the lifetime.

Generate a device certificate
*****************************

.. include:: ../../devices/FlashingCertificate/Generate.rst
   :start-after: body_start
   :end-before: body_end