FROM ubuntu:20.04 as base
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
    apt-get -y install inkscape

COPY ./scripts/dot2svg.sh /bin