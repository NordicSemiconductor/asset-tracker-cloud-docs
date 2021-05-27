.. _azure-firmware-configuration:

Configure the firmware
######################

To configure the :ref:`firmware <firmware-azure-index>`, complete the following mandatory steps:

1. Run the following command to print the Azure IoT DPS hostname to which your devices will connect:

   .. code-block:: bash

      node cli info -o iotHubDpsHostname

#. Use this hostname as the value for the ``CONFIG_AZURE_IOT_HUB_DPS_HOSTNAME`` configuration variable.

#. Run the following command to print the Azure IoT DPS ID scope to which your devices use during device provisioning:

   .. code-block:: bash

      node cli info -o iotHubDpsIdScope

#. Use this ID scope as the value for the ``CONFIG_AZURE_IOT_HUB_DPS_ID_SCOPE`` configuration variable.

#. Use ``11`` as the value for ``CONFIG_AZURE_IOT_HUB_SEC_TAG``.

#. Use ``11`` as the value for ``CONFIG_AZURE_FOTA_SEC_TAG``.

After completing the configuration, compile the firmware either :ref:`using your own development environment <firmware-azure-building>` or :ref:`using Docker <firmware-azure-building-docker>` and then :ref:`create the device credentials <azure-device-credentials>`.

.. note::

   See the documentation on `nRF9160: Asset Tracker v2 application <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/applications/asset_tracker_v2/README.html>`_ for all available configuration options.