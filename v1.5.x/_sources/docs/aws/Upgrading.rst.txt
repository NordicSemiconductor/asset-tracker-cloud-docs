.. _upgrading:

Upgrading an existing installation
##################################

If you already have an installation and you want to upgrade to the latest release, perform the following steps:

.. code-block:: bash

    git pull
    npm ci
    npx tsc
    npx cdk deploy '*' 

Upgrading an existing *Cat Tracker web application* installation
****************************************************************

If you already have an installation and you want to upgrade to the latest release, run the following commands:

.. code-block:: bash

    git pull
    npm ci

Publishing the upgrade to AWS
-----------------------------

If you want to publish the upgrade to AWS, perform the steps for the initial installation as described in :ref:`aws-getting-started-app`.
