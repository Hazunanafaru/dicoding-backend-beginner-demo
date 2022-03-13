#!/bin/bash
sudo apt-get update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
nvm install v16.14.0
npm install
npm install -g pm2
pm2 start npm --name "notes-api" -- run "start-prod"