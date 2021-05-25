.. _index_azure:

Azure cloud components 
#######################

.. warning_start

.. note::

   The Azure implementation of the nRF Asset Tracker is a work in progress.
   See `this issue <https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/discussions/12>`_ for more information.

.. warning_end

The nRF Asset Tracker provides a reference implementation of a serverless backend for an IoT product using Azure.
It is developed using `Azure Resource Manager <https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview>`_ in `TypeScript <https://www.typescriptlang.org/>`_.

The project also provides a description of the available (and implemented) features in a folder called `features <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/tree/saga/features>`_.
The :file:`.feature` files in the folder are used to continuously verify the reference implementation using :ref:`azure-continuous-integration`.

.. note::

   The Azure solution is using `Cosmos DB <https://docs.microsoft.com/en-us/azure/cosmos-db/introduction>`_ for querying historical device data and it costs around 25 EUR per month.
   However, you can check if you are eligible for `the free tier for new accounts <https://azure.microsoft.com/en-us/pricing/details/cosmos-db/>`_.
   The Azure solution is using `IoT Hub <https://azure.microsoft.com/en-us/services/iot-hub/>`_ with the S1 standard tier and it costs around 25 EUR per month for using `Device Update for IoT Hub <https://docs.microsoft.com/en-us/azure/iot-hub-device-update/understand-device-update>`_.
   Hence, the minimum costs to run nRF Asset Tracker on Azure is around 25-50 EUR per month.


.. toctree::
   :titlesonly:
   :caption: Subpages:

   GettingStarted/Index.rst
   Upgrading.rst
   ContinuousDeployment.rst
   ContinuousIntegration.rst
   RunningInDocker.rst
   DeviceCredentials.rst
   Simulator.rst
   UnwiredLabsAPI.rst
   IoTShadowAndTopics.rst
   secure-azure-function-apps-with-microsoft-b2c.rst
