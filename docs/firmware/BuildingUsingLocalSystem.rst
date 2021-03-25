.. _firmware-building:

Building the project using your local system
############################################

.. contents::
   :local:
   :depth: 2

Before building the project using your local system, complete the following steps:

1. Prepare your system
#. Clone the project and install the dependencies

Prepare your system
*******************

Follow the `Getting Started Guide <http://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/getting_started.html>`_ of the nRF Connect SDK to set up your system for building the project.
Follow the instructions on `Installing the nRF Connect SDK <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/gs_assistant.html>`_.

Clone the project and install the dependencies
**********************************************

Create a folder, for example, ``ncs`` and initialize the project by running the following commands:

.. code-block:: bash

    cd ./ncs
    sudo pip3 install -U --pre west
    west init -m https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware --mr saga
    west update
    sudo pip3 install -r zephyr/scripts/requirements.txt
    sudo pip3 install pc_ble_driver_py
    sudo pip3 install -r nrf/scripts/requirements.txt
    sudo pip3 install -r mcuboot/scripts/requirements.txt
    # this sets $ZEPHYR_TOOLCHAIN_VARIANT and $GNUARMEMB_TOOLCHAIN_PATH
    source zephyr/zephyr-env.sh

Build the project
*****************

Navigate to the :file:`./ncs/firmware` directory and build the project for your nRF9160-based device.

Thingy:91 (``PCA20035``)
========================

.. code-block:: bash

    west build -p always -b thingy91_nrf9160ns

nRF9160 DK (``PCA10090``)
=========================

.. code-block:: bash

    west build -p always -b nrf9160_pca10090ns

Location of the HEX file
************************

The built HEX file will be located in :file:`ncs/firmware/build/zephyr/merged.hex`.
