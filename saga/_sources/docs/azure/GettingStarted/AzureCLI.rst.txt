Install the Azure CLI
#####################

Follow the instructions from the `Azure CLI documentation <https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest>`_ to install the CLI.

After installing the CLI, you must be able to execute the ``az`` command:

.. code-block:: bash

    az

Dockerizing the az command
==========================

In case you encounter the issue where the Azure CLI requires `an older Python version <https://github.com/Azure/azure-cli/issues/11239>`_, you can *dockerize* it as follows:

.. code-block:: bash

    #!/usr/bin/env bash 
    
    set -eu
    
    command="$@"
    
    docker run --rm --volume `pwd`:/root --volume $HOME/.azure:/root/.azure -w=/root mcr.microsoft.com/azure-cli az $command

Add the command to an executable file in your path.
