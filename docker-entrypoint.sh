#!/bin/sh
sleep 1
echo "installing..."
cd /app
npm install
echo "starting..."
exec npm run development