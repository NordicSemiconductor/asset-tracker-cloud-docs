FROM ubuntu:22.04 as base
WORKDIR /workdir

RUN \
    export DEBIAN_FRONTEND=noninteractive && \
    # Update system
    apt-get -y update && \
    apt-get -y upgrade && \
    # Install GraphViz
    apt -y install graphviz fonts-noto && \
    # Install Inkscape
    apt-get -y install software-properties-common && \
    add-apt-repository ppa:inkscape.dev/stable && \
    apt-get -y update && \
    apt-get -y install inkscape && \
    # Install Sphinx and rstcheck
    apt-get -y install sphinx-common python3-recommonmark python3-sphinx-rtd-theme && \
    apt-get -y install pip && \
    pip install rstcheck

RUN \
    apt -y install curl && \
    curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt -y install nodejs

ARG RELEASE
ARG VERSION
