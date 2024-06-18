#!/bin/bash
USERNAME=prashantbhu
REPONAME=falcon
AMD="linux/amd64"
ARM="linux/arm64"

docker buildx build --platform ${ARM},${AMD} --target draco --tag ${USERNAME}/${REPONAME}:latest --push .

docker pull ${USERNAME}/${REPONAME}:latest
