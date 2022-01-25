.. _uninstalling_asset_tracker:

Uninstalling the nRF Asset Tracker from AWS
###########################################

To uninstall the nRF Asset Tracker, execute the listed commands.

.. note::

    The commands are destructive. Therefore, execute them very carefully.

.. code-block:: bash

    node cli purge-buckets
    node cli purge-iot-user-policy-principals
    node cli purge-cas
    
    # Delete the nRF Asset Tracker Stack 
    # Note that the action can take around 20 minutes  
    # The CloudFormation distributions especially take a long time to get deleted
    npx cdk destroy --all
    
    # Delete the Source Code Stack 
    SOURCE_CODE_BUCKET=`aws cloudformation describe-stacks --stack-name ${STACK_NAME:-nrf-asset-tracker}-sourcecode | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "bucketName") | .OutputValue'` 
    aws s3 rb s3://$SOURCE_CODE_BUCKET --force
    npx cdk -a 'node dist/cdk/cloudformation-sourcecode.js' destroy --all
