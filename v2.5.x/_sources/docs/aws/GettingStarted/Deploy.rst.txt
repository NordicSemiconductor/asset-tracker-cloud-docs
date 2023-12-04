.. _aws-getting-started-deploy:

Install the nRF Asset Tracker into your AWS account
###################################################

The following commands set up the necessary resources in your AWS account:

.. code-block:: bash

    # ~/nrf-asset-tracker/aws

    # Deploy the example (see the note below)
    #   It will prompt:
    #     Do you wish to deploy these changes (y/n)?
    #   twice (the first is for the main stack, and the second is when deploying the web application stack)
    #   Both need to be confirmed with 'y'
    npx cdk deploy --all

The initial deployment will take a few minutes because it sets up a `CloudFront <https://aws.amazon.com/cloudfront/>`_ distribution for the web application.

.. note::

    The AWS CDK provides a list of permission changes to your account, and you need to review them carefully whenever you make changes to the setup.
    However, this step is not mandatory and you can safely skip it, because you are deploying in a blank account.
    To skip this step in future, run ``npx cdk deploy --all --require-approval never``.
    Do this only in standalone accounts for development purposes.