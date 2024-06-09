#!/bin/bash

# Install Chromium
apt-get update && apt-get install -y chromium

# Export Chromium path
export CHROMIUM_BIN="/usr/bin/chromium"

# Start your application
node dist/index.js