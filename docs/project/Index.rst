.. _project:

Project Overview
################

The nRF Asset Tracker enables developers to set up a real-world IoT solution using one of the supported cloud providers and adapt the example firmware and software to fit their use case.

.. developer_xp_warning_start

.. note::

   Developers are expected to have prior experience in developing solutions with the respective cloud provider.
   The nRF Asset Tracker is designed for developers who require a head start on setting up the cloud provider for Nordic devices and require modifying the solution according to specific needs.
   The nRF Asset Tracker  is not a turn-key software-as-a-service solution.
   It comes with additional costs and there will be future maintenance efforts.

.. developer_xp_warning_end

The nRF Asset Tracker aims to provide answers and recommend best practices to the following questions:

* How can you connect Nordic's cellular IoT chips to a specific cloud provider?
* How do devices send data to the cloud?
* How does the cloud send the data back to the devices?
* How can authenticated users and other services interact with the devices?
* How can you upgrade the application firmware of devices while they are deployed in the field?
* How can you develop a cellular IoT product that maximizes battery life, minimizes data usage, and gracefully handles unreliable connectivity?

.. note::

   Development progress is managed in the `nRF Asset Tracker Development GitHub Project <https://github.com/orgs/NordicSemiconductor/projects/2>`_.

.. toctree::
   :titlesonly:

   CorePrinciples.rst
   SystemOverview.rst
   SupportedCloudProviders.rst
   License.rst
