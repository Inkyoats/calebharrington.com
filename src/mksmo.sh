#!/bin/bash
#
# create thumbnails of source files
#
# useage:
#
#  ./mksmo [srcdir] [dstdir]
#

srcdir=".."
dstdir="./"

if [[ "$1" != "" ]] ; then
  srcdir="$1"
  if [[ "$2" != "" ]] ; then
    dstdir="$2"
  fi
fi

echo "# srcdir=$srdir, dstdir=$dstdir"

for f in `find "$srcdir" -maxdepth 1 -type f \( -name '*.png' -o -name '*.gifv' -o -name '*.gif' -o -name '*.jpg' \) ` ; do
  echo $f
  finfo=`file $f`
  x=`echo $finfo | cut -f5 -d' '`
  y=`echo $finfo | cut -f7 -d' '`
  #echo $x $y $finfo

  #b=`basename $f .png`
  #b=`basename $f | cut -f1 -d'.'`

  bfn=`basename $f`
  sfx=`echo $bfn | cut -f2 -d'.'`
  b=`echo "$bfn" | cut -f1 -d'.'`

  convert -resize 500 $f ${b}_small.$sfx

done
