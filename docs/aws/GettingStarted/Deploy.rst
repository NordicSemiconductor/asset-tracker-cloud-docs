.. _aws-getting-started-deploy:

Install the *Asset Tracker Cloud Example* into your AWS account
###############################################################

The following commands set up the necessary resources in your AWS account:

.. code-block:: bash

    # Create the S3 Bucket for publishing the lambdas
    npx cdk -a 'node dist/cdk/cloudformation-sourcecode.js' deploy

    # One-time operation to support large CloudFormation templates in CDK
    npx cdk bootstrap
    
    # Deploy the example (see Note below)
    npx cdk deploy '*'

    # This is a fix for a bug with AWS CloudFormation and HTTP APIs
    # See https://github.com/bifravst/aws/issues/455
    node dist/cdk/helper/addFakeRoute.js

.. note::

    The AWS CDK will provide a list of permission changes to your account, and you need to review them carefully whenever you make changes to the setup.
    However, this step is not mandatory, and skipping it is safe since the deploy is happening in a blank account.
    You can skip it by using the following command:

    .. code-block:: bash

        npx cdk deploy '*' --require-approval never
