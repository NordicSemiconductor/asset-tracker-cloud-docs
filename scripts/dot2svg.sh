#!/bin/env bash

set -x
set -e

TDIR=`dirname $2`
T=`mktemp -p $TDIR`
OUT="${T}.svg"
rm $T


echo $1
echo $2
echo ${OUT}

dot -Tsvg -Gdpi=300 -Nfontname="Calibri" -Nfontsize=20 -Gfontname="Calibri" -Gfontsize=20 -Efontname="Calibri" -Efontsize=16 -o${OUT} $1
inkscape --export-plain-svg --actions="export-id:graph0; export-id-only; vacuum-defs; export-filename:$2; export-plain-svg; export-text-to-path; export-do;" ${OUT} &>/dev/null
rm -r ${OUT}