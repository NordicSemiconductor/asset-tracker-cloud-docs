
Programming the firmware
########################

.. body_start

First, make sure you have `Segger JLink <https://www.segger.com/downloads/jlink/>`_ installed in your path.

.. note::

    Programming the firmware through CLI is currently not supported on WSL 2 because it lacks support for serial devices.
    For more information, see the `issue on WSL 2 <https://github.com/microsoft/WSL/issues/4322>`_.

To program the :ref:`configured and built firmware <firmware-configuration>` using the CLI, run the following command:

.. parsed-literal::
   :class: highlight

    ./cli.sh flash-firmware -f /path/to/firmware.hex
    # default board is the Thingy:91, use --dk to program a DK
    # pass --help to see the additional options

.. body_end
