#!/bin/env bash

set -x
set -e

errlog=$(mktemp)
sphinx-build -M html ./ build -D release=${RELEASE} -D version=${VERSION} -A github_version=${VERSION}/ -t ${AUDIENCE} 2> $errlog
if [[ -s "$errlog" ]]; then
    echo "Sphinx build failed:"
    cat $errlog
    exit 1
else
    echo "Sphinx build succeeded."
fi