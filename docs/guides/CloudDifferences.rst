.. _cloud-differences:

Cloud differences
#################

.. contents::
   :local:
   :depth: 2

This guide describes the key differences between the reference AWS implementation and other IoT implementations by different cloud providers.

Google Cloud Platform (GCP)
***************************

Authentication
==============

Devices connect to the broker host using TLS 1.2, but authenticate against MQTT using a username (any) and a JWT token, signed with the device key.
This means that you must provision the devices with the `TLS Root Certificates <https://cloud.google.com/iot/docs/how-tos/mqtt-bridge#using_a_long-term_mqtt_domain>`_ and a device-specific keypair.

Digital twin
============

GCP has Configuration (AWS: desired) and State (AWS: reported).

Devices receive their configuration by subscribing to the ``/devices/${deviceId}/config`` topic.
On successful subscription, the devices receive the configuration on this topic.
If the configuration is changed, the updated configuration will be published to the topic.
There is no delta.

Devices publish their state to ``/devices/${deviceId}/state`` topic.
The devices must always publish the entire state.
There is no native support for partial updates.

WebSockets
==========

The IoT Core does not support WebSocket connection, which is used in the app to get notifications about changes on the device state in real time.

Microsoft Azure
***************

Device Provisioning Service
===========================

Azure supports Just-in-Time Provisioning, but this process is not transparent to the device.
