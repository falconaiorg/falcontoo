#!/bin/bash

# Function to install Chrome for Testing
install_chrome_for_testing() {
    # Download the latest stable Chrome for Testing binary
    npx @puppeteer/browsers install chrome@123.0.6312.58
    
    # Export the path to the downloaded Chrome binary
    export CHROMIUM_BIN=$(npx @puppeteer/browsers path chrome@stable)
}

# Function to install Chromium on macOS
install_chromium_mac() {
    if ! command -v chromium &> /dev/null; then
        brew install chromium
    fi
    export CHROMIUM_BIN="/usr/local/bin/chromium"
}

# Detect the environment and install the appropriate browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    install_chromium_mac
else
    install_chrome_for_testing
fi

# Start your application
node dist/index.js
