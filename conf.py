# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup ------------------------------------------------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))
import sphinx_rtd_theme

# -- Project information ---------------------------------------------------------------------------------------------

project = 'nRF Asset Tracker'
copyright = '2019-2022, Nordic Semiconductor ASA | nordicsemi.no'
author = 'Nordic Semiconductor ASA | nordicsemi.no'

# -- General configuration -------------------------------------------------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = []

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# These folders are copied to the documentation's HTML output
html_static_path = ['_static']

# These paths are either relative to html_static_path
# or fully qualified paths (eg. https://...)
html_css_files = [
    'common.css',
]

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']


# -- Options for HTML output -----------------------------------------------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'sphinx_ncs_theme'
html_theme_path = ["."]

html_theme_options = {
    'logo_only': True
}

# Enable the "Edit in GitHub link within the header of each page.
html_context = {
    'display_github': True,
    'github_user': 'NordicSemiconductor',
    'github_repo': 'asset-tracker-cloud-docs',
    'github_version': 'saga'
}

master_doc = 'index'

suppress_warnings = ['ref.ref']