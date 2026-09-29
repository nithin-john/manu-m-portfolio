#!/bin/bash
# Convenient one-click launcher for macOS
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "=================================================="
echo " Starting 'FROM HUMAN TO HIDDEN AI IDENTITY'"
echo " Portfolio for Manu MA"
echo "=================================================="

# Check if port 8080 is occupied, if so use 8081
PORT=8080
if lsof -i :$PORT >/dev/null 2>&1; then
  PORT=8081
fi

echo "Launching on http://localhost:$PORT..."
open "http://localhost:$PORT"
python3 serve.py $PORT
