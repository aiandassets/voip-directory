#!/bin/bash
echo "Initiating Deployment..."
cd "$(dirname "$0")"
git push origin main
echo "============================================="
echo "If you see 'Everything up-to-date', you are done!"
echo "If prompted for a username/password, please type it."
echo "============================================="
read -p "Press Enter to close..."
