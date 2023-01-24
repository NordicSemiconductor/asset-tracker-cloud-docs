.. _system-requirements:

System requirements
###################

You need a development environment with

- `Git <https://git-scm.com/>`_
- `jq <https://stedolan.github.io/jq/>`_
- the `LTS release candidate of Node.js <https://nodejs.org/en/about/releases/>`_ (current LTS release is version 18)
- the `current stable release of npm (version 8) <https://github.blog/changelog/2021-10-07-npm-cli-upgraded-to-version-8/>`_
- `OpenSSL v3 <https://www.openssl.org/source/>`_ (for the certificate generation helpers)

If you are using Windows, use the `Windows Subsystem for Linux <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_ with `Ubuntu 22.04
LTS <https://apps.microsoft.com/store/detail/ubuntu-22041-lts/9PN20MSR04DW>`_.

.. note::

   Windows is not included in the continuous integration tests, and hence if you encounter issues, you can vote in the `nRF Asset Tracker project discussion <https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/discussions/21>`_.
