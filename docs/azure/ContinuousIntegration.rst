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

Prepare your Azure account
**************************

.. note::

   The setup process in Azure is more complicated when compared to the :ref:`AWS continuous integration setup <aws-continuous-integration>`, since it involves many manual steps, which cannot be automated.
   If you have ideas to simplify the process, `please provide your input <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/issues/1>`_.

Login and create the resource group
===================================

To create the resource group for the CI resources, complete the following steps:

1. Login to the shell:

   .. code-block:: bash

       az login

#. Export the identifier of the subscription which contains the nRF Asset Tracker resources:

   .. parsed-literal::
      :class: highlight

      export SUBSCRIPTION_ID="*subscription id*"

#. Make sure that you have enabled the right subscription by using the following commands:

   .. code-block:: bash

       az account set --subscription $SUBSCRIPTION_ID 
       # Verify that it is set to default
       az account list --output table

#. Choose a resource group name for the solution and export it as ``RESOURCE_GROUP``.
   In this example, we use ``nrfassettrackerci`` as the resource group name.

   .. code-block:: bash

      export RESOURCE_GROUP="nrfassettrackerci"
    
#. Choose a name for the solution and export it as ``APP_NAME``.
   Use a short name (not more than 16 characters) composed of numbers and lower-case letters only.
   In this example, we use ``nrfassettrackerci`` as the application name.

   .. parsed-literal::
      :class: highlight

      export APP_NAME="nrfassettrackerci"

#. Configure your preferred location (you can list the locations using ``az account list-locations``) and export it on the environment variable ``LOCATION``.
   In this example, we use ``northeurope`` as the location name.

   .. code-block:: bash

      export LOCATION="northeurope"

#. Create a resource group for the CI resources:

   .. code-block:: bash

       az group create --name ${RESOURCE_GROUP:-nrfassettrackerci} --location ${LOCATION:-northeurope}

Create a secondary tenant (Azure Active Directory B2C)
======================================================

1. Create an Azure Active Directory B2C. Currently, it is not possible to create an Active Directory B2C and application through the ARM template (see `GitHub issue <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/issues/1>`_).

   a. Follow the instructions in the `tutorial for creasting an Azure Active Directory B2C tenant <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant>`_ and create a B2C tenant.

   #. Follow the instructions in the `tutorial for setting up a resource owner password credentials flow in Azure Active Directory B2C <https://docs.microsoft.com/en-us/azure/active-directory-b2c/add-ropc-policy?tabs=app-reg-ga&pivots=b2c-user-flow#register-an-application>`_ and register an application.
      Make sure to:

      - set the :guilabel:`Supported account types` to :guilabel:`All users`     
      - update the manifest and set
        
        .. code:: json

           "oauth2AllowImplicitFlow": true
   
#. Export the initial domain name that you used:

   .. parsed-literal::
      :class: highlight

      export B2C_TENANT="*Initial domain name*" # For example, "nrfassettrackerciusers"

#. Export the :guilabel:`Application (client) ID` and the :guilabel:`Directory (tenant) ID` of the created Active Directory B2C App:

   .. parsed-literal::
      :class: highlight

      export APP_REG_CLIENT_ID="*Application (client) id*"
      export B2C_TENANT_ID="*Directory (tenant) ID*"

#. For enabling the test-runner to programmatically login users, enable `the resource owner password credentials (ROPC) flow <https://docs.microsoft.com/EN-US/azure/active-directory-b2c/configure-ropc?tabs=app-reg-ga>`_ with the following settings on the Active Directory B2C:

   a. Name - ``B2C_1_developer``.
   #. Application claims - Select :guilabel:`Show more ...` and then mark :guilabel:`Email Addresses` as a return claim.

#. Grant the B2C directory API permissions for authenticating users:

   a. In the left menu, under :guilabel:`Manage`, select :guilabel:`API permissions`. Add the permission to manage user accounts (:guilabel:`Microsoft Graph` > :guilabel:`Application permission` > :guilabel:`User.ReadWrite.All`).

#. Grant the B2C directory API permissions for the function app:
   
   a. Click :guilabel:`Expose an API` and  set the :guilabel:`Application ID URI` field to ``api``.
   
   #. Click :guilabel:`+ Add a scope` and create a new scope with the following values and click :guilabel:`Add a scope`:
      
      * Scope name - ``nrfassettracker.admin``
      * Admin consent display name - Admin access to the nRF Asset Tracker API
      * Admin consent description - Allows admin access to all resources exposed through the nRF Asset Tracker API

   #. Click :guilabel:`API permissions` and then click :guilabel:`+ Add a permission`. Under :guilabel:`My APIs`, select the app registration.
   
   #. Enable the ``nrfassettracker.admin`` permission and click :guilabel:`Add permission`.
   
#. Click :guilabel:`Grant admin consent for <your B2C directory>`.
   
#. Create a new client secret for the App registration (for example, ``12OzW72ie-U.vlmzik-eO5gX.x26jLTI6U``) and note it down.

   .. parsed-literal::
      :class: highlight

      export B2C_CLIENT_SECRET="*client secret*"

#. Link this Azure AD B2C tenant to the subscription for CI by following the `Billing guide <https://docs.microsoft.com/en-us/azure/active-directory-b2c/billing#link-an-azure-ad-b2c-tenant-to-a-subscription>`_.

Setup continuous integration on GitHub
**************************************

1. Create the CI credentials:

   .. code-block:: bash

      az ad sp create-for-rbac --name 'https://nrfassettracker.invalid/ci' \
      --role contributor \
      --scopes /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP:-nrfassettrackerci} \
      --sdk-auth \
      > ci-credentials.json

#. Fork the `nRF Asset Tracker for Azure project <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js>`_.

#. Add the following secrets to an environment called ``ci``:

   *  ``RESOURCE_GROUP``
   *  ``APP_REG_CLIENT_ID``
   *  ``AZURE_CREDENTIALS`` (the contents of :file:`ci-credentials.json`)
   *  ``B2C_CLIENT_SECRET``
   *  ``B2C_TENANT_ID``
   *  ``APP_NAME``
   *  ``B2C_TENANT``
   *  ``LOCATION``

Commit and push a change
************************

Now, commit and push a change to your repository.
This will trigger the CI run.

You can also manually trigger a deploy on the *Test and Release* workflow.

Running the solution during development
***************************************

To run the end-to-end tests agains the solution during development, run the following commands:

.. code-block:: bash

      # Install dependencies
      npm ci

      # One time operation: create an intermediate CA certificate
      node cli create-ca-root
      node cli proof-ca-root-possession
      node cli create-ca-intermediate

      # Run tests
      npm run test:e2e

.. note::

   Azure functions allow only one *Client Id* and *Issuer Url* in the Active Directory authentication configuration. So, you cannot interact with this instance from the end-to-end tests and the web application since the user flow name differs (``B2C_1_developer`` for end-to-end tests and ``B2C_1_signup_signin`` for the web application) and it is part of the Issuer Url (for example, ``https://${TENANT_DOMAIN}.b2clogin.com/${TENANT_DOMAIN}.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_developer``).