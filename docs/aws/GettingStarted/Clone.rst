.. _aws-getting-started-clone:

Clone the project and install the dependencies
##############################################

To clone the `nRF Asset Tracker for AWS <https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js>`_ project and install the dependencies, use the following commands:

.. parsed-literal::

    git clone --branch |version| --single-branch \\
      https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js.git aws
    
    cd aws 
    
    # Install the dependencies
    npm ci
    
    # Compile the TypeScript source
    npx tsc
