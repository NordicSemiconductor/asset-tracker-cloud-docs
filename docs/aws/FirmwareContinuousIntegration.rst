.. _aws-firmware-ci:

Continuous integration of firmware
##################################

.. contents::
   :local:
   :depth: 2

The AWS implementation of the nRF Asset Tracker provides the resources for continuous testing of the firmware using real hardware.

Overview
********

Every commit to the `firmware repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-aws>`_ will trigger a CI run.
The CI run results in the following actions:

1. Creating a new device and credentials on AWS IoT.
#. Building a firmware that has the device ID hardcoded for the MQTT client ID.
#. Scheduling a run on a self-hosted GitHub Actions runner. See :ref:`aws-firmware_ci_runner_setup`.
#. Observing the firmware CI run until completion.
#. Running assertions against the log result.

The Firmware CI runner is running on a PC connected to GitHub Actions, where it receives the jobs to execute.
The Firmware CI runner performs the following actions:

1. Programming the firmware and the optional credentials using the connected debugger to the connected nRF9160 DK or Thingy:91.
#. Logging all output until one of the following conditions occur:

   * A timeout is reached
   * A stop condition is reached. (Wait for a log output to match a string.)

.. note::

   These devices connect to the existing instance of the nRF Asset Tracker, so the firmware tests will not set up a new empty nRF Asset Tracker AWS environment for every test.
   The test runs against the production environment.
   This is to ensure that the firmware release will work with the existing solution.
   This approach is designed for `trunk-based development <https://thinkinglabs.io/talks/feature-branching-considered-evil.html>`_.

Preparation
***********

Enable the Firmware CI resources of the nRF Asset Tracker that allow GitHub Actions to create test devices.
Also enable the Firmware CI runner to connect before deploying the stack (see :ref:`Getting Started <aws-getting-started>`).

.. code-block:: bash

   ./cli.sh configure context stack firmware-ci 1
   npx cdk deploy --all

Print the AWS Key for the CI runner on GitHub Actions using the following command:

.. parsed-literal::
   :class: highlight

   ./cli.sh firmware-ci -s
    
   Region: "*Region*"
   Bucket name: "*Bucket name*"
   Access Key ID: "*AWS Access Key ID*"
   Secret Access Key: "*AWS Secret Access Key*"

Configure the following parameters as secrets on the firmware GitHub repository:

* ``AWS_ACCESS_KEY_ID`` (as printed above)
* ``AWS_SECRET_ACCESS_KEY`` (as printed above)
* ``AWS_REGION`` (as printed above)
* ``STACK_NAME`` (the stack name of your production environment, usually ``nrf-asset-tracker``)

.. _aws-firmware_ci_runner_setup:

Firmware CI runner setup
************************

To set up the Firmware CI runner, complete the following steps:

1. Prepare an environment that fulfills the :ref:`necessary system requirements <system-requirements>`.
#. Download `JLink <https://www.segger.com/downloads/jlink/>`_ for your platform, and ensure that :file:`JLinkExe` is in your path.
#. Follow `the instruction about self-hosted runners <https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners>`_ to set up a runner for your firmware repository.
   Make sure to use ``firmware-ci`` when prompted for the labels.

The Firmware CI starts to process all the scheduled jobs one after another.
