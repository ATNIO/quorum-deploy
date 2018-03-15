#!/bin/bash

for n in {1..3}
do
  qd=qdata_$n

  nodekey=$(<$qd/dd/geth/nodekey)
  tmpub=$(<$qd/constellation/keys/tm.pub)
  tmkey=$(<$qd/constellation/keys/tm.key)
  tmconf=$qd/tm.conf
  staticnodes=$qd/dd/static-nodes.json
  genesis=$qd/genesis.json
  script=$qd/start.sh
  account=`ls $qd/dd/keystore | head -n 1`
  accountkey=$(<$qd/dd/keystore/$account)

  cat templates/init.sh \
    | sed "s;_ACCOUNT_KEY_;$accountkey;" \
    | sed "s;_ACCOUNT_;$account;" \
    | sed "s;_NODEKEY_;$nodekey;" \
    | sed "s;_TMPUB_;$tmpub;" \
    | sed "s;_TMKEY_;$tmkey;" \
    | sed "/_TMCONF_/r $tmconf" \
    | sed "/_TMCONF_/d" \
    | sed "/_STATIC_NODES_/r $staticnodes" \
    | sed "/_STATIC_NODES_/d" \
    | sed "/_GENESIS_/r $genesis" \
    | sed "/_GENESIS_/d" \
    | sed "/_SCRIPT_/r $script" \
    | sed "/_SCRIPT_/d" \
    | sed  '54,83s/\$GETH/\\\$GETH/g' \
    | sed  '54,83s/\$CONSTELLATION/\\\$CONSTELLATION/g' \
    | sed  '54,83s/\$TMCONF/\\\$TMCONF/g' \
    > $qd/init.sh

    chmod 755 $qd/init.sh
done
