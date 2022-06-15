.. _firmware-azure-building-docker:

Building the project using Docker
#################################

.. contents::
   :local:
   :depth: 2

Building using Docker is the simplest way to build the project on your local system.
If you install `Docker <https://www.docker.com/>`_, it will contain all the dependencies in the image, and prevents the need to install them separately in your system.

.. note::

    See `Building nRF Connect SDK applications with Docker <https://devzone.nordicsemi.com/nordic/nrf-connect-sdk-guides/b/getting-started/posts/build-ncs-application-firmware-images-using-docker>`_ for more information.

The Docker image is also used to automate the building of HEX files :ref:`using GitHub Actions <firmware-azure-building-github-actions>`, which is used to :ref:`continuously deliver the firmware builds <guides-automate-hexfile-building>` in the `out-of-tree example repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-azure>`_.

To clone the firmware repository, run the following command:

.. parsed-literal::

    # ~/nrf-asset-tracker
    
    git clone --branch |version| --single-branch \\
      https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-azure firmware

If you have not configured the firmware yet, follow the :ref:`instructions for configuring the firmware <azure-firmware-configuration>`.

Then, move the :file:`~/nrf-asset-tracker/firmware.conf` file into the :file:`~/nrf-asset-tracker/firmware` folder.

.. code-block:: bash

    # ~/nrf-asset-tracker

    mv ~/nrf-asset-tracker/firmware.conf ~/nrf-asset-tracker/firmware/

Build the project
*****************

Build the project for your nRF9160-based device using the specified commands.

Thingy:91 (PCA20035)
====================

.. code-block:: bash

    docker run --rm -v ${PWD}:/workdir/project nordicplayground/nrfconnect-sdk:main /bin/bash -c 'cd firmware && west init -l && west update --narrow -o=--depth=1 && west build -p always -b thingy91_nrf9160_ns -- -DOVERLAY_CONFIG="overlay-azure.conf;overlay-debug.conf;asset-tracker-cloud-firmware-azure.conf;firmware.conf"'
    ls -la build/zephyr/merged.hex

nRF9160 DK (PCA10090)
=====================

.. code-block:: bash

    docker run --rm -v ${PWD}:/workdir/project nordicplayground/nrfconnect-sdk:main /bin/bash -c 'cd firmware && west init -l && west update --narrow -o=--depth=1 && west build -p always -b nrf9160dk_nrf9160_ns -- -DOVERLAY_CONFIG="overlay-azure.conf;overlay-debug.conf;asset-tracker-cloud-firmware-azure.conf;firmware.conf"'
    ls -la build/zephyr/merged.hex

Location of the HEX file
************************

The built HEX file will be located in :file:`build/zephyr/merged.hex`.

Device credentials
******************

For the device to be able to connect to the nRF Asset Tracker for Azure, you must :ref:`create device credentials <azure-device-credentials>`.
