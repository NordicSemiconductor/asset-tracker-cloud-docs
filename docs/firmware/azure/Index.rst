.. _firmware-azure-index:

Firmware for the Azure cloud components
#######################################

The firmware of the :ref:`nRF Asset Tracker <project>` is the `nRF9160: Asset Tracker v2 <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/applications/asset_tracker_v2/README.html>`_, which is a reference application developed using the `nRF Connect SDK <https://github.com/nrfconnect/sdk-nrf>`_.

It is compatible with the :ref:`nRF Asset Tracker for Azure <index_azure>`.

The `firmware GitHub repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-azure>`_ provides an example for using the application as an out-of-tree development copy, which optionally enables the SUPL client.

.. note::

   The current firmware-over-the-air (FOTA) update mechanism implemented in nRF Asset Tracker for Azure is based on the `Microsoft Azure tutorial for implementing a device firmware update process <https://docs.microsoft.com/en-us/azure/iot-hub/tutorial-firmware-update>`_.
   In February 2021, Microsoft released `a preview of Device Update for IoT Hub <https://techcommunity.microsoft.com/t5/internet-of-things/streamline-device-management-with-device-update-for-iot-hub-now/ba-p/2167663>`_ which will replace the current mechanism, as soon as it is generally available.
   See the `Azure support discussion <https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/discussions/12#discussioncomment-483383>`_ for details about the ongoing work to implement the new update mechanism.

.. toctree::
   :titlesonly:
   :caption: Subpages:

   BuildingUsingLocalSystem.rst
   BuildingUsingDocker.rst
   BuildingUsingGitHub.rst
