Deploy the solution to your account
===================================

.. note::

   The setup process in Azure is more complicated when compared to the :ref:`AWS continuous integration setup <aws-continuous-integration>`, since it involves many manual steps, which cannot be automated.
   If you have ideas to simplify the process, `please provide your input <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/issues/1>`_.

1. Export the identifier of the subscription which contains the nRF Asset Tracker resources:

   .. code-block:: bash

      export SUBSCRIPTION_ID="<Subscription ID>"

#. Choose a resource group name for the solution and export it as ``RESOURCE_GROUP``.
   In this example, we use ``nrfassettracker`` as the resource group name.

   .. code-block:: bash

      export RESOURCE_GROUP="nrfassettracker"

#. Choose a name for the solution and export it as ``APP_NAME``.
   Use a short name composed of numbers and lower-case letters only.
   In this example, we use ``nrfassettracker`` as the application name.

   .. code-block:: bash

      export APP_NAME="nrfassettracker"

#. Configure your preferred location (you can list the locations using ``az account list-locations``) and export it on the environment variable ``LOCATION``.
   In this example, we use ``northeurope`` as the location name.

   .. code-block:: bash

      export LOCATION="northeurope"

#. Run the following command to allow the changed file:

   .. code-block:: bash

      direnv allow
   
#. Authenticate the CLI using the following command:

   .. code-block:: bash

      az login

#. Make sure that you have enabled the right subscription by using the following commands:

   .. code-block:: bash

         az account set --subscription $SUBSCRIPTION_ID 
         # Verify that it is set to default
         az account list --output table

#. Create the resource group for the solution:

   .. code-block:: bash

      az group create --subscription $SUBSCRIPTION_ID -l $LOCATION -n ${RESOURCE_GROUP:-nrfassettracker}

#. For creating an Azure Active Directory B2C in the next step, the namespace needs to be registered in the subscription:

   .. code-block:: bash

      az provider register --namespace Microsoft.AzureActiveDirectory

#. Create an Azure Active Directory B2C: currently, it is not possible to create Active Directory B2C and application through the ARM template (see `GitHub issue <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/issues/1>`_).
   You must follow the instructions in the `tutorial for registering a web application in Azure Active Directory B2C <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications?tabs=applications>`_ and create a B2C tenant and an application.
   Use ``http://localhost:3000/`` (for local development) and ``https://<your APP_NAME>app.z16.web.core.windows.net/`` as the redirect URLs.

#. Save the initial domain name of the created Active Directory B2C to the environment variable ``B2C_TENANT``

   .. code-block:: bash

      export B2C_TENANT=... # e.g. nrfassettrackerusers

#. Save the ``application (client) id`` to the environment variable ``APP_REG_CLIENT_ID`` in the :file:`.envrc` file:

   .. code-block:: bash

      export APP_REG_CLIENT_ID=...

#. Create the user flow for sign up, sign in, and make sure to name the userflow as ``B2C_1_signup_signin``.

#. Run the following command to allow the changed file:

   .. code-block:: bash

      direnv allow

#. Deploy the solution by running the following commands:

   .. code-block:: bash

      az deployment group create --resource-group ${RESOURCE_GROUP:-nrfassettracker} \
         --mode Complete \
         --name ${APP_NAME:-nrfassettracker} \
         --template-file azuredeploy.json \
         --parameters \
            appName=${APP_NAME:-nrfassettracker} \
            location=$LOCATION appRegistrationClientId=$APP_REG_CLIENT_ID \
            b2cTenant=$B2C_TENANT \
      && \
      # Currently it is not possible to enable website hosting through the ARM template
      az storage blob service-properties update \
         --account-name ${APP_NAME:-nrfassettracker}app \
         --static-website --index-document index.html \
      && \
      az storage blob service-properties update \
         --account-name ${APP_NAME:-nrfassettracker}deviceui \
         --static-website --index-document index.html \
      && \
      # Deploy the functions
      func azure functionapp publish ${APP_NAME:-nrfassettracker}API --typescript
