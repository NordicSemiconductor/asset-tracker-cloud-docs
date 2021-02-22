.. _aws-getting-started-app:

Deploy the *Cat Tracker web application*
########################################

To deploy the *Cat Tracker web application* to AWS, complete the following steps:

1. Clone the web application
#. Configure the web application
#. Deploy the web application
#. Register a new user

.. include:: ../../app/Includes.rst
   :start-after: clone_web_app_start
   :end-before: clone_web_app_end

.. include:: ../../app/Includes.rst
   :start-after: configure_web_app_start
   :end-before: configure_web_app_end

Run-time configuration
======================

The web application requires the IDs of the AWS resources that were created during the setup of the stack.
Run the following command in the :file:`cat-tracker-app` directory to copy the output that contain the IDs to the :file:`.env.local` file:

.. code-block:: bash

   cd ../cat-tracker-aws
   node cli react-config > ../cat-tracker-app/.env.local
   cd ../cat-tracker-app

Example for :file:`.env.local`
------------------------------

Following is an example for the contents of the :file:`.env.local` file:

.. code-block:: bash

    REACT_APP_REGION=eu-west-1
    REACT_APP_HISTORICALDATA_TABLE_INFO=historicalDatadb40B23029-Qzk2Jrr88tOy|historicalDatatableD9D795E1-zdSByjtTqoAE
    REACT_APP_USER_IOT_POLICY_ARN=arn:aws:iot:eu-west-1:249963682018:policy/cat-tracker-userIotPolicy-OMYBF5CI5Q6A
    REACT_APP_DFU_BUCKET_NAME=cat-tracker-dfustoragebucket2cc839ff-qz8k9bslldrf
    REACT_APP_JITP_ROLE_ARN=arn:aws:iam::249963682018:role/cat-tracker-iotJitpRole7B509A5D-5Y6BQY6KD9TX
    REACT_APP_THING_GROUP_NAME=assetTrackerThings
    REACT_APP_AVATAR_BUCKET_NAME=cat-tracker-avatarsbucket8221a59f-1usxf1qi1qj1r
    REACT_APP_USER_POOL_CLIENT_ID=1rh4eacmu5c5ppq2pspnq8tcu5
    REACT_APP_MQTT_ENDPOINT=a3g4yd69u8cu7b-ats.iot.eu-west-1.amazonaws.com
    REACT_APP_DEVELOPER_PROVIDER_NAME=developerAuthenticated
    REACT_APP_THING_POLICY_ARN=arn:aws:iot:eu-west-1:249963682018:policy/cat-tracker-thingPolicy-1GR1TP3RXOO0G
    REACT_APP_USER_POOL_ID=eu-west-1_FiY6h4xjd
    REACT_APP_IDENTITY_POOL_ID=eu-west-1:52cc8188-ec90-47d7-b3ee-634187fa6413
    REACT_APP_WEB_APP_DOMAIN_NAME=d250wnpv81c7q9.cloudfront.net
    REACT_APP_WEB_APP_BUCKET_NAME=cat-tracker-webapps-webapphostingbucketc58d3c2b-1or3is1vmmq5q
    REACT_APP_CLOUDFRONT_DISTRIBUTION_ID_WEB_APP=EGNO6F61DSJ5Y
    REACT_APP_VERSION=v3.6.1

.. include:: ../../app/Includes.rst
   :start-after: provide_versionstring_start
   :end-before: provide_versionstring_end

Deploy the web application
**************************

To build and deploy the web application to the S3 bucket created while setting up the *Asset Tracker Cloud Example* in your AWS account, run the following commands:

.. code-block:: bash

    export $(cat .env.local | xargs)
    export EXTEND_ESLINT=true
    export PUBLIC_URL="https://$REACT_APP_WEB_APP_DOMAIN_NAME"
    npm run build
    aws s3 cp build s3://$REACT_APP_WEB_APP_BUCKET_NAME \
      --recursive --metadata-directive REPLACE \
      --cache-control 'public,max-age=600' --expires ''
    aws cloudfront create-invalidation --distribution-id \
      $REACT_APP_CLOUDFRONT_DISTRIBUTION_ID_WEB_APP --paths /,/index.html
    echo "Done. Now open $PUBLIC_URL to view the web app."

After running the commands, you can open the domain name printed in ``REACT_APP_WEB_APP_DOMAIN_NAME`` in your browser to view the web application.

Register a new user
*******************

.. note::

   The user pool is configured to use the email address as the username.

Since there are no predefined user accounts in the user pool, you need to register a new user.
Open the application in the browser and you will see the login form.

.. figure:: ../../app/images/create-account.png
   :alt: Login form of the web application

Click :guilabel:`Create Account` and fill in your email and a password.
You will receive an email with a confirmation code which needs to be entered in order to confirm your email address.
Once you have confirmed your email address you can log-in with your email address and your password.
