.. _azure-continuous-integration:

Continuous integration
######################

.. contents::
   :local:
   :depth: 2

.. note::

   This is an advanced topic that is closely tied with the further development and customization of the nRF Asset Tracker for your purposes.
   See the `GitHub project page of the nRF Asset Tracker for Azure  <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js>`_ for an implementation of the process outlined in this section.

Continuous integration involves the following actions:

* Every change to the project is tested against an Azure account, which must be manually prepared.
* A Behavior Driven Development (BDD) test suite of end-to-end tests is run. The test suite is written in `Gherkin <https://cucumber.io/docs/gherkin/>`_, which describes the tests in English.

In this way, the tests are not tied to the implementation and you cannot accidentally drop tests during refactoring.
Tests written for test runners like `Jest <https://jestjs.io/>`_ tend to be closely tied to the API of the source code implementation.
In the case of a larger refactoring, the tests often need to be refactored as well.
Since the BDD tests are purely testing based on the public API of the project (which is a mix of the native Azure API and a custom REST API), they can be kept unchanged during refactoring.

Prepare your Azure account
**************************

.. note::

   The setup process in Azure is more complicated when compared to the :ref:`AWS continuous integration setup <aws-continuous-integration>` since it involves many manual steps, which cannot be automated.
   If you have ideas to simplify the process, `provide your input <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/issues/1>`_.

Log in and create the resource group
====================================

To create the resource group for the CI resources, complete the following steps:

1. Log in to the shell:

   .. code-block:: bash

      az login

#. Export the identifier of the subscription that contains the nRF Asset Tracker resources:

   .. parsed-literal::
      :class: highlight

      export SUBSCRIPTION_ID="*subscription id*"

#. Make sure that you have enabled the correct subscription by using the following commands:

   .. code-block:: bash

       az account set --subscription $SUBSCRIPTION_ID
       # Verify that it is set to default
       az account list --output table

#. Choose a resource group name for the solution and export it as ``RESOURCE_GROUP``.
   In this example, ``nrfassettrackerci`` is used as the resource group name.

   .. code-block:: bash

      export RESOURCE_GROUP="nrfassettrackerci"

#. Choose a name for the solution and export it as ``APP_NAME``.
   Use a short name (not more than 16 characters) composed of numbers and lowercase letters only.
   In this example, ``nrfassettrackerci`` is used as the application name.

   .. parsed-literal::
      :class: highlight

      export APP_NAME="nrfassettrackerci"

#. Configure your preferred location (you can list the locations using ``az account list-locations``) and export it on the environment variable ``LOCATION``.
   In this example, ``northeurope`` is used as the location name.

   .. code-block:: bash

      export LOCATION="northeurope"

#. Create a resource group for the CI resources:

   .. code-block:: bash

      az group create --name ${RESOURCE_GROUP:-nrfassettrackerci} --location ${LOCATION:-northeurope}

Create a secondary tenant (Azure Active Directory B2C)
======================================================

1. Create an Azure Active Directory B2C. Currently, it is not possible to create an Active Directory B2C and application through the ARM template (see `GitHub issue <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/issues/1>`_).

   a. Follow the instructions in the `tutorial for creating an Azure Active Directory B2C tenant <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant>`_ and create a B2C tenant.

   #. Follow the instructions in the `tutorial for setting up a resource owner password credentials flow in Azure Active Directory B2C <https://docs.microsoft.com/en-us/azure/active-directory-b2c/add-ropc-policy?tabs=app-reg-ga&pivots=b2c-user-flow#register-an-application>`_ and register an application.
      Make sure to set the following parameters:

      * Set the :guilabel:`Supported account types` to :guilabel:`All users`
      * Update the Azure Active Directory app manifest and allow implicit grant flow for OAuth2:

        .. code-block:: json

           {"oauth2AllowImplicitFlow": true}

#. Export the initial domain name that you used:

   .. parsed-literal::
      :class: highlight

      export B2C_TENANT="*Initial domain name*" # For example, "nrfassettrackerciusers"

#. Export the :guilabel:`Application (client) ID` and the :guilabel:`Directory (tenant) ID` of the created Active Directory B2C App:

   .. parsed-literal::
      :class: highlight

      export APP_REG_CLIENT_ID="*Application (client) id*"
      export B2C_TENANT_ID="*Directory (tenant) ID*"

