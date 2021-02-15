.. _core-principles:

Core principles
###############

The *Asset Tracker Cloud Example* is built on the following principles:

Teach by showing
================
   
All examples are designed to solve a concrete use case (a *Cat Tracker*) instead of providing generic or abstract solutions.
It is not a framework, but a real application.

Err on the side of security
===========================

It follows the most robust security recommendations of the respective cloud provider.

Single tenancy
==============

It implements a scenario in which all the authenticated users can be trusted to access all the devices.
This is a typical scenario for cellular IoT products, and it simplifies the onboarding of new devices.
  
Serverless
==========

It uses a serverless architecture as much as possible to have near-zero costs for the operation during the development, and to provide horizontal scaling of resources to be used in a production system if needed.

Cloud native
============

It follows the best practices of the respective cloud provider to reduce development efforts due to abstraction and offer the best integration into the cloud provider's ecosystem.

Being offline is not an exception
=================================

Highly mobile cellular IoT products need to handle unreliable connections gracefully, by implementing mechanisms to retry the failed sending of data.
This also means that the sensor measurements need to be timestamped when they are created, and not when they arrive at the cloud.

Maximize power saving
=====================

The firmware examples highlight power saving features of the nRF9160 since this is critical aspect for developing small form-factor devices that need to run for years on on a single battery charge.

This means more specifically:
 * power-saving is used as much as possible in all operation states of the device 
 * the least amount of data is sent to the cloud (optimize for message size)
 * data is encoded in a way that is most efficient for the device (optimize for computation cycles)
 * all computation that is done one the device must only be possible on the device