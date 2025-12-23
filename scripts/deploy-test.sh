#!/bin/bash
set -e

echo "Building for TEST environment (www.softwaremaniac.nl)..."
BASE_URL=https://www.softwaremaniac.nl npm run build

echo "Deploying to SoftwaremaniacWebsite..."
rclone sync out SoftwaremaniacWebsite: --progress --checksum

echo "Done! Test site deployed to https://www.softwaremaniac.nl"
