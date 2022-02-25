.. _aws-continuous-integration-web-app:

Continuous integration of the AWS web application
#################################################

.. contents::
   :local:
   :depth: 2

.. note::

    This is an advanced topic that is closely tied with the further development and customization of the nRF Asset Tracker for your purposes.
    See the `GitHub project page of the nRF Asset Tracker Web Application for AWS <https://github.com/NordicSemiconductor/asset-tracker-cloud-app-aws-js/>`_ for an implementation of the process outlined in this section.

Every change to the project is tested using a head-less browser with the `Playwright <https://Playwright.dev>`_ framework. This ensure that all dependencies of the web application work as intended and present the data in the correct way.

Running end-to-end tests during development
*******************************************

The end-to-end tests run against an instance of the :ref:`nRF Asset Tracker for AWS <index_aws>`.

Use either the credentials you created, :ref:`when setting up the solution <aws-getting-started>`, or enable the Web App CI feature and use the dedicated credentials created for this task.
The latter option is the recommended approach since it limits the permissions to only the ones needed. 
They can also be used to :ref:`run the end-to-end tests on GitHub Actions <aws-continuous-integration-web-app-github>`.

Add these environment variables to your ``.envrc`` file:

.. parsed-literal::
    :class: highlight

    # add to .envrc
    export AWS_REGION="*your preferred AWS region*"
    export AWS_ACCESS_KEY_ID="*value of Access key ID*"
    export AWS_SECRET_ACCESS_KEY="*value of Secret access key*"
    export WEBAPP_STACK_NAME="*name of your web application stack*"

Run the following command to allow the changed ``.envrc`` file

.. code-block:: bash

  direnv allow

Running the tests
-----------------

You can then run the tests using

.. code-block:: bash

  npx playwright test

Playwright Inspector
--------------------

For developing tests it is helpful to run the `Playwright Inspector <https://playwright.dev/docs/inspector>`_.

To enable the inspector during the tests, run:

.. code-block:: bash

  PWDEBUG=1 npx playwright test

.. _aws-continuous-integration-web-app-github:

Running end-to-end tests using GitHub Actions
*********************************************

`This workflow <https://github.com/NordicSemiconductor/asset-tracker-cloud-app-aws-js/blob/41705dae8a5d4d7067c023297a3d38a2f0d1106e/.github/workflows/test-and-release.yaml>`_ runs the end-to-end tests for every commit.
For this to work, you need a running instance of :ref:`nRF Asset Tracker for AWS <index_aws>`.
The tests run against this instance.
Typically it is the production instance, to ensure that the web application works with the current production setup.
Follow the :ref:`Getting started guide <aws-getting-started>` to set up the instance to be used for the tests.

The test runner needs to interact with the instance to retrieve the app configuration and to provide test data.
For this to be possible, you need to configure AWS credentials as `GitHub environment secrets <https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-an-environment>`_.

Enable the web application CI of the nRF Asset Tracker for AWS:

.. code-block:: bash

  node cli configure context stack web-app-ci 1

Set these secrets:

- ``AWS_REGION``
- ``AWS_ACCESS_KEY_ID``
- ``AWS_SECRET_ACCESS_KEY``
- ``WEBAPP_STACK_NAME``

Acquire the secrets using the nRF Asset Tracker for AWS CLI:

.. code-block:: bash

  node cli web-app-ci -s

You can set the secrets through the GitHub UI (make sure to create the ``production`` `environment <https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment>`_ in your repository first).

Alternatively, you can use the `GitHub CLI <https://cli.github.com/>`_  with the
environment settings from above:

.. code-block:: bash

  gh secret set AWS_REGION --env production --body "${AWS_REGION}"
  gh secret set AWS_ACCESS_KEY_ID --env production --body "${AWS_ACCESS_KEY_ID}"
  gh secret set AWS_SECRET_ACCESS_KEY --env production --body "${AWS_SECRET_ACCESS_KEY}"
  gh secret set WEBAPP_STACK_NAME --env production --body "${WEBAPP_STACK_NAME}"