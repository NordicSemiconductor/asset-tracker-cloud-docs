.. _aws-getting-started-clone:

Clone the project and install dependencies
##########################################

We start in a blank directory:

.. code-block:: bash

    mkdir cat-tracker
    cd cat-tracker

Clone the latest version of the the `Asset Tracker Cloud Example for AWS <https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js>`_ project and install the dependencies using the following commands:

.. code-block:: bash

    git clone https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js.git cat-tracker-aws
    
    cd cat-tracker-aws 
    
    # Install the dependencies
    npm ci
    
    # Compile the TypeScript source
    npx tsc
