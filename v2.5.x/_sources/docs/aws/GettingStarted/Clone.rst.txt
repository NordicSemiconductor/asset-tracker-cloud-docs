.. _aws-getting-started-clone:

Clone the project and install the dependencies
##############################################

To clone the `nRF Asset Tracker for AWS <https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js>`_ project and install the dependencies, use the following commands:

.. parsed-literal::

    # ~/nrf-asset-tracker
    
    git clone --branch |version| --single-branch \\
      https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js aws
    
    cd aws 
    
    # Install the dependencies
    npm ci
    