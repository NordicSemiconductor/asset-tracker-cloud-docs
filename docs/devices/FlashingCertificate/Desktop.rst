.. _devices-provisioning-certificate-desktop:

Provisioning using nRF Connect for Desktop
##########################################

You can use the :file:`certificates/device-<deviceId>.json` file with *Certificate Manager* in `LTE Link Monitor <https://infocenter.nordicsemi.com/topic/ug_link_monitor/UG/link_monitor/lm_intro.html>`_, which is an application implemented as part of `nRF Connect for Desktop <https://infocenter.nordicsemi.com/topic/struct_nrftools/struct/nrftools_nrfconnect.html>`_, to provision the certificate to the device.

*Certificate Manager* uses AT commands to write the certificate information to the secure storage of the modem and you need to program your device with a firmware that has the AT command host enabled.

To provision the certificate using LTE Link Monitor, complete the following steps:

#. Program the AT host using `nRF Connect Programmer <https://infocenter.nordicsemi.com/topic/ug_nrf91_dk_gsg/UG/nrf91_DK_gsg/provisioning_certificate.html>`_ application (part of nRF Connect for Desktop). 

   .. figure:: ./images/programmer-desktop.png
      :alt: nRF Connect for Desktop Programmer

      nRF Connect for Desktop Programmer

   For programming, use the following files:
 
   *   Thingy:91 -  `thingy91_at_client_increased_buf.hex <https://nordicsemiconductor.github.io/at_client-hex/at_client-thingy91_nrf9160ns.hex>`_
   *   nRF9160 DK - `91dk_at_client_increased_buf.hex <https://nordicsemiconductor.github.io/at_client-hex/at_client-nrf9160dk_nrf9160ns.hex>`_

   For instructions, see :ref:`programming the firmware <program-the-firmware>`.

   .. important::

      Make sure that the selected device is directly connected and not connected via the debugger.

#. Open nRF Connect for Desktop and launch the LTE Link Monitor application.

   .. figure:: ./images/lte-link-monitor-desktop.png
      :alt: nRF Connect for Desktop LTE Link Monitor
      
      nRF Connect for Desktop LTE Link Monitor

#. Click :guilabel:`Certificate Manager`.
 
   .. figure:: ./images/certificate-manager-desktop.png
      :alt: nRF Connect for Desktop Certificate Manager

      LTE Link Monitor Certificate Manager

#. Drag and drop the JSON file into the *Certificate Manager* window or select the JSON file using the :guilabel:`Load from JSON` option.

   .. note::

      Change the security tag to ``42``. The modem can hold multiple credentials, and the default security tag ``16842753`` is reserved for `nRF Connect for Cloud <https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-Cloud>`_ credentials.

#. Click :guilabel:`Update certificates` and wait until the operation finishes.
