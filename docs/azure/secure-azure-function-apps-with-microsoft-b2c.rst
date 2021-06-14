.. _azure-adb2c:

Using Azure Active Directory B2C
################################

To secure access to your Azure Function Apps and to allow access only to authenticated users, you can use Azure Active Directory B2C.
It allows users to create their own accounts or sign in with credentials provided by a social identity provider.
Users can access the Function Apps only after a successful authentication.

To configure Azure AD B2C as the identity provider for your Function Apps, complete the following steps:

1. Log in to the `Azure portal <https://portal.azure.com/#home>`_.
#. Click :guilabel:`Create a resource` to create your Azure Function App.

   a. Search for ``function app``.
   #. Under ``Function App``, click :guilabel:`Create`.

      .. figure:: ./secure-azure-function-apps-with-microsoft-b2c/functionapp.png
         :alt: Function App

         Function App

#. Enter a unique name for your Function App, and fill the remaining information.
   You must fill the information in the :guilabel:`Basics` tab, and can then either fill in the information in the other tabs or go straight to the :guilabel:`Review + Create` tab.
   Check that all information is correct and click :guilabel:`Create`.

   Wait for the Function App to be deployed, then click :guilabel:`Go to resource` to view it.

#. Note the URL shown for your newly deployed app.
#. Create a new B2C application.

   a. In the Azure portal, click :guilabel:`More services`.
   #. Click :guilabel:`Identity` in the sidebar, then select :guilabel:`Azure AD B2C`.
      The :guilabel:`New Application` blade opens.

      .. figure:: ./secure-azure-function-apps-with-microsoft-b2c/azureadb2c.png
         :alt: App Service Authentication

         App Service Authentication

   #. Configure the following fields:

      * Provide the app name.
      * Click :guilabel:`Yes` for the :guilabel:`Web App/ Web API` option.
      * In the :guilabel:`Reply URL` field, enter the unique Azure Function App URL that you noted in Step 4 and append  ``/.auth/login/aad/callback`` to it.
        For example:

        .. parsed-literal::
           :class: highlight

           https://\ *functionapp*\ .azurewebsites.net/.auth/login/aad/callback.

   #. Click :guilabel:`Create`.

#. Determine the *B2C Application ID*\ :

   a. In the Azure portal, select the :guilabel:`Azure AD B2C` blade.
   #. Click on :guilabel:`Applications` and then click on the entry for your newly created application to open the application profile.
   #. Obtain the *Application ID* from the :guilabel:`Properties` blade of the application.

   This ID is used to complete the Azure Function configuration.

#. Determine the *B2C OpenID Connect Metadata URL* endpoint:

   a. In the Azure portal, select the :guilabel:`Azure AD B2C` blade.
   #. Under :guilabel:`Policies`, select :guilabel:`User flows`.
   #. Select the :guilabel:`Sign up and sign in` policy (or any other policy that you have created) and click :guilabel:`Run user flow`.

      The :guilabel:`Run user flow` blade opens.
   #. Copy the OpenID Metadata URL endpoint that is displayed in the top right corner.

#. Select :guilabel:`Authentication (classic)` in the sidebar.
#. Toggle :guilabel:`App Service Authentication` to ``On``.
   Several authentication provider configurations are now displayed.

   The default action when a request is not authenticated is ``Allow Anonymous request``.
   This allows any user to access your Function App.

   .. figure:: ./secure-azure-function-apps-with-microsoft-b2c/appserviceauthentication.png
      :alt: App Service Authentication

      App Service Authentication

#. Select :guilabel:`Log in with Azure Active Directory` in the :guilabel:`Action to take when request is not authenticated` dropdown.
#. Select :guilabel:`Azure Active Directory` under the :guilabel:`Authentication Providers` list.

   This opens :guilabel:`Azure Active Directory Settings`.

#. Set the :guilabel:`Management mode` as :guilabel:`Advanced`, then fill in :guilabel:`Client ID` and :guilabel:`Issuer Url`.

   a. Enter the B2C Application ID from Step 6 into the :guilabel:`Client ID` field.
   #. Enter the B2C Open ID Connect metadata URL from Step 7 into the :guilabel:`Issuer Url` field.

      .. figure:: ./secure-azure-function-apps-with-microsoft-b2c/activedirectorysettings.png
         :alt: Active Directory Settings

         Active Directory Settings

   #. If you wish to fill in :guilabel:`Client Secret`, click :guilabel:`Show secret` to display the appropriate field.
      You can fill in :guilabel:`Allowed Token Audiences` if you wish as well.

   #. Click :guilabel:`OK`.

The configuration for B2C application and the Azure Function is now complete.

To validate the configurations, you must perform tests.

Confirm that users without authentication gets prompted to complete their B2C sign-in before being allowed access to your Function App:

1. In the :guilabel:`Azure AD B2C` blade, navigate to :guilabel:`User flows` under :guilabel:`Policies` and click the :guilabel:`Run user flow` button for each B2C User flow policy.

   The :guilabel:`Run user flow` blade opens for the selected user flow.

#. Select the entry that corresponds to your Azure Function App in the :guilabel:`Application` field.
#. Select the associated :guilabel:`Reply Url`.
   In some cases you might have more than one reply URL.
#. Click the :guilabel:`Run user flow` button.

Also complete the following tests:

* Clear the browser session cookies and confirm that the user needs to authenticate during an attempt to access your Azure Function.
  After a successful access to the Function App, open a separate browser tab and validate that you can automatically sign in.
* Run other user flows, such as password reset or profile edit, with your Azure Function.
  After the users complete these flows, they are redirected to the Azure Function App.