#. For enabling the test-runner to programmatically log in users, enable `the resource owner password credentials (ROPC) flow <https://docs.microsoft.com/EN-US/azure/active-directory-b2c/configure-ropc?tabs=app-reg-ga>`_ with the following settings on the Active Directory B2C:

   a. Name - ``B2C_1_developer``.
   #. Click :guilabel:`Application claims`, select :guilabel:`Show more ...` and then mark :guilabel:`Email Addresses` as a return claim.

#. Grant the B2C directory API permissions for authenticating users:

   a. In the left menu, under :guilabel:`Manage`, select :guilabel:`API permissions`. Add the permission to manage user accounts (:guilabel:`Microsoft Graph` -> :guilabel:`Application permission` -> :guilabel:`User.ReadWrite.All`).

#. Grant the B2C directory API permissions for the function app:

   a. Click :guilabel:`Expose an API` and  set the :guilabel:`Application ID URI` field to ``api``.

   #. Click :guilabel:`+ Add a scope` and create a new scope with the following values and click :guilabel:`Add a scope`:

      * Scope name - ``nrfassettracker.admin``
      * Admin consent display name - Administrator access to the nRF Asset Tracker API
      * Admin consent description - Allows administrator access to all resources exposed through the nRF Asset Tracker API

   #. Click :guilabel:`API permissions` and then click :guilabel:`+ Add a permission`. Under :guilabel:`My APIs`, select the app registration.

   #. Enable the ``nrfassettracker.admin`` permission and click :guilabel:`Add permission`.

#. Click :guilabel:`Grant admin consent for <your B2C directory>`.

#. Create a new client secret for the App registration (for example, ``12OzW72ie-U.vlmzik-eO5gX.x26jLTI6U``) and note it down.

   .. parsed-literal::
      :class: highlight

      export B2C_CLIENT_SECRET="*client secret*"

#. Link this Azure AD B2C tenant to the subscription for CI by following the `Billing guide <https://docs.microsoft.com/en-us/azure/active-directory-b2c/billing#link-an-azure-ad-b2c-tenant-to-a-subscription>`_.

Fork the nRF Asset Tracker repositories
***************************************

To enable continuous deployment, complete the following steps:

1. Fork the `nRF Asset Tracker for Azure repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js>`_.
#. Fork the `nRF Asset Tracker web application repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-app-js>`_.
#. Update the `deploy.webApp.repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/blob/fd3777cde331286faf10e481bdf1a30327882008/package.json#L111>`_ in the :file:`package.json` file of your nRF Asset Tracker for Azure fork. It must point to the repository URL of your fork of the nRF Asset Tracker web application.

Set up continuous integration on GitHub
***************************************

To allow the continuous deployment GitHub Action workflow to authenticate against Azure with short-lived credentials using a service principal, complete the following steps:

.. _azure-continuous-integration-configure-service-principal:

1. Follow the instructions to `Configure a service principal with a Federated Credential to use OIDC based authentication <https://github.com/Azure/login#configure-a-service-principal-with-a-federated-credential-to-use-oidc-based-authentication>`_.
   Use ``https://nrfassettracker.invalid/ci`` as the name.

   From the command line this can be achieved using:

   .. code-block:: bash

      az ad app create --display-name 'https://nrfassettracker.invalid/ci'
      export APPLICATION_OBJECT_ID=`az ad app list | jq -r '.[] | select(.displayName=="https://nrfassettracker.invalid/ci") | .id' | tr -d '\n'`
      az rest --method POST --uri "https://graph.microsoft.com/beta/applications/${APPLICATION_OBJECT_ID}/federatedIdentityCredentials" --body '{"name":"GitHub Actions","issuer":"https://token.actions.githubusercontent.com","subject":"repo:NordicSemiconductor/asset-tracker-cloud-azure-js:environment:ci","description":"Allow GitHub Actions to modify Azure resources","audiences":["api://AzureADTokenExchange"]}'

   Make sure to use the organization and repository name of your fork instead of ``NordicSemiconductor/asset-tracker-cloud-azure-js`` in the command above.

