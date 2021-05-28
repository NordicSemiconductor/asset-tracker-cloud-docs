.. _azure-adb2c:

Using Azure Active Directory B2C
################################

To secure access to your Azure function apps and to allow access only to authenticated users, you can use Azure Active Directory B2C.
It allows users to create their own accounts or sign in with credentials provided by a social identity provider.
Users can access the function apps only after a successful authentication.

To configure Azure AD B2C as the identity provider for your function apps, complete the following steps:

#. Log in to the `Azure portal <https://portal.azure.com/#home>`_.
#. Click :guilabel:`+Create a Resource` to create your Azure function app.

   a. Search for ``function app``.
   #. In the ``Function App`` blade, click :guilabel:`Create`. 

   .. image:: ./secure-azure-function-apps-with-microsoft-b2c/01.png
      :alt: 1


#. Enter a unique name for your function app, fill the remaining information and click :guilabel:`Create`.

   Note the name as you will need it in the subsequent steps.

   .. image:: ./secure-azure-function-apps-with-microsoft-b2c/02.png
       :alt: 2

   Once the function app is created, click :guilabel:`Go to resource` to view the created function app.

#. Select :guilabel:`Platform Features` tab.
#. Select :guilabel:`Authentication/Authorization`.

   .. image:: ./secure-azure-function-apps-with-microsoft-b2c/03.png
      :alt: 3

#. In the :guilabel:`Authentication/Authorization` blade, move the sliding button under :guilabel:`App Service Authentication` to ``On``. Several authentication provider configurations are now displayed.
    
   .. note:: 
	
	  The default action when a request is not authenticated is ``Allow Anonymous request``. This allows any user to access your function app.

   .. image:: ./secure-azure-function-apps-with-microsoft-b2c/04.png
      :alt: 4

#. Select ``Log in with Azure Active Directory`` in the :guilabel:`Action to take when request is not authenticated` field.

   .. image:: ./secure-azure-function-apps-with-microsoft-b2c/05.png
      :alt: 5

#. Select ``Azure Active Directory`` under the :guilabel:`Authentication Providers` list.

   A new configuration blade called :guilabel:`Azure Active Directory Settings` opens.
	
#. Select :guilabel:`Advanced` as the :guilabel:`Management mode`.

   a. Fill in :guilabel:`Client ID` and :guilabel:`Issuer Url`.
   #. Optionally, fill in :guilabel:`Client Secret` and :guilabel:`Allowed Token Audiences`. Click :guilabel:`OK`.

   .. image:: ./secure-azure-function-apps-with-microsoft-b2c/06.png
       :alt: 6



#. Create a new B2C application:

   a. In the Azure Portal (open a separate browser tab or new browser session if you want the previous blade to be available), select the :guilabel:`Azure AD B2C` blade.
   #. Select :guilabel:`Applications`, then select :guilabel:`+Add`.

      The :guilabel:`New Application` blade opens.
   #. Configure the following fields:
	
	  * Provide the app name.
	  * Select ``Yes`` for the :guilabel:`Web App/ Web API` option.
	  * In the :guilabel:`Reply URL` field, enter the unique Azure function app name that you created in step 4 and append  ``/.auth/login/aad/callback`` to it. For example, ``https://myAppSecuredByB2C.azurewebites.net/.auth/login/aad/callback``.
   #. Click :guilabel:`Create`.

   .. image:: ./secure-azure-function-apps-with-microsoft-b2c/07.png
      :alt: 7

#. Determine the B2C Application ID:

   a. In the Azure portal, select the :guilabel:`Azure AD B2C` blade.
   #. Click on :guilabel:`Applications` and then click on the entry for your newly created application (``B2CFunctionApp`` in this example) to open the application profile.
   #. Obtain the Application ID from the Properties blade of the application.

   Use this ID to complete the Azure function configuration.

   .. image:: ./secure-azure-function-apps-with-microsoft-b2c/08.png
      :alt: 8

#. Determine the B2C OpenID Connect Metadata URL endpoint:
    
   a. In the Azure portal, select the :guilabel:`Azure AD B2C` blade.
   #. Under :guilabel:`Policies`, select :guilabel:`User flows`.
   #. Select the :guilabel:`Sign up and sign in` policy (or any other policy that you have created) and click :guilabel:`Run user flow`.

      The :guilabel:`Run user flow` blade opens.
   #. Copy the OpenID Metadata URL endpoint that is displayed in the top right corner.

   .. image:: ./secure-azure-function-apps-with-microsoft-b2c/09.png
      :alt: 9

#. Navigate to :guilabel:`All resources` in the Azure portal home page.

   a. Click the function app that you created.
   #. Select :guilabel:`Platform Settings` > :guilabel:`Authentication/Authorization` > :guilabel:`Azure Active Directory Settings`.

#. Enter the B2C Application ID into the :guilabel:`Client ID` field.
#. Enter the B2C Open ID Connect metadata URL into the :guilabel:`Issuer URI` field and click ``OK`` to finish the configuration.

   .. image:: ./secure-azure-function-apps-with-microsoft-b2c/10.png
      :alt: 10

The configuration for B2C application and the Azure Function is now complete.

To validate the configurations, perform the following tests:

1. Confirm that users without authentication gets prompted to complete their B2C sign-in before being allowed access to your function app:

   a. In the :guilabel:`Azure AD B2C` blade, navigate to :guilabel:`User flows` under :guilabel:`Policies` and click the :guilabel:`Run user flow` button for each B2C User flow policy.
   
      The :guilabel:`Run user flow` blade opens for the selected user flow.

   #. Select the entry that corresponds to your Azure function app in the :guilabel:`Application` field.
   #. Select the associated :guilabel:`Reply URL` (in some cases you might have more than one reply URL).

      .. image:: ./secure-azure-function-apps-with-microsoft-b2c/11.png
         :alt: 11

   #. Click the :guilabel:`Run user flow` button.

#. Complete the following tests:

   a. Clear the browser session cookies and confirm that the user needs to authenticate during an attempt to access your Azure function.
   #. After a successful access to the function app, open a separate browser tab and validate that you can automatically sign in.
   #. Run other user flows, such as password reset or profile edit, with your Azure function.
   #. After the users complete these flows, they are redirected to the Azure function app.
