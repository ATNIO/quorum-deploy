#!/bin/bash

set -u
set -e

TMCONF=/qdata/tm.conf
GETH=/usr/local/bin/geth
CONSTELLATION=/usr/local/bin/constellation-node
GETH_ARGS="--datadir /qdata/dd \
  --raft --raftport 23000 \
  --rpc --rpcaddr 0.0.0.0 \
  --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum \
  --nodiscover \
  --unlock 0 --password /qdata/passwords.txt"

if [ ! -d /qdata/dd/geth/chaindata ]; then
  echo "[*] Mining Genesis block"
  $GETH --datadir /qdata/dd init /qdata/genesis.json
fi

echo "[*] Starting Constellation node"
nohup $CONSTELLATION $TMCONF 2>> /qdata/logs/constellation.log &

sleep 5

echo "[*] Starting node"
PRIVATE_CONFIG=/qdata/tm.ipc nohup $GETH $GETH_ARGS 2>>/qdata/logs/geth.log
