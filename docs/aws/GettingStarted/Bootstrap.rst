.. _aws-getting-started-bootstrap:

Bootstrap your AWS account for AWS CDK
######################################

The following commands set up the necessary resources in your AWS account for the deployment using AWS CDK:

.. code-block:: bash

    # ~/nrf-asset-tracker/aws

    # One-time operation to support large CloudFormation templates in CDK
    npx cdk bootstrap aws://`aws sts get-caller-identity | jq -r '.Account' | tr -d '\n'`/${AWS_REGION}
