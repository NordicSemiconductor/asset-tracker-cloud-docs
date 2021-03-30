.. _aws-customization-run-device-simulator-ui:

Run the device simulator UI
###########################

First, run the device simulator User Interface (UI) by completing the following steps:

1. Navigate to the :ref:`working directory <aws-working-directory>`.
#. Clone the device simulator UI and install the dependencies:

   .. code-block:: bash

      git clone https://github.com/NordicSemiconductor/asset-tracker-cloud-device-ui-js simulator-ui
      cd simulator-ui
      npm ci

#. Start the device simulator UI's development server by running the following command:

   .. code-block:: bash

      npm start

   .. figure:: ./images/device-simulator-ui-development-server.png
      :alt: Device simulator UI development server

      Device simulator UI development server
	  
   The command launches a browser with `<http://localhost:8080>`_ in the address bar as shown in the following image:

   .. figure:: ./images/device-simulator-ui.png
      :alt: Device simulator UI
   
      Device simulator UI

   The device simulator UI loads in the browser.

#. Create a new device for use with the simulator by generating a new device certificate.

   .. code-block:: bash

      cd nrf-asset-tracker/aws
      # Create a new certificate
      node cli create-device-cert
      # Now connect with the certificate using the device simulator
      node cli connect '<device id>'

#. Copy the query string of the URL printed after ``To control this device open your browser on:`` in CLI, for example, ``?endpoint=http%3A%2F%2Flocalhost%3A24272`` and append it to the URL in the browser and press enter.

   As shown in the following image, the UI connects to the simulator, which is run through the CLI:

   .. figure:: ./images/device-simulator-ui-connected.png
      :alt: device simulator UI connected
