.. _aws-firmware-ci:

Continuous integration of firmware
##################################

.. contents::
   :local:
   :depth: 2

The AWS implementation of the nRF Asset Tracker provides the resources for continuous testing of the firmware using real hardware.

Overview
********

Every commit to the `firmware repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware>`_ will trigger a CI run.
The CI run results in the following actions:

1. Creating a new device and credentials on AWS IoT.
#. Building a firmware that has the device ID hardcoded for the MQTT client ID.
#. Creating an AWS IoT job with the firmware and the credentials, which is selected by the `Firmware CI runner <https://github.com/NordicSemiconductor/cloud-aws-firmware-ci-runner-js>`_. See :ref:`firmware_ci_runner_setup`.
#. Observing the firmware CI run until completion.
#. Downloading the log result from Amazon S3 bucket.
#. Running assertions against the log result.

The Firmware CI runner is running on a Raspberry Pi connected to AWS IoT, where it receives the jobs to execute.
Following are the actions performed by the Firmware CI runner:

1. Programming the firmware and the optional credentials using the connected debugger to the connected nRF9160 DK or Thingy:91.
#. Collecting all the log output until one of the following conditions occur:

   a. A timeout is reached
   #. A stop condition is reached. (Wait for a log output to match a string.)
#. Uploading the logs to S3 bucket

.. note::

   These devices connect to the existing instance of the nRF Asset Tracker, so the firmware tests will not set up a new empty nRF Asset Tracker AWS environment for every test.
   It runs against the production environment.
   This is to ensure that the firmware release will work with the existing solution.
   This approach is designed for `trunk-based development <https://thinkinglabs.io/talks/feature-branching-considered-evil.html>`_.

Preparation
***********

Enable the Firmware CI resources of the nRF Asset Tracker that allow GitHub Actions to create test devices.
Also enable the Firmware CI runner to connect by enabling the context switch ``firmware-ci`` when deploying the stack (see :ref:`Getting Started <aws-getting-started>`).

.. code-block:: bash

   npx cdk -c firmware-ci=1 deploy '*'

Print the AWS Key for the CI runner on GitHub Actions using the following command:

.. code-block:: bash

   node cli firmware-ci -s
    
   Region: "<Region>"
   Bucket name: "<Bucket name>"
   Access Key ID: "<AWS Access Key ID>"
   Secret Access Key: "<AWS Secret Access Key>"

At this stage, you can create a new IoT Thing to be used for a Firmware CI runner, by running the following command:

.. code-block:: bash

   node cli firmware-ci -c

You can delete a device using the following command:

.. code-block:: bash

   node cli firmware-ci -r "<deviceId>"

Configure the following parameters as secrets on the firmware GitHub repository:

* ``AWS_ACCESS_KEY_ID`` (as printed above)
* ``AWS_SECRET_ACCESS_KEY`` (as printed above)
* ``AWS_REGION`` (as printed above)
* ``STACK_NAME`` (the stack name of your production environment, usually ``nrf-asset-tracker``)
* ``DEVICE_ID`` (the created Firmware CI runner device, for example, ``firmware-ci-3c431c57-e524-4010-b269-371cb53538b6``)

.. _firmware_ci_runner_setup:

Firmware CI runner setup
************************

To set up Firmware CI runner, complete the following steps:

1. Download `JLink <https://www.segger.com/downloads/jlink/>`_ for your platform.
#. Install `firmware-ci-runner-aws <https://github.com/NordicSemiconductor/cloud-aws-firmware-ci-runner-js.git>`_ by running the following commands:

   .. code-block:: bash

      git clone https://github.com/NordicSemiconductor/cloud-aws-firmware-ci-runner-js.git
      cd firmware-ci-runner-aws
      npm ci
      npx tsc

#. Provide the following environment variables. Use the path to the JLink folder (for example, :file:`~/JLink_Linux_V686_arm64/`) that is created during the installation in step 1:

   .. code-block:: bash

      export AWS_ACCESS_KEY_ID="<AWS Access Key ID printed above>"
      export AWS_SECRET_ACCESS_KEY="<AWS Secret Access Key printed above>"
      export REGION="<Region printed above>"
      export BUCKET_NAME="<Bucket name printed above>"
      export PATH="<Path to JLINK>":$PATH

   The recommended workflow is to use a `direnv <https://direnv.net/>`_ plugin for your shell, which locates the environment variables in a :file:`.envrc` file in the project folder and automatically exports them.
   Create a new file :file:`.envrc` in the project folder and add the credentials that are provided to you after you have created the new user.

#. Copy the JSON file containing the certificate.

#. Run the following command:

   .. code-block:: bash

      node cli run "<device>" "<path to certificate.json>"

   :file:`<device>` is the Linux file where the device is connected to, for example, ``/dev/ttyACM0``.

The Firmware CI starts to process all the scheduled jobs one after another.
