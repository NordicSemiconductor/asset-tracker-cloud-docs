.. _aws-memfault-integration:

Memfault integration for AWS
############################

.. contents::
   :local:
   :depth: 2

.. include:: ./Index.rst
   :start-after: intro_start
   :end-before: intro_end

You can use the integration standalone without an existing instance of :ref:`nRF Asset Tracker for AWS <aws-getting-started>`.

Prerequisites
*************

Before you start setting up the Memfault integration for AWS, make sure that you fulfill the following prerequisites:

.. include:: ../aws/GettingStarted/Index.rst
   :start-after: prerequisites_start
   :end-before: prerequisites_end

Clone the project and install the dependencies
**********************************************

To clone the `nRF Asset Tracker Memfault integration for AWS IoT <https://github.com/NordicSemiconductor/asset-tracker-cloud-memfault-aws-js>`_ project and install the dependencies, use the following commands:

.. parsed-literal::

    git clone --branch |version| --single-branch \\
      https://github.com/NordicSemiconductor/asset-tracker-cloud-memfault-aws-js memfault-aws
    
    cd memfault-aws 
    
    # Install the dependencies
    npm ci
    
Configure Memfault settings
***************************

You can retrieve the project settings from the settings page of the Memfault dashboard of your organization.

.. parsed-literal::
   :class: highlight

   aws ssm put-parameter --type String --name /${STACK_NAME:-nrf-memfault}/thirdParty/memfault/projectKey --value *<your memfault project key>*
   aws ssm put-parameter --type String --name /${STACK_NAME:-nrf-memfault}/thirdParty/memfault/organization --value *<your organization slug>*
   aws ssm put-parameter --type String --name /${STACK_NAME:-nrf-memfault}/thirdParty/memfault/project --value *<your project slug>*

Administrators can access and manage the organization authorization token at :guilabel:`Admin` > :guilabel:`Organization Auth Tokens` in the Memfault UI.

.. parsed-literal::
   :class: highlight

   aws ssm put-parameter --type String --name /${STACK_NAME:-nrf-memfault}/thirdParty/memfault/authToken --value *<your auth token>*

Configure stack settings
************************

You can configure the topic that devices use to publish Memfault chunks through the `CDK context variable <https://docs.aws.amazon.com/cdk/v2/guide/context.html>`_ ``memfaultTopic``.
The topic defaults to ``+/memfault/#``.

Deploy the solution to your AWS account
***************************************

To deploy the Memfault integration to your AWS account, run the following command:

.. code-block:: bash

   npx cdk deploy

After a successful deployment, make sure that your devices are allowed to publish to the configured MQTT topic (``<deviceId>/memfault``) by default.
If you are using :ref:`nRF Asset Tracker for AWS <aws-getting-started>`, this is already the case.
Otherwise, refer to the `AWS IoT Core Policies <https://docs.aws.amazon.com/iot/latest/developerguide/pub-sub-policy.html>`_ on how to configure permissions.

Once devices start publishing Memfault heartbeats and core dumps, they appear in your Memfault dashboard.