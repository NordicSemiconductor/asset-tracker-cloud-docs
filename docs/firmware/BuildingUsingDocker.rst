.. _firmware-building-docker:

Building the project using Docker
#################################

.. contents::
   :local:
   :depth: 2

Building using Docker is the simplest way to build the project on your local system.
If you install `Docker <https://www.docker.com/>`_ , it will contain all the dependencies in the image, and prevents the need to install them separately in your system.

The Docker image is not intended to be shared, but to simplify the local building of project.

The Docker image is also used to automate the building of HEX files :ref:`using GitHub Actions <firmware-building-github-actions>`, which is used to :ref:`continuously deliver the firmware builds <guides-automate-hexfile-building>` in the `out-of-tree example repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware>`_.

To build the project using Docker, run the following commands:

.. code-block:: bash

    git clone https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware nrf-asset-tracker-firmware
    cd nrf-asset-tracker-firmware
    docker build -t asset-tracker-firmware-docker .

Edit the value of ``CONFIG_AWS_IOT_BROKER_HOST_NAME`` in :file:`prj.conf` and provide your broker hostname.

.. note::

    See `Building nRF Connect SDK applications with Docker <https://devzone.nordicsemi.com/nordic/nrf-connect-sdk-guides/b/getting-started/posts/build-ncs-application-firmware-images-using-docker>`_ for more information.

Build the project
*****************

Build the project for your nRF9160-based device using the specified commands.


Thingy:91 (PCA20035)
====================

.. code-block:: bash

    docker run --rm -v ${PWD}:/workdir/ncs/firmware asset-tracker-firmware-docker /bin/bash -c 'cd /workdir/ncs/firmware; west build -p always -b thingy91_nrf9160ns -- -DOVERLAY_CONFIG="overlay-debug.conf;asset-tracker-cloud-firmware.conf"'
    ls -la build/zephyr/merged.hex

nRF9160 DK (PCA10090)
=====================

.. code-block:: bash

    docker run --rm -v ${PWD}:/workdir/ncs/firmware asset-tracker-firmware-docker /bin/bash -c 'cd /workdir/ncs/firmware; west build -p always -b nrf9160dk_nrf9160ns -- -DOVERLAY_CONFIG="overlay-debug.conf;asset-tracker-cloud-firmware.conf"'
    ls -la build/zephyr/merged.hex

Location of the HEX file
************************

The built HEX file will be located in :file:`build/zephyr/merged.hex`.
