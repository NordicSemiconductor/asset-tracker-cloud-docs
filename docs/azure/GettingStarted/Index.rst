.. _azure-getting-started:

Getting started
###############

.. include:: ../../project/Index.rst
   :start-after: developer_xp_warning_start
   :end-before: developer_xp_warning_end

Before you start the setup of the nRF Asset Tracker on Azure, make sure that you fulfill the following prerequisites:

.. prerequisites_start

* One of the `supported development kits <https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/applications/asset_tracker_v2/doc/asset_tracker_v2_description.html#requirements>`_.
* :ref:`Necessary system requirements <system-requirements>`.
* A :ref:`direnv <about-direnv>` plugin installed for your shell.
* An Azure account with administrator access. To set up a new Azure account, see `Create and activate a new Azure account <https://docs.microsoft.com/en-us/azure/guides/developer/azure-developer-guide#understanding-accounts-subscriptions-and-billing>`_.

.. prerequisites_end

.. toctree::
   :titlesonly:
   :caption: Subpages:
   
   WorkingDirectory.rst
   Clone.rst
   AzureCLI.rst
   Deploy.rst
   nRFCloudLocationServices.rst
   FirmwareConfiguration.rst
   DeviceCredentials.rst
   Programming.rst
   Webapp.rst
   NextSteps.rst