.. _upgrading:

Upgrading an existing installation
##################################

.. contents::
   :local:
   :depth: 2

Before starting an upgrade, read the release notes:

* `Release notes for the nRF Asset Tracker for AWS <https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js/releases>`_
* `Release notes for the nRF Asset Tracker web application for AWS <https://github.com/NordicSemiconductor/asset-tracker-cloud-app-aws-js/releases>`_

Pay close attention to Breaking changes.

Upgrading nRF Asset Tracker for AWS
***********************************

If you already have an installation and you want to upgrade to the latest release, pull in the changes and perform the update:

   .. code-block:: bash

       git pull
       npm ci
       npx cdk deploy --all 

Upgrading an existing nRF Asset Tracker web application installation
********************************************************************

If you already have an installation and you want to upgrade to the latest release, pull in the changes and perform the update:

   .. code-block:: bash

       git pull
       npm ci

To publish the upgrade to AWS, perform the steps for the initial installation as described in :ref:`Deploying the nRF Asset Tracker web application <aws-getting-started-app>`.
