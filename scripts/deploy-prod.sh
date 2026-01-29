#!/bin/bash
set -e

echo "Building for PRODUCTION environment (inspired-it.nl)..."
BASE_URL=https://inspired-it.nl \
NEXT_PUBLIC_GOATCOUNTER_URL=https://inspiredit.goatcounter.com/count \
npm run build

echo "Deploying to InspiredITWebsite..."
rclone sync out InspiredITWebsite: --progress --checksum

echo "Done! Production site deployed to https://inspired-it.nl"
