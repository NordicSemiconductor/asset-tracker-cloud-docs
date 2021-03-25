.. _azure-device-credentials:

Create device credentials
#########################

.. contents::
   :local:
   :depth: 2

For creating device credentials, you must generate the following certificates:

* CA root certificate
* CA intermediate certificate
* Device certificate

Create a CA root certificate
============================

.. note::

   Make sure that you have exported the right resource group name as ``$RESOURCE_GROUP_NAME``.
   By default, it is set to ``nrf-asset-tracker``.

To create a CA root certificate and register it with the Azure IoT Device Provisioning Service, run the following command:

.. code-block:: bash

      node cli create-ca-root

The CA root certificate should not be shared.
The number of CA root certificates is typically very small, and the minimum number of certificates required is one.

Provide the proof your ownership of the CA with the following command:

.. code-block:: bash

      node cli proof-ca-root-possession

.. note::

      If you see the error *"A required certificate is not within its validity period when verifying against the current system clock or the timestamp in the signed file."*, confirm that your system clock is accurate.

Create a CA intermediate certificate
====================================

To creates a CA intermediate certificate and an enrollment group for it, run the following command:

.. code-block:: bash

      node cli create-ca-intermediate

You can share the CA intermediate certificate with the factory.
Over time, you will have multiple intermediate certificates.
   
Generate a device certificate
=============================

.. include:: ../../devices/FlashingCertificate/Generate.rst
   :start-after: body_start
   :end-before: body_end