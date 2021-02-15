.. _devices-provisioning-certificate-cli:

Provisioning using the CLI
##########################

.. note::

   To provision the device certificate using CLI, you must have `Segger JLink <https://www.segger.com/downloads/jlink/>`_ installed in your path.

Use the CLI to provision the device certificates:

.. code-block:: bash

    node cli flash "<imei>"

Provisioning of the certificate using CLI also results in the following actions:

* Downloading of the latest firmware from the `Firmware releases GitHub page <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware/releases>`_ 
* Programming of the firmware to the device
