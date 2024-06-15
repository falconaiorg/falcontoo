#!/bin/bash

CHROME_VERSION="125.0.6422.78"
CHROME_LOCATION="chrome/linux-$CHROME_VERSION/chrome-linux64/chrome"
RENDER_ROOT="/opt/render/project/src/apps/draco"
AZURE_ROOT="/home/site/wwwroot"

# Function to install Chrome for Testing
echo "Installing Chrome for Testing..."

# Download the latest stable Chrome for Testing binary
npx @puppeteer/browsers install chrome@$CHROME_VERSION

# Set the ROOT directory based on the RENDER environment variable
if [ "$RENDER" = "true" ]; then
    ROOT=$RENDER_ROOT
else
    ROOT=$AZURE_ROOT
fi

# Log the ROOT directory for debugging
echo "ROOT directory is set to: $ROOT"

# Set the CHROME_BIN environment variable
export CHROME_BIN="$ROOT/$CHROME_LOCATION"

# Log the Chrome binary path for debugging
echo "Chrome binary installed at: $CHROME_BIN"

# Check if the file exists and is executable
if [ -x "$CHROME_BIN" ]; then
    echo "Chrome binary is executable."
else
    echo "Chrome binary is not executable. Setting permissions..."
    chmod +x "$CHROME_BIN"
fi

# Start your application
export PORT=${PORT:-8080}

echo "Starting Node.js application..."

node dist/index.js
