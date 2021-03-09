.. _upgrading:

Upgrading an existing installation
##################################

If you already have an installation and you want to upgrade to the latest release, perform the following steps:

1. See the `release notes for the nRF Asset Tracker for AWS <https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js/releases>`_ and pay close attention to *Breaking Changes*.

#. Pull in the changes and perform the update:

   .. code-block:: bash

       git pull
       npm ci
       npx tsc
       npx cdk deploy '*' 

Upgrading an existing *Cat Tracker web application* installation
****************************************************************

If you already have an installation and you want to upgrade to the latest release, perform the following steps:

1. Review the `release notes for the Cat Tracker web application <https://github.com/NordicSemiconductor/asset-tracker-cloud-app-js/releases>`_ and pay close attention to **Breaking Changes**.

#. Pull in the changes and perform the update:

.. code-block:: bash

    git pull
    npm ci

Publishing the upgraded *Cat Tracker web application* to AWS
------------------------------------------------------------

If you want to publish the upgrade to AWS, perform the steps for the initial installation as described in :ref:`aws-getting-started-app`.
