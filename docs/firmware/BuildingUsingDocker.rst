.. _firmware-building-docker:

Building using Docker
#####################

.. note::

    Read more about this aproach `here <https://devzone.nordicsemi.com/nordic/nrf-connect-sdk-guides/b/getting-started/posts/build-ncs-application-firmware-images-using-docker>`_.

This is the simplest way to build the project on your local system.
Install `Docker <https://www.docker.com/>`_ and use it to contain all dependencies in the image, without needing to install them in your system.

The docker image is not intended to be shared, but to simplify building locally.
It is used to cache all dependencies so you can build and develop locally without needing to install dependencies directly in your system.

The Docker image is also use to automate building of HEX files :ref:`using GitHub Actions <firmware-building-github-actions>` which is used to :ref:`continuously deliver firmware builds <guides-automate-hexfile-building>` in the `out-of-tree example repository <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware>`_.

.. code-block:: bash

    git clone https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware nrf-asset-tracker-firmware
    cd nrf-asset-tracker-firmware
    docker build -t asset-tracker-firmware-docker .

Now edit the value of ``CONFIG_AWS_IOT_BROKER_HOST_NAME`` in :file:`prj.conf` and provide your broker hostname.

Building
********

Thingy:91 (``PCA20035``)
========================

.. code-block:: bash

    docker run --rm -v ${PWD}:/workdir/ncs/firmware asset-tracker-firmware-docker /bin/bash -c 'cd /workdir/ncs/firmware; west build -p always -b thingy91_nrf9160ns -- -DOVERLAY_CONFIG="overlay-debug.conf;asset-tracker-cloud-firmware.conf"'
    ls -la build/zephyr/merged.hex

nRF9160 DK (``PCA10090``)
=========================

.. code-block:: bash

    docker run --rm -v ${PWD}:/workdir/ncs/firmware asset-tracker-firmware-docker /bin/bash -c 'cd /workdir/ncs/firmware; west build -p always -b nrf9160dk_nrf9160ns -- -DOVERLAY_CONFIG="overlay-debug.conf;asset-tracker-cloud-firmware.conf"'
    ls -la build/zephyr/merged.hex

Location of the HEX file
************************

The built HEX file will be located in :file:`build/zephyr/merged.hex`.
