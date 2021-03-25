# nRF Asset Tracker Documentation

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

> :information_source:
> [Read the complete nRF Asset Tracker documentation](https://nordicsemiconductor.github.io/asset-tracker-cloud-docs/).

## How this documentation is published

This documentation is built using [Sphinx](https://www.sphinx-doc.org/), and
right now serves a version of the documentation under the
[`saga` directory](https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/tree/gh-pages/saga)
in the `gh-pages` branch of this repository and one under
[`v1.5.x`](https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/tree/gh-pages/v1.5.x).

A deployment is trigger by pushing to the respective branch and automated using
GitHub actions, see [./github/workflows/test-and-release.yaml].

The build for the release (`v1.5.x`) does not include the Azure documentation.
The two variants are built from the same source so there is not ongoing
maintenance of a _feature branch_.
