.. _azure-getting-started-clone:

Clone the project and install the dependencies
##############################################

To clone the `nRF Asset Tracker for Azure <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js>`_ project and install the dependencies, use the following commands:

.. parsed-literal::

    git clone --branch |version| --single-branch \\
      https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js.git azure
    
    cd azure 
    
    # Install the dependencies
    npm ci
    
    # Compile the TypeScript source
    npx tsc
