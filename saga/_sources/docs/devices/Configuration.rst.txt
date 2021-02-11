Configuration
#############

GPS Timeout configuration
*************************

Since the `firware currently does not support A-GPS <https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/discussions/9>`_ depending on the device location acquiring a GPS fix can take a long time.
Therefore a timeout of at least 1000 seconds should be chosen in the web application.

Packet Data Protocol AT command (``+CGDCONT``)
**********************************************

In some networks you might need to provide additional configuration to the modem (e.g. the APN).
You can achieve this through the `LTE_PDP_CMD configuration setting <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/reference/kconfig/CONFIG_LTE_PDP_CMD.html>`_.

.. code-block:: bash

    CONFIG_LTE_PDP_CMD=y
    CONFIG_LTE_PDP_CONTEXT="0,\"IP\",\"apn.example.com\""
