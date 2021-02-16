.. _firmware-configuration:

Firmware configuration
######################

.. note::

    Below are the *mandatory* steps to configure the :ref:`Cat Tracker firmware <firmware>`.
    All configuration options are configured in the `asset_tracker_v2 application documentation <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/applications/asset_tracker_v2/README.html>`_.

Run this command to print the MQTT endpoint your devices will connect to:

.. code-block:: bash

    node cli info -o mqttEndpoint

Use this as the value for the ``CONFIG_AWS_IOT_BROKER_HOST_NAME`` configuration variable of the :ref:`Cat Tracker firmware <firmware>`.

Use ``42`` as the value for ``CONFIG_AWS_IOT_SEC_TAG``.
