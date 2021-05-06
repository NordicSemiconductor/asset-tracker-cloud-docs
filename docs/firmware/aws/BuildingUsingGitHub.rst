.. _firmware-aws-building-github-actions:

Building the project using GitHub actions
#########################################

You can use GitHub Actions (which is free for open-source projects) to build the application.
Using the `provided workflow <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-aws/blob/saga/.github/workflows/build-and-release.yaml>`_, you can quickly set up the environment for building your application using a fork.

After you have forked the repository, `enable GitHub Actions <https://help.github.com/en/github/automating-your-workflow-with-github-actions/about-github-actions#requesting-to-join-the-limited-public-beta-for-github-actions>`_ and locate the :guilabel:`Actions` tab in your repository, which lists the Action runs.

Configuration for firmware connecting to the nRF Asset Tracker for AWS
======================================================================

Navigate to the settings of the repository and configure a new Secret ``BROKER_HOSTNAME`` and assign the host name of your AWS IoT Core MQTT broker to the secret.
You can retrieve the host name by using the following command:

.. code-block:: bash

    aws iot describe-endpoint --endpoint-type iot:Data-ATS

Commit a change to your repository and the GitHub Action will build the application and attach the HEX files to a release.
