.. _aws-firmware-configuration:

Configure the firmware
######################

To configure the :ref:`firmware <firmware-aws-index>`, complete the following mandatory steps:

1. Run the following command to print the MQTT endpoint to which your devices will connect:

   .. code-block:: bash

      node cli info -o mqttEndpoint

#. Use this MQTT endpoint value as the value for the ``CONFIG_AWS_IOT_BROKER_HOST_NAME`` configuration variable.

#. Use ``42`` as the value for ``CONFIG_AWS_IOT_SEC_TAG``.

#. Comment in the remaining AWS settings in the :file:`prj.conf` file:

   .. code-block:: bash
      
      CONFIG_AWS_IOT=y
      CONFIG_AWS_IOT_APP_SUBSCRIPTION_LIST_COUNT=1
      CONFIG_AWS_IOT_AUTO_DEVICE_SHADOW_REQUEST=y
      CONFIG_AWS_IOT_CLIENT_ID_APP=y
      CONFIG_AWS_IOT_MQTT_PAYLOAD_BUFFER_LEN=2048
      CONFIG_AWS_IOT_MQTT_RX_TX_BUFFER_LEN=2048
      CONFIG_AWS_IOT_TOPIC_GET_REJECTED_SUBSCRIBE=y
      CONFIG_AWS_IOT_TOPIC_UPDATE_DELTA_SUBSCRIBE=y
      CONFIG_AWS_FOTA=y
   
#. Comment in the AWS logging settings in the :file:`overlay-debug.conf` file:

   .. code-block:: bash
   
      CONFIG_AWS_FOTA_LOG_LEVEL_DBG=y
      CONFIG_AWS_IOT_LOG_LEVEL_DBG=y
      CONFIG_AWS_JOBS_LOG_LEVEL_DBG=y

#. Comment out the nRF Connect for Cloud settings in the :file:`prj.conf` file:

   .. code-block:: bash

      # CONFIG_AGPS=y
      # CONFIG_AGPS_SRC_NRF_CLOUD=y
      # CONFIG_NRF_CLOUD=y
      # CONFIG_NRF_CLOUD_AGPS=y
      # CONFIG_NRF_CLOUD_CONNECTION_POLL_THREAD=y
      # CONFIG_NRF_CLOUD_PGPS=n
      # CONFIG_NRF_CLOUD_SEND_TIMEOUT=y
      # CONFIG_GPS_MODULE_NMEA=y
   
#. Comment out the nRF Connect for Cloud logging settings in the :file:`overlay-debug.conf` file:

   .. code-block:: bash

      # CONFIG_NRF_CLOUD_FOTA_LOG_LEVEL_DBG=y
      # CONFIG_NRF_CLOUD_GPS_LOG_LEVEL_DBG=y
      # CONFIG_NRF_CLOUD_LOG_LEVEL_DBG=y

After completing the configuration, compile the firmware either :ref:`using your own development environment <firmware-aws-building>` or :ref:`using Docker <firmware-aws-building-docker>` and then :ref:`create the device credentials <aws-device-credentials>`.

.. note::

   See the documentation on `nRF9160: Asset Tracker v2 application (1.6.0) <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/1.6.0/nrf/applications/asset_tracker_v2/README.html>`_ for all available configuration options.
