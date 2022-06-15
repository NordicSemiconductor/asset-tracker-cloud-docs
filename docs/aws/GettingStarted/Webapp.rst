.. _aws-getting-started-app:

Deploy the nRF Asset Tracker web application
############################################

.. contents::
   :local:
   :depth: 2

To deploy the :ref:`index-web-app` to AWS, complete the following steps:

1. Clone the project and install the dependencies
#. Configure the web application
#. Deploy the web application
#. Register a new user

Before starting, navigate to the working directory :file:`~/nrf-asset-tracker`.

Clone the project and install the dependencies
**********************************************

Clone the `nRF Asset Tracker web application <https://github.com/NordicSemiconductor/asset-tracker-cloud-app-aws-js>`_ project and install the dependencies:

.. parsed-literal::

    git clone --branch |version| --single-branch \\
      https://github.com/NordicSemiconductor/asset-tracker-cloud-app-aws-js.git web-app
    cd web-app
    npm ci

Configure the web application
*****************************

You need to configure the web application to be able to run it with your account.

1. The web application requires the IDs of the AWS resources that were created during the setup of the stack.
   Run the following command in the :file:`web-app` directory to copy the output containing the IDs to the :file:`.envrc` file:

   .. code-block:: bash

      cd ../aws
      node cli web-app-config > ../web-app/.envrc
      cd ../web-app

#. Run the following command to provide the version to the application:

   .. code-block:: bash

       echo "export PUBLIC_VERSION=\"`git describe --tags $(git rev-list --tags --max-count=1)`\"" >> .envrc

#. Run the following command to allow the changed file:

   .. code-block:: bash

     direnv allow

Example for the .envrc file
---------------------------

Following is an example for the contents of the :file:`.envrc` file:

.. code-block:: bash

    export PUBLIC_REGION="eu-west-1"
    export PUBLIC_HISTORICALDATA_TABLE_INFO="historicalDatadb40B23029-Qzk2Jrr88tOy|historicalDatatableD9D795E1-zdSByjtTqoAE"
    export PUBLIC_USER_IOT_POLICY_NAME="nrf-asset-tracker-userIotPolicy-OMYBF5CI5Q6A"
    export PUBLIC_FOTA_BUCKET_NAME="nrf-asset-tracker-dfustoragebucket2cc839ff-qz8k9bslldrf"
    export PUBLIC_USER_POOL_CLIENT_ID="1rh4eacmu5c5ppq2pspnq8tcu5"
    export PUBLIC_MQTT_ENDPOINT="a3g4yd69u8cu7b-ats.iot.eu-west-1.amazonaws.com"
    export PUBLIC_USER_POOL_ID="eu-west-1_FiY6h4xjd"
    export PUBLIC_IDENTITY_POOL_ID="eu-west-1:52cc8188-ec90-47d7-b3ee-634187fa6413"
    export PUBLIC_WEB_APP_DOMAIN_NAME="d250wnpv81c7q9.cloudfront.net"
    export PUBLIC_WEB_APP_BUCKET_NAME="nrf-asset-tracker-webapps-webapphostingbucketc58d3c2b-1or3is1vmmq5q"
    export PUBLIC_NCELLMEAS_STORAGE_TABLE_NAME="nrf-asset-tracker-ncellmeasStoragereportsTableDC3850EC-1VSHYGIIXDGMO"
    export PUBLIC_NEIGHBOR_CELL_GEOLOCATION_API_URL="https://xxxx1lmtp4.execute-api.eu-west-1.amazonaws.com/2021-07-07/"
    export PUBLIC_CELL_GEO_LOCATION_CACHE_TABLE_NAME="nrf-asset-tracker-cellGeolocationcellGeolocationCacheF25F601F-1TX7W4QXVRZ62"
    export PUBLIC_CLOUDFRONT_DISTRIBUTION_ID="E29F62Z4XXXXXX"
    export PUBLIC_VERSION="v3.6.1"

Deploy the web application
**************************

To build and deploy the web application to the S3 bucket created while setting up the nRF Asset Tracker in your AWS account, run the following commands:

.. code-block:: bash

   npm run build
   aws s3 cp build s3://$PUBLIC_WEB_APP_BUCKET_NAME \
      --recursive --metadata-directive REPLACE \
      --cache-control 'public,max-age=600' --expires ''
   aws cloudfront create-invalidation --distribution-id \
      $PUBLIC_CLOUDFRONT_DISTRIBUTION_ID --paths /,/index.html
   echo ""
   echo "Done. Open https://$PUBLIC_WEB_APP_DOMAIN_NAME to view the web app."

After running the commands, you can open the domain name printed in ``PUBLIC_WEB_APP_DOMAIN_NAME`` in your browser to view the web application.

Register a new user
*******************

.. note::

   The user pool is configured to use the email address as the username.

Since there are no predefined user accounts in the user pool, you need to register a new user.
Open the application in the browser.

.. figure:: ../../app/aws/images/create-account.png
   :alt: Login form of the web application

In the login form, Click :guilabel:`Create Account` and fill in your email and a password.
You will receive an email with a confirmation code that you need to enter to confirm your email address.
Once you have confirmed your email address, you can login with your email address and your password.

View your device
****************

After logging in, your device that was provisioned previously shows up in the list of assets.
