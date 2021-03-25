Deploy the solution to your account
===================================

.. note::

    Since the project uses Azure Active Directory B2C, it is recommended to set up the nRF Asset Tracker in a dedicated subscription.

To deploy the solution to your account, complete the following steps:

1. In the Azure portal, navigate to the :guilabel:`Subscriptions` blade, and add a new subscription for the nRF Asset Tracker. Export the subscription ID onto the ``SUBSCRIPTION_ID`` environment variable:

   .. code-block:: bash

      export SUBSCRIPTION_ID="<Subscription ID>"

#. Authenticate the CLI using the following command:

   .. code-block:: bash

      az login

#. Choose a name for the solution and export it as ``APP_NAME``. In this example, we use ``nrf-asset-tracker`` as the default name.

#. Deploy the solution in your preferred location (you can list the locations using ``az account list-locations``) and export it on the environment variable ``LOCATION``.

#. As the recommended workflow, use a `direnv <https://direnv.net/>`_) plugin for your shell, which locates the environment variables in a :file:`.envrc` file in the project folder and automatically exports them.

#. Create a new file :file:`.envrc` in the project folder and add the following environment variables:

   .. code-block:: bash

      export LOCATION=northeurope

#. Create the resource group for the solution:

   .. code-block:: bash

      az group create --subscription $SUBSCRIPTION_ID -l $LOCATION -n ${APP_NAME:-nrf-asset-tracker}

   Currently, it is not possible to create Active Directory B2C and application through the ARM template (see `GitHub issue <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js/issues/1>`_).
   You must follow the instructions in the `tutorial for registering a web application in Azure Active Directory B2C <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications?tabs=applications>`_ and create a B2C tenant and an application.
   Use ``http://localhost:3000/`` (for local development) and ``https://${APP_NAME:-nrf-asset-tracker}app.z16.web.core.windows.net/`` as the redirect URLs.

#. Save the ``directory (tenant) id`` of the created Active Directory B2C and the ``application (client) id`` to the environment variable ``APP_REG_CLIENT_ID`` in the :file:`.envrc` file:

   .. code-block:: bash

      export APP_REG_CLIENT_ID=...

#. Create the user flow for sign up, sign in, and make sure to name the userflow as ``B2C_1_signup_signin``.

#. Run the following command to allow the changed file:

   .. code-block:: bash

      direnv allow

#. Deploy the solution by running the following commands:

   .. code-block:: bash

       az deployment group create --resource-group ${APP_NAME:-nrf-asset-tracker} \
           --mode Complete --name ${APP_NAME:-nrf-asset-tracker} \
           --template-file azuredeploy.json \
           --parameters \
               appName=${APP_NAME:-nrf-asset-tracker} \
               location=$LOCATION appRegistrationClientId=$APP_REG_CLIENT_ID \
               b2cTenant=$B2C_TENANT
       # Currently it is not possible to enable website hosting through the ARM template
       az storage blob service-properties update \
           --account-name ${APP_NAME:-nrf-asset-tracker}app
           --static-website --index-document index.html
       az storage blob service-properties update \
           --account-name ${APP_NAME:-nrf-asset-tracker}deviceui \
           --static-website --index-document index.html
       # Deploy the functions
       func azure functionapp publish ${APP_NAME:-nrf-asset-tracker}API --typescript
