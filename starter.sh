#!/bin/sh

if [ $(ps aux | grep $USER | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
  export PATH=/usr/local/bin:$PATH
  export NODE_ENV=production
  cd /var/www/indataly && pm2 start server.js --name="indataly" -i 0 >> forever.log 2>&1
fi