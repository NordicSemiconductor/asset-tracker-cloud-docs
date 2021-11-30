.. _azure-install-cli:

Install the Azure CLI
#####################

To install the Azure CLI, follow the instructions in the `Azure CLI documentation <https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest>`_.
After installing the CLI, you can execute the ``az`` command:

.. code-block:: bash

   az --version
   # ...
   # azure-cli 2.24.0
   # ...

Create the az alias when using Docker
*************************************

The installation instructions expect that you run the ``az`` command from the current directory.
Therefore, you need to create an alias, when using the dockerized Azure CLI.

1. Copy the script to an executable file in your path, for example :file:`~/bin/az`:

   .. literalinclude:: ./scripts/az
      :language: bash

#. Make sure that you can call it using ``az`` (the folder :file:`~/bin` needs to be in your ``$PATH``).
   This enables you to execute ``az`` when using the dockerized Azure CLI.

#. Log in again to continue with the next step:

   .. code-block:: bash

      az login
