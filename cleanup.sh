#!/bin/bash

rm -rf qdata_[0-9] qdata_[0-9][0-9]
rm -f docker-compose.yml
rm -f kubernetes.yaml
rm -rf scripts

# Shouldn't be needed, but just in case:
rm -f static-nodes.json genesis.json
