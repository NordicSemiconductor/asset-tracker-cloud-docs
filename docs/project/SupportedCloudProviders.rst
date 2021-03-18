.. _supported-cloud-providers:

Supported cloud providers
#########################

See the below table for a list of supported cloud providers:

+-----------------------+-----------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------------------------+
|                       | Amazon Web Services                           | Microsoft Azure                                                                                 | Google Cloud                                                |
+=======================+===============================================+=================================================================================================+=============================================================+
| LTE-M: TCP and MQTT   | :ref:`feature complete <aws-getting-started>` | `In progress <https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/discussions/12>`_ | `On hold <https://github.com/bifravst/bifravst/issues/25>`_ |
+-----------------------+-----------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------------------------+
| NB-IoT: UDP and LWM2M | In consideration                              | In consideration                                                                                |                                                             |
+-----------------------+-----------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------------------------+

.. note::

   The *nRF Asset Tracker* is not a *multi-cloud* solution.
   The concrete implementation will differ for each cloud provider.
   This solution does not aim to provide a solution where you can switch in a seamless manner between cloud providers.

   
A multi-cloud solution with a functionality of switching between the clouds will require the implementation of additional abstraction layers.
Also, it can mandate a constant translation between the vendor-specific concepts and the abstraction instead of becoming a meaningful benefit for the majority of users.
Hence, in this project, the best practices of the respective cloud vendor for building a *serverless* IoT solution are followed.

In the case of cloud providers without native UDP and LWM2M support, the option of using a bridge such as `Eclipse Californium <https://github.com/eclipse/californium>`_, was evaluated.
For more information, see `Leshan LwM2M AWS IoT Gateway <https://github.com/coderbyheart/leshan-aws>`_.

IoT cloud vendor survey results
===============================

The following table provides a comparison between the results of the IoT cloud vendor surveys done on different years: 

+-----------------+------------------------+------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| Cloud providers | Nordic internal (2019) | Nordic internal (2020) | `Eclipse Foundation (2019) <https://iot.eclipse.org/community/resources/iot-surveys/assets/iot-comm-adoption-survey-2019.pdf>`_ |
+=================+========================+========================+=================================================================================================================================+
| AWS             | 1\. 100%               | 1\. 100%               | 1\. 100%                                                                                                                        |
+-----------------+------------------------+------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| Google          | 2\. 79%                | 2\. 68% ▼              | 3\. 73%                                                                                                                         |
+-----------------+------------------------+------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| Azure           | 3\. 66%                | 3\. 66%                | 2\. 84%                                                                                                                         |
+-----------------+------------------------+------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| ARM Pelion      | 4\. 25%                | 4\. 23% ▼              |                                                                                                                                 |
+-----------------+------------------------+------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| IBM             | 5\. 20%                | 5\. 16% ▼              |                                                                                                                                 |
+-----------------+------------------------+------------------------+---------------------------------------------------------------------------------------------------------------------------------+

These survey results can influence the decision on the selection of the cloud provider.

A value of ``100%`` in the chart corresponds to the majority of answers given for a specific cloud provider in the survey, while the rest of the percentage values for the different cloud providers (with less answers) are given relatively to the majority of answers for a specific cloud provider per year.