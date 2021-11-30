.. _system-overview:

System overview and technical considerations
############################################

.. contents::
   :local:
   :depth: 2

.. raw:: html
   :file: ./system-overview.svg

Devices connect to the message broker using TLS over TCP.
The messaging protocol is JSON over MQTT.
The TLS certificates are generated offline by the developer to simplify the provisioning during production.

The nRF Asset Tracker provides the tools to configure the developer's cloud account for use with the developer's devices and the single-page application (SPA).
After the cloud account has been configured, it provides the necessary resources for the trackers to connect to the message broker and to send and receive messages.
It also provides the appropriate APIs for the SPA to interact with the developer's devices.

The mobile-first SPA provides a reference implementation of a user interface to control and interact with the devices.
