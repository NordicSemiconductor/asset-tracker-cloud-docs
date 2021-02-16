.. _firmware-configuration:

Firmware configuration
######################

Run this command to print the MQTT endpoint your devices will connect to:

.. code-block:: bash

    west build -p always -b thingy91_nrf9160ns

Use this as the value for the ``CONFIG_AWS_IOT_BROKER_HOST_NAME`` configuration variable of the :ref:`Cat Tracker firmware <firmware>`.
