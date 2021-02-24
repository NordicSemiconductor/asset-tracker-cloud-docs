.. _supported-cloud-providers:

Supported cloud providers
#########################

.. note::

   The *Asset Tracker Cloud Example* is not a *multi-cloud* solution.
   The concrete implementation will differ for each cloud provider.
   It does not aim to provide a solution where you can switch in a seamlessmanner between cloud providers.
   Such a solution will require the implementation of additional abstraction layers, which instead of becoming a meaningful benefit for the majority of users, mandate a constant translation between the vendor specific concepts and the abstraction.
   Instead, the best practices of the respective cloud-vendor for building a *serverless* IoT solution are followed.

See the below table for a list of supported cloud providers:

+-------------------+-----------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------------------------+
|                   | Amazon Web Services                           | Microsoft Azure                                                                                 | Google Cloud                                                |
+===================+===============================================+=================================================================================================+=============================================================+
| LTE-M: TCP+MQTT   | :ref:`feature complete <aws-getting-started>` | `in progress <https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/discussions/12>`_ | `on hold <https://github.com/bifravst/bifravst/issues/25>`_ |
+-------------------+-----------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------------------------+
| NB-IoT: UDP+LWM2M | in consideration                              | in consideration                                                                                |                                                             |
+-------------------+-----------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------------------------+

For cloud providers which offer no native UDP+LWM2M support, using a bridge such as `Eclipse Californium <https://github.com/eclipse/californium>`_, was evaluated.
For more information see `Leshan LwM2M AWS IoT Gateway <https://github.com/coderbyheart/leshan-aws>`_.

IoT Cloud vendor survey results
===============================

Below table shows the IoT Cloud vendor survey results: "Which cloud provider to you plan to use in the future?".

To allow comparison between years and surveys ``100%`` in the chart is the most answers given for a specific cloud provider, while those with less answers are provide in percent relative to the number of most answers per year.

+------------+------------------------+------------------------+---------------------------------------------------------------------------------------------------------------------------------+
|            | Nordic internal (2019) | Nordic internal (2020) | `Eclipse Foundation (2019) <https://iot.eclipse.org/community/resources/iot-surveys/assets/iot-comm-adoption-survey-2019.pdf>`_ |
+============+========================+========================+=================================================================================================================================+
| AWS        | 1\. 100%               |               1\. 100% | 1\. 100%                                                                                                                        |
+------------+------------------------+------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| Google     | 2\. 79%                |              2\. 68% ▼ | 3\. 73%                                                                                                                         |
+------------+------------------------+------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| Azure      | 3\. 66%                |                3\. 66% | 2\. 84%                                                                                                                         |
+------------+------------------------+------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| ARM Pelion | 4\. 25%                |              4\. 23% ▼ |                                                                                                                                 |
+------------+------------------------+------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| IBM        | 5\. 20%                |              5\. 16% ▼ |                                                                                                                                 |
+------------+------------------------+------------------------+---------------------------------------------------------------------------------------------------------------------------------+

