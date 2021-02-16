.. _firmware-configuration:

Configuration
#############

Run this command to print the MQTT endpoint for your installation:

.. code-block:: bash

    west build -p always -b thingy91_nrf9160ns

Use this as the value for the ``CONFIG_AWS_IOT_BROKER_HOST_NAME`` configuration variable.