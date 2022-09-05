.. _aws-unwired-labs-cell-geolocation:

Unwired Labs Cell Geolocation
#############################

You can enable the :ref:`cell geolocation lookup <app-cellgeolocation>` for single cells for the application using `Unwired Labs' <https://unwiredlabs.com/>`_ geolocation API in your deployment.

To use the API, complete the following steps:

1. Configure your API key.
#. Enable the API using the CLI.
#. Redeploy the stack.

Use the following commands:

.. parsed-literal::
    :class: highlight

    ./cli.sh configure thirdParty unwiredlabs apiKey *API key*
    ./cli.sh configure context stack unwiredlabs 1
    npx cdk deploy --all

This will update the StateMachine, which resolves cells from devices to use the Unwired Labs' API as a resolver.

.. note::

   Unwired Labs' API is free for low volumes.