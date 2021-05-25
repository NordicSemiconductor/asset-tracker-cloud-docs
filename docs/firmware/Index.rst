.. _firmware-index:

Firmware
########

The firmware of the :ref:`nRF Asset Tracker <project>` is the `nRF9160: Asset Tracker v2 <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/applications/asset_tracker_v2/README.html>`_, which is a reference application developed using the `nRF Connect SDK <https://github.com/nrfconnect/sdk-nrf>`_.

.. only:: only v1.5.x

   It is compatible with the :ref:`nRF Asset Tracker for AWS <index_aws>`.

   The `firmware GitHub repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-aws>`_ provides an example for using the application as an out-of-tree development copy, which optionally enables the SUPL client.

.. only:: not v1.5.x

   It is compatible with the :ref:`nRF Asset Tracker for AWS <index_aws>` and the :ref:`nRF Asset Tracker for Azure <index_azure>`.

   The firmware GitHub repositories `for AWS <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-aws>`_ and `for Azure <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-azure>`_ provide an example for using the application as an out-of-tree development copy, which optionally enables the SUPL client.

.. toctree::
   :titlesonly:
   :caption: Subpages:

   aws/Index.rst
   azure/Index.rst
