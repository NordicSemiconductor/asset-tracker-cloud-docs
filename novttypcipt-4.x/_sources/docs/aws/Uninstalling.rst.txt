.. _uninstalling_asset_tracker:

Uninstalling the Asset Tracker Cloud Example from AWS
#####################################################

To uninstall the Asset Tracker Cloud Example, execute the listed commands.

.. note::

    The commands must be executed with care since they are destructive.

.. code-block:: bash

    STACK_NAME=asset-tracker
    
    node cli purge-buckets
    node cli purge-iot-user-policy-principals
    node cli purge-cas
    
    # Delete the Asset Tracker Cloud Example Stack 
    # Note that the action can take around 20 minutes  
    # The CloudFormation distributions especially take a long time to get deleted
    npx cdk destroy '*'
    
    # Delete the Source Code Stack 
    SOURCE_CODE_BUCKET=`aws cloudformation describe-stacks --stack-name $STACK_NAME-sourcecode | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "bucketName") | .OutputValue'` 
    aws s3 rb s3://$SOURCE_CODE_BUCKET --force
    npx cdk -a 'node dist/cdk/cloudformation-sourcecode.js' destroy '*'
