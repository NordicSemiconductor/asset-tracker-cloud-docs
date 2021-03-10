.. _app-customization-customize-web-app:

Customize the Cat Tracker web application
#########################################

Now we can continue with customzing the web application.

The heart rate readings should be visualized in a new chart on the :ref:`Cat Tracker web application <index-cat-tracker-web-app>`.

Navigate to the web application directory created, when following the :ref:`Getting Started guide <aws-getting-started-app>`:

.. code-block:: bash

    cd ~/nrf-asset-tracker/cat-tracker-web-app
    # ~/nrf-asset-tracker/cat-tracker-web-app

Run the development server:

.. code-block:: bash

    npm start

Now you can open the web application at `<http://localhost:3000>`_ and select the simulated cat.

.. figure:: ./images/web-app.png
   :alt: The Cat Tracker web application

We are now ready to modify the web application and add a new chart section that displays the most recent heart rate readings.

