.. _index_aws:

AWS cloud components 
#####################

The nRF Asset Tracker provides a reference implementation of a serverless backend for an IoT product using AWS.
It is developed using `AWS CDK <https://aws.amazon.com/cdk/>`_ in `TypeScript <https://www.typescriptlang.org/>`_.

The project also provides a description of the available (and implemented) features in a folder called `features <https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js/tree/saga/features>`_.
The :file:`.feature` files in the folder are used to continuously verify the reference implementation using :ref:`aws-continuous-integration`.

.. toctree::
   :titlesonly:
   :caption: Subpages:

   GettingStarted/Index.rst
   Upgrading.rst
   Uninstalling.rst
   ContinuousDeployment.rst
   ContinuousIntegration/Index.rst
   Simulator.rst
   Authentication.rst
   IoTShadowAndTopics.rst
   LimitingShadowDocumentSize.rst
   HistoricalData.rst
   SNI.rst
