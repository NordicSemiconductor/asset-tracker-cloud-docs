.. _azure-install-cli:

Install the Azure CLI
#####################

To install the Azure CLI, follow the instructions in the `Azure CLI documentation <https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest>`_.

After installing the CLI, you can execute the ``az`` command:

.. code-block:: bash

   az

Dockerizing the az command
==========================

In case you encounter the issue where the Azure CLI requires an `older Python version <https://github.com/Azure/azure-cli/issues/11239>`_, you can dockerize the ``az`` command:

.. code-block:: bash

    #!/usr/bin/env bash 
    
    set -eu
    
    command="$@"
    
    docker run --rm --volume `pwd`:/root --volume $HOME/.azure:/root/.azure -w=/root mcr.microsoft.com/azure-cli az $command

Add the command to an executable file in your path.
