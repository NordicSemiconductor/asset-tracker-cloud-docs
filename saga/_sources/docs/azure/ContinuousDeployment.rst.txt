.. _azure-continuous-deployment:

Continuous deployment
#####################

You can enable continuous deployment of the changes in your source repository to an Azure account.

.. note::

   It is optional to keep the deployment in your account automatically synchronized with the source code repository.

For the continuous deployment to work, you need to fork the source code to register the webhook listener that triggers an upgrade of your deployment.

After forking, make sure to update the ``repository.url`` in the :file:`package.json` file in your fork.
For continuous deployment, complete the following steps:

Acquire credentials for the CI runner
*************************************

To acquire credentials for the CI runner, complete the following steps:

1. Login using the shell:

   .. code-block:: bash

      az login

#. Export the identifier of the subscription which contains the nRF Asset Tracker resources:

   .. code-block:: bash

      export SUBSCRIPTION_ID="<subscription id>"

#. Make sure that you have enabled the correct subscription by running the following commands:

   .. code-block:: bash

      az account set --subscription $SUBSCRIPTION_ID
      # Verify that it is set to default
      az account list --output table

#. Create the CI credentials:

   .. code-block:: bash

      az ad sp create-for-rbac --name https://github.com/ --role Contributor --sdk-auth --scopes /subscriptions/${SUBSCRIPTION_ID} > cd-credentials.json

#. Fork the `nRF Asset Tracker for Azure project <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure-js>`_ and add the following secrets to an environment called ``production``:

   * ``AZURE_CREDENTIALS`` - Store the contents of the JSON file created in the above step.
  
#. Add these values from your :file:`.envrc` file as secrets as well (everything except ``SUBSCRIPTION_ID``):

   * ``RESOURCE_GROUP``
   * ``APP_NAME``
   * ``LOCATION``
   * ``B2C_TENANT``
   * ``APP_REG_CLIENT_ID``

#. Commit a change

   GitHub actions should now update your deployment.