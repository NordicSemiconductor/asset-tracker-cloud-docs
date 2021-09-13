#!/bin/env bash

set -x
set -e

errlog=$(mktemp)
sphinx-build -M html ./ build -D release=${RELEASE} -D version=${VERSION} -A github_version=${VERSION}/ 2> $errlog
if [[ -s "$errlog" ]]; then
    echo "Sphinx build failed:"
    cat $errlog
    exit 1
else
    echo "Sphinx build succeeded."
    find docs -type f -name \*.json | xargs -I@ cp -v @ build/html/@
fi