#. Set the secrets:

   - Set the secrets using the GitHub UI:

     Set the following `secrets <https://docs.github.com/en/rest/reference/actions#secrets>`_ through the GitHub UI to an `environment <https://docs.github.com/en/actions/reference/environments#creating-an-environment>`_ called ``production`` in your fork of the nRF Asset Tracker for Azure:

     * ``AZURE_CLIENT_ID`` - Store the application (client) ID of the service principal app registration created in step in the above step.
     * ``AZURE_TENANT_ID`` - Store the directory (tenant) ID of the service principal app registration created in step in the above step.
     * ``AZURE_SUBSCRIPTION_ID`` - Store the ID of the subscription which contains the nRF Asset Tracker resources.

     Set the following following values from your :file:`.envrc` file as secrets as well:

     * ``RESOURCE_GROUP``
     * ``LOCATION``
     * ``APP_NAME``
     * ``B2C_TENANT``
     * ``APP_REG_CLIENT_ID``

     If you have enabled the :ref:`azure-unwired-labs-cell-geolocation`, add your API key ``UNWIRED_LABS_API_KEY`` as a secret as well.

   - Alternatively, set the secrets using the GitHub CLI:

     You can use the `GitHub CLI <https://cli.github.com/>`_  with the environment settings from above (make sure to create the ``ci`` `deployment environment <https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment>`_ in your repository first):

    .. code-block:: bash

       export AZURE_CLIENT_ID=`az ad app list | jq -r '.[] | select(.displayName=="https://nrfassettracker.invalid/ci") | .appId' | tr -d '\n'`
       export AZURE_TENANT_ID=`az ad sp show --id ${AZURE_CLIENT_ID} | jq -r '.appOwnerOrganizationId' | tr -d '\n'`
       gh secret set AZURE_CLIENT_ID --env ci --body "${AZURE_CLIENT_ID}"
       gh secret set AZURE_TENANT_ID --env ci --body "${AZURE_TENANT_ID}"
       gh secret set AZURE_SUBSCRIPTION_ID --env ci --body "${SUBSCRIPTION_ID}"
       gh secret set RESOURCE_GROUP --env ci --body "${RESOURCE_GROUP}"
       gh secret set LOCATION --env ci --body "${LOCATION}"
       gh secret set APP_NAME --env ci --body "${APP_NAME}"
       gh secret set B2C_TENANT --env ci --body "${B2C_TENANT}"
       gh secret set APP_REG_CLIENT_ID --env ci --body "${APP_REG_CLIENT_ID}"

#. Grant the application created in :ref:`step 1 <azure-continuous-integration-configure-service-principal>` Owner permissions for your subscription:

   .. code-block:: bash

      export AZURE_CLIENT_ID=`az ad app list | jq -r '.[] | select(.displayName=="https://nrfassettracker.invalid/ci") | .appId' | tr -d '\n'`
      az role assignment create --role Owner \
         --assignee ${AZURE_CLIENT_ID} \
         --scope /subscriptions/${SUBSCRIPTION_ID}

#. Grant the application created in :ref:`step 1 <azure-continuous-integration-configure-service-principal>` "Key Vault Secrets Officer" to the KeyVault:

   .. code-block:: bash

      export AZURE_CLIENT_ID=`az ad app list | jq -r '.[] | select(.displayName=="https://nrfassettracker.invalid/ci") | .appId' | tr -d '\n'`
      az role assignment create --role "Key Vault Secrets Officer" \
         --assignee ${AZURE_CLIENT_ID} \
         --scope /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP:-nrfassettrackerci}/providers/Microsoft.KeyVault/vaults/${APP_NAME:-nrfassettrackerci}


Commit and push a change
************************

Now, commit and push a change to your repository.
This will trigger the CI run.

You can also manually trigger a deployment on the Test and Release workflow.

Running the solution during development
***************************************

To run the end-to-end tests against the solution during development, run the following commands:

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

   Azure functions allow only one Client ID and Issuer URL in the Active Directory authentication configuration. You cannot interact with this instance from the end-to-end tests and the web application, because the user flow names are different (``B2C_1_developer`` for end-to-end tests and ``B2C_1_signup_signin`` for the web application) and it is part of the Issuer URL (for example, ``https://${TENANT_DOMAIN}.b2clogin.com/${TENANT_DOMAIN}.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_developer``).

More information
****************

You can read more about how GitHub Actions uses OIDC on `About security hardening with OpenID Connect <https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect>`_ in the GitHub Actions documentation.
