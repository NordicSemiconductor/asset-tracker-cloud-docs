.. _aws-continuous-integration-cloud:

Continuous integration of the AWS cloud components
##################################################

.. contents::
   :local:
   :depth: 2

.. note::

    This is an advanced topic that is closely tied with the further development and customization of the nRF Asset Tracker for your purposes.
    See the `GitHub project page of the nRF Asset Tracker for AWS <https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js/>`_ for an implementation of the process outlined in this section.

Continuous integration involves the following actions:

* Every change to the project is tested against an AWS account.
* All necessary resources are set up using the AWS Cloud Development Kit (CDK) in a separate AWS account.
  This ensures that the definitions work.
* A Behavior Driven Development (BDD) test suite of end-to-end tests is run.
  The test suite is written in `Gherkin <https://cucumber.io/docs/gherkin/>`_, which describes the tests in English.

In this way, the tests are not tied to the implementation and you cannot accidentally drop tests during refactoring.
Tests written for test runners like `Jest <https://jestjs.io/>`_ tend to be closely tied to the API of the source code implementation.
In the case of larger refactoring, the tests often need to be refactored as well.
Since the BDD tests are purely testing based on the public API of the project (which is the native AWS API), they can be kept unchanged during refactoring.

Running the tests during development
************************************

You can run the following test during development:

.. code-block:: bash

    npm run test:e2e

Providing the environment variables in GitHub
*********************************************

.. note::

    It is recommended to run the tests in a separate, blank account.

To run the end-to-end tests using GitHub Actions, provide the following `environment variables <https://docs.github.com/en/actions/reference/environment-variables>`_:

* ``GITHUB_TOKEN`` - A GitHub token (used with `semantic-release <https://github.com/semantic-release/semantic-release>`_)
* ``AWS_ACCESS_KEY_ID`` - Access key ID of the user used to run the tests
* ``AWS_SECRET_ACCESS_KEY`` - Secret access key of the user

Known issues
************

If the stack creation fails on the ``AWS::ApiGatewayV2::Stage`` resource with the following error, you need to update the ``AWSLogDeliveryWrite20150319`` policy (a built-in policy of the AWS account):

.. code-block:: console

    Insufficient permissions to enable logging (Service: AmazonApiGatewayV2; 
    Status Code: 400; Error Code: BadRequestException; 
    Request ID: 378c255b-c3ed-4d2c-8c00-c4cec2153dbf; Proxy: null)

Run the following command to update the ``AWSLogDeliveryWrite20150319`` policy:

.. code-block:: bash

    aws logs put-resource-policy --policy-name AWSLogDeliveryWrite20150319 \
    --policy-document '{"Version":"2012-10-17","Statement":[{"Sid":"AWSLogDeliveryWrite","Effect":"Allow","Principal":{"Service":"delivery.logs.amazonaws.com"},"Action":["logs:CreateLogStream","logs:PutLogEvents"],"Resource":["*"]}]}'
