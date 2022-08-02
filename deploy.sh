#!/usr/bin/env bash

rm -rf ./dist
parcel build index.html
cd dist
echo 'triangle.biglion.top' >> CNAME
git init
git add .
git commit -m 'rebuild'
git remote add origin git@github.com:Big7lion/triangle.git
git branch -M main
git push -u origin main -f

