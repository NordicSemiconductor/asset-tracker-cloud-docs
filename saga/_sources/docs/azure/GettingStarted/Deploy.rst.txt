.. _azure-getting-started-deploy:

Install the nRF Asset Tracker into your Azure account
#####################################################

.. note::

   The setup process in Azure is more complicated when compared to the :ref:`AWS continuous integration setup <aws-continuous-integration>` since it involves many manual steps that cannot be automated.
   If you have ideas to simplify the process, `provide your input <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/issues/1>`_.

To install the nRF Asset Tracker into your Azure account, complete the following steps:

1. Export the identifier of the subscription that contains the nRF Asset Tracker resources to a new :file:`.envrc` file (:ref:`used with direnv <about-direnv>`):

   .. parsed-literal::
      :class: highlight

      # add to .envrc
      export SUBSCRIPTION_ID="*Subscription ID*"

#. Choose a resource group name for the solution and export it as ``RESOURCE_GROUP``.
   In this example, ``nrfassettracker`` is used as the resource group name.

   .. code-block:: bash

      # add to .envrc
      export RESOURCE_GROUP="nrfassettracker"

#. Choose a name for the solution and export it as ``APP_NAME``.
   Use a short name (not more than 16 characters) composed of numbers and lowercase letters only.
   In this example, ``nrfassettracker`` is used as the application name.

   .. code-block:: bash

      # add to .envrc
      export APP_NAME="nrfassettracker"

#. Choose a unique name for the storage account and export it as ``STORAGE_ACCOUNT_NAME``.
   Storage account names must be between 3 and 24 characters and may contain numbers and lowercase letters only.
   In this example, ``nrfassettracker`` is used as the storage account name.

   .. code-block:: bash

      # add to .envrc
      export STORAGE_ACCOUNT_NAME="nrfassettracker"

#. Configure your preferred location (you can list the locations using ``az account list-locations``) and export it on the environment variable ``LOCATION``.
   In this example, ``northeurope`` is used as the location name.

   .. code-block:: bash

      # add to .envrc
      export LOCATION="northeurope"

#. Run the following command to allow the changed file:

   .. code-block:: bash

      direnv allow
   
#. Make sure that you have enabled the right subscription by using the following commands:

   .. code-block:: bash

      az account set --subscription $SUBSCRIPTION_ID 
      # Verify that it is set to default
      az account list --output table

#. Create the resource group for the solution:

   .. code-block:: bash

      az group create --subscription $SUBSCRIPTION_ID -l $LOCATION -n ${RESOURCE_GROUP:-nrfassettracker}

#. Register the namespace in the subscription for creating an Azure Active Directory B2C in the next step:

   .. code-block:: bash

      az provider register --namespace Microsoft.AzureActiveDirectory

#. Follow the `tutorial for creating an Azure Active Directory B2C <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant>`_. On the creation screen, select the resource group you have created above. Currently, it is not possible to create an Active Directory B2C and application through the ARM template (see `GitHub issue <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/issues/1>`_).

#. Save the initial domain name of the created Active Directory B2C to the environment variable ``B2C_TENANT``.
   In this example, ``nrfassettrackerusers`` is used as the initial domain name.

   .. code-block:: bash

      # add to .envrc
      export B2C_TENANT="nrfassettrackerusers"

#. Select :guilabel:`User flows`, create the user flow for sign up and sign in (recommended version), and make sure to name the userflow as ``B2C_1_signup_signin``.

#. Follow the instructions in the `tutorial for registering a web application in Azure Active Directory B2C <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications?tabs=app-reg-ga#register-a-web-application>`_ and register a web application. Use ``https://<your APP_NAME>app.z16.web.core.windows.net/`` as the redirect URL.

#. Select :guilabel:`Authentication`, enable the implicit grant and hybrid flows for :guilabel:`Access tokens` and :guilabel:`ID tokens` and click :guilabel:`Save`.

#. Save the ``application (client) id`` to the environment variable ``APP_REG_CLIENT_ID`` in the :file:`.envrc` file:

   .. code-block:: bash

      # add to .envrc
      export APP_REG_CLIENT_ID=...

#. Grant the app registration directory API permissions for the function app:

   a. Click :guilabel:`Expose an API`.
   
   #. Set the ``Application ID URI`` field to ``api`` and click :guilabel:`Save and continue`. 
   
   #. Create a new scope with the following values and click :guilabel:`Add a scope`:
      
      * Scope name - ``nrfassettracker.admin``
      * Admin consent display name - Administrator access to the nRF Asset Tracker API
      * Admin consent description - Allows administrator access to all resources exposed through the nRF Asset Tracker API

   #. Click :guilabel:`API permissions` and then click :guilabel:`+ Add a permission`. Under :guilabel:`My APIs`, select the app registration.
   
   #. Enable the ``nrfassettracker.admin`` permission and click :guilabel:`Add permission`.
   
   #. Click :guilabel:`Grant admin consent for <your B2C directory>`.

#. Run the following command to allow the changed file:

   .. code-block:: bash

      direnv allow
         
#. Deploy the solution by running the following commands:

   .. code-block:: bash

      az deployment group create --resource-group ${RESOURCE_GROUP:-nrfassettracker} \
         --mode Complete \
         --name initial-setup \
         --template-file azuredeploy.json \
         --parameters \
            appName=${APP_NAME:-nrfassettracker} \
            storageAccountName=${STORAGE_ACCOUNT_NAME:-nrfassettracker} \
            appRegistrationClientId=$APP_REG_CLIENT_ID \
            b2cTenant=$B2C_TENANT \
            keyVaultName=${APP_NAME:-nrfassettracker}
      # Currently it is not possible to enable website hosting through the ARM template
      az storage blob service-properties update \
         --account-name ${STORAGE_ACCOUNT_NAME:-nrfassettracker} \
         --static-website --index-document index.html
      # Deploy the functions
      node scripts/pack-app.js
      az functionapp deployment source config-zip -g ${RESOURCE_GROUP:-nrfassettracker} -n ${APP_NAME:-nrfassettracker}api --src dist/functionapp.zip

   If the command gives an error, you can find the detailed log message using the printed tracking ID and the following command:

   .. parsed-literal::
      :class: highlight

      az monitor activity-log list --correlation-id "*tracking ID*" \\
         | jq '.[].properties.statusMessage | fromjson'

   It can take a few minutes for the detailed log message to be populated.

   If the error message does not include a tracking ID, navigate to the resource group in the Azure portal and review the deployments.
   There is a failed deployment called ``initial-setup``.
   Examine its error details.
