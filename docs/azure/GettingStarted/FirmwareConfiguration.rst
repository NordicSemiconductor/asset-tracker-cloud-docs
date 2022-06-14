.. _azure-firmware-configuration:

Configure the firmware
######################

To configure the :ref:`firmware <firmware-azure-index>`, complete the following mandatory steps:

1. Create the file :file:`firmware.conf` in the ``~/nrf-asset-tracker`` folder for your configuration overrides.

#. Run the following command to print the Azure IoT DPS ID scope, which your devices use during device provisioning:

   .. code-block:: bash

      node cli info -o iotHubDpsIdScope

#. Add the ``CONFIG_AZURE_IOT_HUB_DPS_ID_SCOPE`` setting to the :file:`firmware.conf` file, using the Azure IoT DPS ID scope value from the previous step as the value:

   .. parsed-literal::
      :class: highlight

      CONFIG_AZURE_IOT_HUB_DPS_ID_SCOPE="*your Azure IoT DPS ID scope*"

After completing the configuration, compile the firmware either :ref:`using your own development environment <firmware-azure-building>` or :ref:`using Docker <firmware-azure-building-docker>` and then :ref:`create the device credentials <azure-device-credentials>`.

.. note::

   See the documentation on `nRF9160: Asset Tracker v2 application <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/applications/asset_tracker_v2/README.html>`_ for all available configuration options.
      