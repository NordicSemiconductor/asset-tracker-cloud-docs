.. _azure-continuous-integration:

Continuous integration
######################

.. contents::
   :local:
   :depth: 2

Continuous integration involves the following actions:

* Every change to the project is tested against an Azure account, which must be manually prepared.
* A BDD test-suite of end-to-end tests written in `Gherkin <https://cucumber.io/docs/gherkin/>`_, which describes the tests in English, is run.

In this way, the tests are not tied to the implementation and during refactoring, and you cannot accidentally drop tests.
Tests written for test-runners like `Jest <https://jestjs.io/>`_ tend to be closely tied to the API of the source-code implementation.
In the case of bigger refactoring, the tests themselves usually need to be refactored as well.
Since the BDD tests are purely testing based on the public API of the project (which is a mix of the native Azure API and a custom REST API), they can be kept unchanged during refactoring.

.. note::

    This is an advanced topic for those who need to further develop and customize the nRF Asset Tracker.
    See the `nRF Asset Tracker for Azure GitHub project page <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js>`_, for the implementation of the process outlined in this section.

The project also provides an easily understandable description of the available (and implemented) features, in a single folder called  `features <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/tree/saga/features>`_.

Prepare your Azure account
**************************

.. note::

   The setup process in Azure is more complicated when compared to the :ref:`AWS continuous integration setup <aws-continuous-integration>`, since it involves many manual steps, which cannot be automated.
   If you have ideas to simplify the process, `please provide your input <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/issues/1>`_.

Create a secondary tenant (Azure Active Directory B2C)
======================================================

1. Create a new Azure Active Directory B2C tenant, which is used as the identity management solution for the user accounts of the nRF Asset Tracker instance.

#. Follow `the Create Tenant guide <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant>`_ to create a new Azure AD B2C tenant with the following values:

   * Organization name - ``nRF Asset Tracker (CI) Users``.
   * Initial domain name - ``nrfassettrackerciusers`` (Customize the name since it is globally unique).
   * Country - Choose your preferred country.

#. Note down the initial domain name that you used:

   .. parsed-literal::
      :class: highlight

      export B2C_TENANT="*Primary domain*" # For example, "nrfassettrackerciusers"

#. Link this Azure AD B2C tenant to the subscription for CI by following the `Billing guide <https://docs.microsoft.com/en-us/azure/active-directory-b2c/billing#link-an-azure-ad-b2c-tenant-to-a-subscription>`_.

Create the Azure Active Directory B2C application
-------------------------------------------------

To create the Azure Active Directory B2C application, complete the following steps:

1. Follow the instructions in the :ref:`Continous Deployment <azure-continuous-deployment>` instructions to create a new App registration with the following values:

   * Name - Cat Tracker Web App.
   * Redirect URI (make sure to select SPA) - ``https://nrfassettrackerciapp.z16.web.core.windows.net/`` (Choose a name that fits your project instead of ``nrfassettrackerciapp`` since ``nrfassettrackerciapp`` is globally unique).

#. Export the ``Application (client) ID`` and the ``Directory (tenant) ID`` of the created Active Directory B2C App registration into the ``APP_REG_CLIENT_ID`` and ``B2C_TENANT_ID`` parameters:

   .. parsed-literal::
      :class: highlight

      export APP_REG_CLIENT_ID="*Application (client) ID*"
      export B2C_TENANT_ID="*Directory (tenant) ID*"

#. For enabling the test-runner to programmatically login users, enable `the resource owner password credentials (ROPC) flow <https://docs.microsoft.com/EN-US/azure/active-directory-b2c/configure-ropc?tabs=app-reg-ga>`_ with the following settings:

   * Name - ``B2C_1_developer``.
   * Application claims - Select ``Show more ...`` and then mark ``Email Addresses`` as a return claim.

#. Add the permission to manage user accounts (Microsoft Graph > ``User.ReadWrite.All``) and grant admin consent.

#. In the left menu, under :guilabel:`Manage`, select :guilabel:`Authentication`. Allow the Implicit grant for Access and ID tokens and select ``Yes`` for :guilabel:`Treat application as a public client`.

#. Create a new client secret for the App registration (for example, "12OzW72ie-U.vlmzik-eO5gX.x26jLTI6U") and note it down.

Deploy the solution
*******************

To deploy the solution, complete the following steps:

1. Login to the shell:

   .. code-block:: bash

       az login

#. Export the identifier of the subscription which contains the nRF Asset Tracker resources:

   .. parsed-literal::
      :class: highlight

      export SUBSCRIPTION_ID="*subscription ID*"

#. Make sure that you have enabled the right subscription by using the following commands:

   .. code-block:: bash

       az account set --subscription $SUBSCRIPTION_ID 
       # Verify that it is set to default
       az account list --output table

#. Create the CI credentials:

   .. code-block:: bash

       az ad sp create-for-rbac --name https://github.com/ --role Contributor --sdk-auth --scopes /subscriptions/${SUBSCRIPTION_ID} > ci-credentials.json

#. Create a resource group for the nRF Asset Tracker:

   .. code-block:: bash

       az group create --name ${RESOURCE_GROUP:-nrfassettrackerci} --location ${LOCATION:-northeurope}

#. Deploy the resources:

   .. code-block:: bash

       az deployment group create \
       --resource-group ${RESOURCE_GROUP:-nrfassettrackerci} \
       --mode Complete \
       --template-file azuredeploy.json \
       --parameters \
       appName=${APP_NAME:-nrfassettrackerci} \
       location=${LOCATION:-northeurope} \
       appRegistrationClientId=$APP_REG_CLIENT_ID \
       b2cTenant=$B2C_TENANT \
       b2cFlowName=B2C_1_developer

#. Publish the functions:

   .. code-block:: bash

       func azure functionapp publish ${APP_NAME:-nrfassettrackerci}API --typescript

   Docker variant for publishing the functions (in case you get a ``Permission denied`` error):

   .. code-block:: bash

       docker run --rm -v ${PWD}:/workdir -v ${HOME}/.azure:/root/.azure nordicsemiconductor/asset-tracker-cloud-azure-js:saga \
           func azure functionapp publish ${APP_NAME:-nrfassettrackerci}API --typescript

Setup continuous integration on GitHub
**************************************

Fork the `nRF Asset Tracker for Azure project <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js>`_ and add the following secrets to an environment called ``ci``:

*  ``APP_REG_CLIENT_ID``
*  ``AZURE_CREDENTIALS`` (the contents of :file:`ci-credentials.json`)
*  ``B2C_CLIENT_SECRET``
*  ``B2C_TENANT_ID``

Running the solution during development
***************************************

To run the solution during development, run the following commands:

.. code-block:: bash

      export API_ENDPOINT=https://`az functionapp show -g ${RESOURCE_GROUP:-nrfassettrackerci} -n ${APP_NAME:-nrfassettrackerci}api --query 'defaultHostName' --output tsv | tr -d '\n'`/

      npm ci
      npm run test:e2e

.. note::

   Azure functions allow only one ``Issuer Url`` in the Active Directory authentication configuration. So, you cannot interact with this instance from the end-to-end tests and the web application since the user flow name differs (``B2C_1_developer`` for end-to-end tests and ``B2C_1_signup_signin`` for the web application) and it is part of the Issuer Url (for example, ``https://${TENANT_DOMAIN}.b2clogin.com/${TENANT_DOMAIN}.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_developer``).