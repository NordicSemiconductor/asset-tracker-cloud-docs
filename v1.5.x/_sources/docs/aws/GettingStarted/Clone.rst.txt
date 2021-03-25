.. _aws-getting-started-clone:

Clone the project and install the dependencies
##############################################

Clone the latest version of the `nRF Asset Tracker for AWS <https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js>`_ project and install the dependencies using the following commands:

.. code-block:: bash

    git clone https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js.git aws
    
    cd aws 
    
    # Install the dependencies
    npm ci
    
    # Compile the TypeScript source
    npx tsc
