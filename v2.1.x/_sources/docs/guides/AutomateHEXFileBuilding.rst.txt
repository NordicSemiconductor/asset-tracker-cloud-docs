.. _guides-automate-hexfile-building:

Automate building of HEX files for your nRF Connect SDK application
###################################################################

Continuous delivery shortens the time to market of a product. The nRF9160 DK supports firmware over-the-air (FOTA) upgrades `for AWS <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/samples/nrf9160/aws_fota/README.html>`_ and `for Azure <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/samples/nrf9160/azure_fota/README.html>`_.
As a developer, you most probably want to update the latest firmware, using FOTA, in your development kit every time the application changes.

Continuous delivery requires automation of the process that builds the HEX file of an application.

.. figure:: ./images/github-release-with-hex-files.png
   
   GitHub release with attached HEX files

Getting all the installation and configuration steps right takes a while, but afterwards you have a reproducible recipe to build your HEX files, as part of your source code project.

Not only does that mean you can provide up-to-date HEX files with zero effort, but using a CI runner allows you to automate your software releases using a project called `semantic release <https://github.com/semantic-release/semantic-release>`_.

.. note::

    By default, the semantic-release gets the ``reposityUrl`` from the :file:`package.json` file. It uses the URL to determine the changes between releases.
    After forking the ``firmware`` repository, the URL will still point to ``https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware.git``.
    Either update that to the URL of your fork, or `provide it as an argument <https://semantic-release.gitbook.io/semantic-release/usage/configuration#repositoryurl>`_ to the semantic-release CLI.

The `workflow definition for GitHub Actions <https://github.com/NordicSemiconductor/asset-tracker-cloud-firmware-aws/blob/saga/.github/workflows/build-and-release.yaml>`_  automatically builds HEX files and attaches them to the GitHub release.

Following this example, format your commit messages following a certain schema (for more information see :ref:`guides-versionining-how-to-release-a-new-version-of-a-package`) to trigger a new release.

.. figure:: ./images/github-releases.png

   GitHub releases