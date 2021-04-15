.. _aws-unwired-labs-api:

Unwired Labs API
################

You can enable the :ref:`cell geolocation lookup <app-cellgeolocation>` for the application using `Unwired Labs' <https://unwiredlabs.com/>`_ geolocation API in your deployment.

To use Unwired Labs' geolocation API, configure your API key using the CLI and redeploy the stack using the following commands:

.. code-block:: bash

    node cli configure-api cellGeoLocation unwiredlabs apiKey "<API Key>"
    npx cdk -c unwiredlabs=1 deploy '*'

This will update the StateMachine, which resolves cells from devices to use the Unwired Labs' API as a resolver.

.. note::

   Unwired Labs' API is free for low volumes.
   However, `opencellid.org <https://opencellid.org/>`_ allows to use the underlying dataset for free.
   If you find it relevant, vote in the `Integrate OpenCelliD data <https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/discussions/5>`_ issue.
