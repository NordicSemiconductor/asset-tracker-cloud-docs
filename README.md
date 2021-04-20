# nRF Asset Tracker documentation

[![GitHub Actions](https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/workflows/Test%20and%20Release/badge.svg)](https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/actions)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![Mergify Status](https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/NordicSemiconductor/asset-tracker-cloud-docs)](https://mergify.io)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

The nRF Asset Tracker aims to provide a concrete end-to-end example for an
ultra-low power cellular IoT product in the asset tracker space, specifically a
Cat Tracker.

> [Read the complete nRF Asset Tracker documentation](https://nordicsemiconductor.github.io/asset-tracker-cloud-docs/).

## Publishing the documentation

This documentation is built using [Sphinx](https://www.sphinx-doc.org/), and
is available in two versions under the following directories in the `gh-pages` branch of this repository:

* [`saga`](https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/tree/gh-pages/saga)
* [`v1.5.x`](https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/tree/gh-pages/v1.5.x)

A deployment is triggered by pushing commits to the respective branch and is automated using
GitHub actions.
See ``./github/workflows/test-and-release.yaml``.
The build for the release (`v1.5.x`) does not include the Azure documentation.
The two variants of the documentation are built from the same source and there is no ongoing
maintenance for a _feature branch_.
