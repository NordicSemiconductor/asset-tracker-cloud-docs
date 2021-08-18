.. _azure-firmware-configuration:

Configure the firmware
######################

To configure the :ref:`firmware <firmware-azure-index>`, complete the following mandatory steps:

1. Run the following command to print the Azure IoT DPS ID scope, which your devices use during device provisioning:

.. code-block:: bash

   node cli info -o iotHubDpsIdScope

#. Use this ID scope as the value for the ``CONFIG_AZURE_IOT_HUB_DPS_ID_SCOPE`` configuration variable.

#. Use ``11`` as the value for ``CONFIG_AZURE_IOT_HUB_SEC_TAG``.

#. Use ``11`` as the value for ``CONFIG_AZURE_FOTA_SEC_TAG``.

#. Comment in the remaining Azure settings in the :file:`prj.conf` file:

   .. code-block:: bash
      
      CONFIG_AZURE_IOT_HUB=y
      CONFIG_AZURE_IOT_HUB_DPS=y
      CONFIG_AZURE_IOT_HUB_AUTO_DEVICE_TWIN_REQUEST=y
      CONFIG_AZURE_IOT_HUB_DEVICE_ID_APP=y
      CONFIG_AZURE_IOT_HUB_MQTT_PAYLOAD_BUFFER_LEN=2048
      CONFIG_AZURE_IOT_HUB_MQTT_RX_TX_BUFFER_LEN=2048
      CONFIG_AZURE_IOT_HUB_TOPIC_PROPERTY_BAG_PREFIX=n
      CONFIG_AZURE_IOT_HUB_STACK_SIZE=4096
      CONFIG_AZURE_FOTA=y
      CONFIG_AZURE_FOTA_TLS=y
   
#. Comment in the Azure logging settings in the :file:`overlay-debug.conf` file:

   .. code-block:: bash
   
      CONFIG_AZURE_FOTA_LOG_LEVEL_DBG=y
      CONFIG_AZURE_IOT_LOG_LEVEL_DBG=y
      CONFIG_AZURE_JOBS_LOG_LEVEL_DBG=y

#. Comment out the nRF Cloud settings in the :file:`prj.conf` file:

   .. code-block:: bash

      # CONFIG_AGPS=y
      # CONFIG_AGPS_SRC_NRF_CLOUD=y
      # CONFIG_NRF_CLOUD=y
      # CONFIG_NRF_CLOUD_AGPS=y
      # CONFIG_NRF_CLOUD_CONNECTION_POLL_THREAD=y
      # CONFIG_NRF_CLOUD_PGPS=n
      # CONFIG_NRF_CLOUD_SEND_TIMEOUT=y
      # CONFIG_GPS_MODULE_NMEA=y
   
#. Comment out the nRF Cloud logging settings in the :file:`overlay-debug.conf` file:

   .. code-block:: bash

      # CONFIG_NRF_CLOUD_FOTA_LOG_LEVEL_DBG=y
      # CONFIG_NRF_CLOUD_GPS_LOG_LEVEL_DBG=y
      # CONFIG_NRF_CLOUD_LOG_LEVEL_DBG=y

After completing the configuration, compile the firmware either :ref:`using your own development environment <firmware-azure-building>` or :ref:`using Docker <firmware-azure-building-docker>` and then :ref:`create the device credentials <azure-device-credentials>`.

.. note::

   See the documentation on `nRF9160: Asset Tracker v2 application <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/applications/asset_tracker_v2/README.html>`_ for all available configuration options.
      