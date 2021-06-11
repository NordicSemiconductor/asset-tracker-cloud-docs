.. _azure-adb2c:

Using Azure Active Directory B2C
################################

To secure access to your Azure Function apps and to allow access only to authenticated users, you can use Azure Active Directory B2C.
It allows users to create their own accounts or sign in with credentials provided by a social identity provider.
Users can access the Function apps only after a successful authentication.

To configure Azure AD B2C as the identity provider for your Function apps, complete the following steps:

#. Log in to the `Azure portal <https://portal.azure.com/#home>`_.
#. Click :guilabel:`Create a resource` to create your Azure Function app.

   a. Search for ``function app``.
   #. Under ``Function App``, click :guilabel:`Create`.

#. Enter a unique name for your Function app, and fill the remaining information.
   You must fill the information in the :guilabel:`Basics` tab, and can then either fill in the information in the other tabs or go straight to the :guilabel:`Review + Create` tab.
   Check that all information is correct and click :guilabel:`Create`.

   Note the name as you will need it in the subsequent steps.

   Wait for the Function app to be deployed, then click :guilabel:`Go to resource` to view it.

#. Select :guilabel:`Authentication (classic)` in the sidebar.
#. Toggle :guilabel:`App Service Authentication` to ``On``.
   Several authentication provider configurations are now displayed.

   The default action when a request is not authenticated is ``Allow Anonymous request``.
   This allows any user to access your Function app.

#. Select ``Log in with Azure Active Directory`` in the :guilabel:`Action to take when request is not authenticated` dropdown.
#. Select :guilabel:`Azure Active Directory` under the :guilabel:`Authentication Providers` list.

   This opens :guilabel:`Azure Active Directory Settings`.

#. Set the :guilabel:`Management mode` as ``Advanced``, then fill in :guilabel:`Client ID` and :guilabel:`Issuer Url`.

   Click :guilabel:`Show secret` if you want to fill in :guilabel:`Client Secret`.
   You can fill in :guilabel:`Allowed Token Audiences` if you wish.

   Click :guilabel:`OK`.

#. Create a new B2C application:

   a. In the Azure portal, click :guilabel:`More services`.
   #. Click :guilabel:`Identity` in the sidebar, then select :guilabel:`Azure AD B2C`.

      The :guilabel:`New Application` blade opens.
   #. Configure the following fields:

	  * Provide the app name.
	  * Click :guilabel:`Yes` for the :guilabel:`Web App/ Web API` option.
	  * In the :guilabel:`Reply URL` field, enter the unique Azure Function app name that you created in step 4 and append  ``/.auth/login/aad/callback`` to it. For example, ``https://myAppSecuredByB2C.azurewebites.net/.auth/login/aad/callback``.
   #. Click :guilabel:`Create`.

#. Determine the B2C Application ID:

   a. In the Azure portal, select the :guilabel:`Azure AD B2C` blade.
   #. Click on :guilabel:`Applications` and then click on the entry for your newly created application (``B2CFunctionApp`` in this example) to open the application profile.
   #. Obtain the Application ID from the :guilabel:`Properties` blade of the application.

   Use this ID to complete the Azure Function configuration.

#. Determine the B2C OpenID Connect Metadata URL endpoint:

   a. In the Azure portal, select the :guilabel:`Azure AD B2C` blade.
   #. Under :guilabel:`Policies`, select :guilabel:`User flows`.
   #. Select the :guilabel:`Sign up and sign in` policy (or any other policy that you have created) and click :guilabel:`Run user flow`.

      The :guilabel:`Run user flow` blade opens.
   #. Copy the OpenID Metadata URL endpoint that is displayed in the top right corner.

#. Navigate to :guilabel:`All resources` in the Azure portal home page.

   a. Click the Function app that you created.
   #. Select :guilabel:`Platform Settings` > :guilabel:`Authentication/Authorization` > :guilabel:`Azure Active Directory Settings`.

#. Enter the B2C Application ID into the :guilabel:`Client ID` field.
#. Enter the B2C Open ID Connect metadata URL into the :guilabel:`Issuer URI` field and click ``OK`` to finish the configuration.

The configuration for B2C application and the Azure Function is now complete.

To validate the configurations, perform the following tests:

1. Confirm that users without authentication gets prompted to complete their B2C sign-in before being allowed access to your Function app:

   a. In the :guilabel:`Azure AD B2C` blade, navigate to :guilabel:`User flows` under :guilabel:`Policies` and click the :guilabel:`Run user flow` button for each B2C User flow policy.

      The :guilabel:`Run user flow` blade opens for the selected user flow.

   #. Select the entry that corresponds to your Azure Function app in the :guilabel:`Application` field.
   #. Select the associated :guilabel:`Reply URL`.
      In some cases you might have more than one reply URL.
   #. Click the :guilabel:`Run user flow` button.

#. Complete the following tests:

   a. Clear the browser session cookies and confirm that the user needs to authenticate during an attempt to access your Azure Function.
   #. After a successful access to the Function app, open a separate browser tab and validate that you can automatically sign in.
   #. Run other user flows, such as password reset or profile edit, with your Azure Function.
   #. After the users complete these flows, they are redirected to the Azure Function app.
