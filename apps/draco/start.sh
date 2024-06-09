#!/bin/bash

# Function to install Chrome for Testing

# Download the latest stable Chrome for Testing binary
npx @puppeteer/browsers install chrome@123.0.6312.58

# Get the path to the downloaded Chrome binary
export CHROME_BIN="/opt/render/project/src/apps/draco/chrome/linux-123.0.6312.58/chrome-linux64/chrome"

# Log the Chrome binary path for debugging
echo "Chrome binary installed at: $CHROME_BIN"

# Check if the file exists and is executable
if [ -x "$CHROME_BIN" ]; then
    echo "Chrome binary is executable."
else
    echo "Chrome binary is not executable. Please check the path and permissions."
fi

# Start your application
node dist/index.js
