.. _aws-firmware-configuration:

Configure the firmware
######################

To configure the :ref:`firmware <firmware-aws-index>`, complete the following mandatory steps:

1. Create the file :file:`firmware.conf` in the ``~/nrf-asset-tracker`` folder for your configuration overrides.

#. Run the following command to print the MQTT endpoint to which your devices will connect:

   .. code-block:: bash

      node cli info -o mqttEndpoint

#. Add the ``CONFIG_AWS_IOT_BROKER_HOST_NAME`` setting to the :file:`firmware.conf` file, using the endpoint value from the previous step as the value:

   .. parsed-literal::
      :class: highlight

      CONFIG_AWS_IOT_BROKER_HOST_NAME="*your MQTT endpoint*"

After completing the configuration, compile the firmware either :ref:`using your own development environment <firmware-aws-building>` or :ref:`using Docker <firmware-aws-building-docker>` and then :ref:`create the device credentials <aws-device-credentials>`.

.. note::

   See the documentation on `nRF9160: Asset Tracker v2 application <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/applications/asset_tracker_v2/README.html>`_ for all available configuration options.