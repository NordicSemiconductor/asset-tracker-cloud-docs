.. _azure-firmware-ci:

Continuous integration of firmware
##################################

.. contents::
   :local:
   :depth: 2

The Azure implementation of the nRF Asset Tracker provides the resources for continuous testing of the firmware using real hardware.

Overview
********

Every commit to the `firmware repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-azure>`_ will trigger a CI run.
The CI run results in the following actions:

1. Creating a new device and credentials on AWS IoT.
#. Building a firmware that has the device ID hardcoded for the MQTT client ID.
#. Scheduling a run on a self-hosted GitHub Actions runner. See :ref:`azure-firmware_ci_runner_setup`.
#. Observing the firmware CI run until completion.
#. Running assertions against the log result.

The Firmware CI runner is running on a PC connected to GitHub Actions, where it receives the jobs to execute.
The Firmware CI runner performs the following actions:

1. Programming the firmware and the optional credentials using the connected debugger to the connected nRF9160 DK or Thingy:91.
#. Logging all output until one of the following conditions occur:

   * A timeout is reached
   * A stop condition is reached. (Wait for a log output to match a string.)

.. note::

   These devices connect to the existing instance of the nRF Asset Tracker, so the firmware tests will not set up a new empty nRF Asset Tracker Azure environment for every test.
   The test runs against the production environment.
   This is to ensure that the firmware release will work with the existing solution.
   This approach is designed for `trunk-based development <https://thinkinglabs.io/talks/feature-branching-considered-evil.html>`_.

Preparation
***********

Make sure you have successfully deployed the solution (see :ref:`Getting Started <azure-getting-started-deploy>`).

Generate credentials that allow GitHub Actions to create test devices:

.. code-block:: bash

   az ad sp create-for-rbac --name 'https://nrfassettracker.invalid/firmware-ci' \                         
      --role contributor \
      --scopes \
         "/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP:-nrfassettracker}" \
      --sdk-auth \
      > ci-credentials.json

Assign access permissions to the IoT hub for the role: 

.. code-block:: bash

   az role assignment create \
      --assignee $(az ad sp list --display-name "https://nrfassettracker.invalid/firmware-ci" | jq -r '.[0].objectId') \
      --role $(az role definition list --output json | jq -r '.[] | select(.roleName=="IoT Hub Data Contributor") | .id') \
      --scope "/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.Devices/IotHubs/${APP_NAME}IotHub"

.. _azure-firmware_ci_runner_setup:

Firmware CI runner setup
************************

To set up the Firmware CI runner, complete the following steps:

1. Prepare an environment that fulfills the :ref:`necessary system requirements <system-requirements>`.
#. Download `JLink <https://www.segger.com/downloads/jlink/>`_ for your platform, and ensure that :file:`JLinkExe` is in your path.
#. Follow `the instruction about self-hosted runners <https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners>`_ to set up a runner for your firmware repository.
   Make sure to use ``firmware-ci`` when prompted for the labels.

The Firmware CI starts to process all the scheduled jobs one after another.
