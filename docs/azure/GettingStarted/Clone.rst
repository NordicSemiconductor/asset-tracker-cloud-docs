.. _azure-getting-started-clone:

Clone the project and install the dependencies
##############################################

Clone the latest version of the `nRF Asset Tracker for Azure <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js>`_ project and install the dependencies using the following commands:

.. code-block:: bash

    git clone https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js.git azure
    
    cd azure 
    
    # Install the dependencies
    npm ci
    
    # Compile the TypeScript source
    npx tsc
