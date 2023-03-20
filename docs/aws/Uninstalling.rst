.. _uninstalling_asset_tracker:

Uninstalling the nRF Asset Tracker from AWS
###########################################

To uninstall the nRF Asset Tracker, execute the listed commands.

.. note::

    The commands are destructive. Therefore, execute them very carefully.

.. code-block:: bash

    ./cli.sh purge-buckets
    ./cli.sh purge-iot-user-policy-principals
    ./cli.sh purge-cas
    
    # Delete the nRF Asset Tracker Stack 
    # Note that the action can take around 20 minutes  
    # The CloudFormation distributions especially take a long time to get deleted
    npx cdk destroy --all
    