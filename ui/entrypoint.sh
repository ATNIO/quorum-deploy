#!/bin/sh

start_app(){
  echo "the app starts"
  npm run build --production && exec serve -p 5000 -s build
}

start_app
