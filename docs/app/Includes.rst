.. clone_web_app_start

Clone the project and install the dependencies
**********************************************

Clone the latest version of the `Cat Tracker web application <https://github.com/NordicSemiconductor/asset-tracker-cloud-app-js>`_ project and install the dependencies:

.. parsed-literal::

    git clone --branch |version| --single-branch \\
      https://github.com/NordicSemiconductor/asset-tracker-cloud-app-js.git cat-tracker-web-app
    cd cat-tracker-web-app
    npm ci

.. clone_web_app_end

.. configure_web_app_start

You need to configure the web application to be able to run it with your account.
Create a file called :file:`.env.local`, which `Create React App <https://create-react-app.dev/docs/adding-custom-environment-variables/>`_ uses to make the settings in the file available as environment variables during build time.

.. configure_web_app_end

.. provide_versionstring_start

Version string
--------------

Run the following command to provide the version to the application:

.. code-block:: bash

    echo REACT_APP_VERSION=`git describe --tags $(git rev-list --tags --max-count=1)` >> .env.local

.. provide_versionstring_end

