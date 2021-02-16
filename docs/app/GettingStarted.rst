.. _cat-tracker-webapp-get-started:

Getting started
###############

To setup the Cat Tracker web application, complete the following steps:

1. Check and make sure that you have the necessary system requirements.
#. Clone the project and install the dependencies.

System requirements
*******************

You need a development environment with the `upcoming LTS release candidate of Node.js <https://nodejs.org/en/about/releases/>`_ (current release is version 14).

If you are using Windows, we recommend using the `Windows Subsystem for Linux <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_ with `Ubuntu 18.04 LTS <https://www.microsoft.com/nb-no/p/ubuntu-1804-lts/9n9tngvndl3q?rtc=1>`_.

Clone the project and install the dependencies
**********************************************

.. clone_web_app_start

Clone the latest version of the `Cat Tracker Web Application <https://github.com/NordicSemiconductor/app>`_ project and install the dependencies:

.. code-block:: bash

    git clone https://github.com/NordicSemiconductor/app.git asset-tracker-app
    cd asset-tracker-app
    npm ci

Create a new :file:`.envrc` file (:ref:`used with direnv <about-direnv>`) in the project folder and add these environment variables (this is needed so *Create React App* picks up the `custom eslint configuration <https://create-react-app.dev/docs/setting-up-your-editor/#experimental-extending-the-eslint-config>`_):

.. code-block:: bash

    # add to .envrc
    export EXTEND_ESLINT=true

Run the following command to allow the changed ``.envrc`` file:

.. code-block:: bash

    direnv allow

.. clone_web_app_end