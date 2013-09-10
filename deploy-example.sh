#!/bin/bash

./node_modules/wintersmith/bin/wintersmith build && 
/usr/bin/rsync -avz --exclude '.git' ~/github/maxcdn/api-docs/build/ deploy@yourdomain.com:~/www/api-docs/
