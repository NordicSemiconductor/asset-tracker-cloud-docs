# nRF Asset Tracker documentation [![npm version](https://img.shields.io/npm/v/@nordicsemiconductor/asset-tracker-cloud-docs.svg)](https://www.npmjs.com/package/@nordicsemiconductor/lwm2m-types)

[![GitHub Actions](https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/workflows/Test%20and%20Release/badge.svg)](https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/actions)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![Mergify Status](https://img.shields.io/endpoint.svg?url=https://api.mergify.com/v1/badges/NordicSemiconductor/asset-tracker-cloud-docs)](https://mergify.io)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

The nRF Asset Tracker aims to provide a concrete end-to-end example for an
ultra-low power cellular IoT product in the asset tracker space.

> [Read the complete nRF Asset Tracker documentation](https://nordicsemiconductor.github.io/asset-tracker-cloud-docs/).

## Building the docs locally

Build the Docker image:

    docker build -t nordicsemiconductor/asset-tracker-cloud-docs/builder ./

Then build the docs:

    make html

The result will be placed in `./build/html`.

You can use `node-static` to serve it from this folder:

    npx node-static build/html

## Extending the documentation

The documentation is written in reStructuredText, following the
[nRF Connect SDK guidelines](https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/doc_styleguide.html#rst-gl).

## Publishing the documentation

This documentation is built using [Sphinx](https://www.sphinx-doc.org/), and is
available for the `saga` branch and for the major
[nRF Connect SDK](https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/index.html)
release versions in sub-directories in the `gh-pages` branch of this repository.

A deployment is triggered by pushing commits to the respective branch and is
automated using GitHub actions. See `./github/workflows/test-and-release.yaml`.
