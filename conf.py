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


# -- Project information ---------------------------------------------------------------------------------------------

project = 'nRF Asset Tracker'
copyright = '2019-2023, Nordic Semiconductor'
author = 'Nordic Semiconductor'

# -- General configuration -------------------------------------------------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = []

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# These folders are copied to the documentation's HTML output


# These paths are either relative to html_static_path
# or fully qualified paths (eg. https://...)


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

msg = "<b>Important: </b>We're excited to introduce our new technical documentation " \
        "platform <a href=\"http://docs.nordicsemi.com/\">docs.nordicsemi.com</a>, " \
        "currently in Beta version. We invite you to explore it and share your feedback. " \
        "Read more on our <a href=\"https://devzone.nordicsemi.com/nordic/nordic-blog/b/blog/posts/introducing-the-unified-documentation-portal\">DevZone blog</a>. " \

html_theme_options = {
    'logo_only': True,
    'set_default_announcement': True,
    'docset': 'assettracker',
    'docsets': {
        'assettracker': ('nRF Asset Tracker', 'index', None),
    },
    'default_announcement_message': msg
}

# Enable the "Edit in GitHub link within the header of each page.
html_context = {
    'display_github': True,
    'github_user': 'NordicSemiconductor',
    'github_repo': 'asset-tracker-cloud-docs',
    'github_version': 'saga',
    'conf_py_path': '/',
    'github_versions': ['saga', 'v2.2.x', 'v2.1.x', 'v1.8.x', 'v1.6.x', 'v1.5.x']
}

master_doc = 'index'

suppress_warnings = ['ref.ref']
