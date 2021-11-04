FROM ubuntu:22.04 as base
WORKDIR /workdir

RUN \
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

COPY ./scripts/dot2svg.sh /bin

ARG RELEASE
ARG VERSION

COPY ./scripts/sphinx.sh /bin