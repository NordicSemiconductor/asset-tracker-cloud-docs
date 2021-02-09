Packet Data Protocol AT command (``+CGDCONT``)
##############################################

In some networks you might need to provide additional configuration to the modem (e.g. the APN).
You can achieve this through the `LTE_PDP_CMD configuration setting <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/reference/kconfig/CONFIG_LTE_PDP_CMD.html>`_.

.. code-block:: bash

    CONFIG_LTE_PDP_CMD=y
    CONFIG_LTE_PDP_CONTEXT="0,\"IP\",\"apn.example.com\""
