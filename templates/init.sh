#!/bin/bash

qd=/qdata
mkdir -p $qd/{logs,constellation/keys}
mkdir -p $qd/dd/{geth,keystore}
touch $qd/passwords.txt

echo -n '_NODEKEY_' > $qd/dd/geth/nodekey
echo -n '_TMPUB_' > $qd/constellation/keys/tm.pub
echo -n '_TMKEY_' > $qd/constellation/keys/tm.key
echo -n '_ACCOUNT_KEY_' > $qd/dd/keystore/_ACCOUNT_
cat << EOF > $qd/tm.conf
_TMCONF_
EOF
cat << EOF > $qd/dd/static-nodes.json
_STATIC_NODES_
EOF
cat << EOF > $qd/genesis.json
_GENESIS_
EOF
cat << EOF > $qd/start.sh
_SCRIPT_
EOF

chmod 755 $qd/start.sh
