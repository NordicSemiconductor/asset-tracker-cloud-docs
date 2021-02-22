.. _firmware-configuration:

Configure the *Cat Tracker firmware*
####################################

.. note::

    Below are the *mandatory* steps to configure the :ref:`Cat Tracker firmware <firmware>`.
    All available configuration options are documented in the `asset_tracker_v2 application documentation <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/applications/asset_tracker_v2/README.html>`_.

Run this command to print the MQTT endpoint your devices will connect to:

.. code-block:: bash

    node cli info -o mqttEndpoint

Use this as the value for the ``CONFIG_AWS_IOT_BROKER_HOST_NAME`` configuration variable.

Use ``42`` as the value for ``CONFIG_AWS_IOT_SEC_TAG``.

Now, you can compile the firmware either :ref:`using Docker <firmware-building-docker>` or :ref:`tradionally using your own development environment <firmware-building>`.

After you are done compiling the firmware, return here and continue on the next page.
