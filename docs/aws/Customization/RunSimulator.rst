.. _aws-customization-run-device-simulator-ui:

Run the device simulator UI
###########################

To run the device simulator User Interface (UI), complete the following steps:

1. Navigate to the :ref:`working directory <aws-working-directory>`.
#. Clone the device simulator UI and install the dependencies:

   .. parsed-literal::

      git clone --branch |version| --single-branch \\
        https://github.com/NordicSemiconductor/asset-tracker-cloud-device-ui-js simulator-ui
      cd simulator-ui
      npm ci

#. Start the development server of the device simulator UI:

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

#. Create a new device for use with the simulator by generating a new device certificate:

   .. code-block:: bash

      cd ~/nrf-asset-tracker/aws
      # Create a new certificate
      node cli create-simulator-cert

#. After executing the above command, copy the endpoint printed from ``npm exec -- @nordicsemiconductor/asset-tracker-cloud-device-simulator-aws "</path/to/certificate.json>"`` (for example, ``http://localhost:25336``) and use it in the device simulator UI.

   As shown in the following image, the UI connects to the simulator, which is run through the CLI:

   .. figure:: ./images/device-simulator-ui-connected.png
      :alt: Device simulator UI connected
