.. _firmware-azure-building:

Building the project using your local system
############################################

.. contents::
   :local:
   :depth: 2

Before building the project using your local system, complete the following steps:

1. Prepare your system
#. Clone the project and install the dependencies
#. Configure the project

Prepare your system
*******************

Follow the `Getting started documentation <http://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/getting_started.html>`_ of the nRF Connect SDK to set up your system for building the project.

Clone the project and install the dependencies
**********************************************

Create a folder, for example, ``ncs`` and initialize the project by running the following commands:

.. code-block:: bash

    cd ./ncs
    sudo pip3 install -U --pre west
    west init -m https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-azure \
        --mr saga firmware
    west update
    sudo pip3 install -r zephyr/scripts/requirements.txt
    sudo pip3 install pc_ble_driver_py
    sudo pip3 install -r nrf/scripts/requirements.txt
    sudo pip3 install -r mcuboot/scripts/requirements.txt
    # this sets $ZEPHYR_TOOLCHAIN_VARIANT and $GNUARMEMB_TOOLCHAIN_PATH
    source zephyr/zephyr-env.sh

Configure the project
*********************

Follow the :ref:`configuration instructions for the firmware <azure-firmware-configuration>` and add your settings to the :file:`firmware.conf` file.

Build the project
*****************

Navigate to the :file:`./ncs/firmware` directory and build the project for your nRF9160-based device.

Thingy:91 (PCA20035)
====================

.. code-block:: bash

    west build -p always -b thingy91_nrf9160_ns -- -DOVERLAY_CONFIG="overlay-azure.conf;overlay-debug.conf;asset-tracker-cloud-firmware-azure.conf;firmware.conf"

nRF9160 DK (PCA10090)
=====================

.. code-block:: bash

    west build -p always -b nrf9160dk_nrf9160_ns -- -DOVERLAY_CONFIG="overlay-aws.conf;overlay-debug.conf;asset-tracker-cloud-firmware-azure.conf;firmware.conf"

Location of the HEX file
************************

The built HEX file will be located in :file:`./ncs/firmware/build/zephyr/merged.hex`.
