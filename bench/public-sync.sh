#!/bin/sh

set -u
set -e

# c = number of concurrent connections (sending transactions over and over)
# d = duration, e.g. 30 (30 seconds), 5m, 1h
# t = threads Wrk should use, e.g. 2
#
# Example: ./bench-public-sync.sh 10 1m 2

c=$1
d=$2
t=$3

. address.cfg

rm -f send-public-sync.lua
cat << EOF > send-public-sync.lua
wrk.method = "POST"
wrk.body = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from": "$from", "to": "$to", "gas": "0x76c0", "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675", "privateFor": ["$pub"]}],"id":1}'
wrk.headers["Content-Type"] = "application/json"
EOF

# curl -d '' $url
wrk -s send-public-sync.lua -c $c -d $d -t $t $url
