#!/bin/bash

#### Configuration options #############################################
. ip.cfg

image=quorum
GETH='/usr/local/bin/geth'
BOOTNODE='/usr/local/bin/bootnode'
CONSTELLATION='/usr/local/bin/constellation-node'

########################################################################

nnodes=${#ips[@]}

if [[ $nnodes < 2 ]]
then
    echo "ERROR: There must be more than one node IP address."
    exit 1
fi

./cleanup.sh

uid=`id -u`
gid=`id -g`
pwd=`pwd`

#### Create directories for each node's configuration ##################
echo '[1] ~~~> Configuring for '$nnodes' nodes.'

n=1
for ip in ${ips[*]}
do
    qd=qdata_$n
    mkdir -p $qd/{logs,constellation/keys}
    mkdir -p $qd/dd/geth

    let n++
done


#### Make static-nodes.json and store keys #############################
echo
echo '[2] ~~~> Creating Enodes and static-nodes.json.'

echo "[" > static-nodes.json
n=1
for ip in ${ips[*]}
do
    qd=qdata_$n
    nodekey_file='/qdata/dd/geth/nodekey'

    # Generate the node's Enode and key
    enode=`docker run \
      -u $uid:$gid \
      -v $pwd/$qd:/qdata \
      --rm \
      $image \
      /bin/bash -c "$BOOTNODE -genkey $nodekey_file; \
      $BOOTNODE -nodekey $nodekey_file -writeaddress"`

    # Add the enode to static-nodes.json
    enode_url='enode://'$enode'@'$ip':30303?discport=0&raftport=23000'
    sep=`[[ $n < $nnodes ]] && echo ","`
    echo ' "'$enode_url'"'$sep >> static-nodes.json

    let n++
done
echo "]" >> static-nodes.json


#### Create accounts, keys and genesis.json file #######################
echo
echo '[3] ~~~> Creating Ether accounts and genesis.json.'

cat > genesis.json <<EOF
{
  "alloc": {
EOF

n=1
for ip in ${ips[*]}
do
  qd=qdata_$n

  # Generate an Ether account for the node
  touch $qd/passwords.txt
  account=`docker run \
    -u $uid:$gid \
    -v $pwd/$qd:/qdata \
    --rm \
    $image \
    $GETH \
    --datadir=/qdata/dd \
    --password /qdata/passwords.txt \
    account new | cut -c 11-50`

  # Add the account to the genesis block so it has some Ether at start-up
  sep=`[[ $n < $nnodes ]] && echo ","`
  cat >> genesis.json <<EOF
    "${account}": {
      "balance": "1000000000000000000000000000"
    }${sep}
EOF

  let n++
done

cat >> genesis.json <<EOF
  },
  "coinbase": "0x0000000000000000000000000000000000000000",
  "config": {
    "homesteadBlock": 0
  },
  "difficulty": "0x0",
  "extraData": "0x",
  "gasLimit": "0x2FEFD800",
  "mixhash": "0x00000000000000000000000000000000000000647572616c65787365646c6578",
  "nonce": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp": "0x00"
}
EOF


#### Make node list for tm.conf ########################################

nodelist=
n=1
for ip in ${ips[*]}
do
    sep=`[[ $ip != ${ips[0]} ]] && echo ","`
    nodelist=${nodelist}${sep}'"http://'${ip}':9000/"'
    let n++
done


#### Complete each node's configuration ################################
echo
echo '[4] ~~~> Creating Quorum keys and finishing configuration.'

n=1
for ip in ${ips[*]}
do
  qd=qdata_$n

  cat templates/tm.conf \
    | sed s/_NODEIP_/${ips[$((n-1))]}/g \
    | sed s%_NODELIST_%$nodelist%g \
    > $qd/tm.conf

  cp genesis.json $qd/genesis.json
  cp static-nodes.json $qd/dd/static-nodes.json

  # Generate Quorum-related keys (used by Constellation)
  docker run \
    -u $uid:$gid \
    -v $pwd/$qd:/qdata \
    --rm \
    $image \
    $CONSTELLATION \
    --workdir=/qdata/constellation/keys \
    --generatekeys=tm < /dev/null > /dev/null
  echo 'Node '$n' public key: '`cat $qd/constellation/keys/tm.pub`

  cp templates/start.sh $qd/start.sh
  chmod 755 $qd/start.sh

  let n++
done
rm -rf genesis.json static-nodes.json


#### Create the docker-compose file ####################################
echo
echo '[5] ~~~> Creating docker-compose file.'

cat > docker-compose.yml <<EOF
version: '3'
services:
EOF

n=1
for ip in ${ips[*]}
do
  qd=qdata_$n

  cat >> docker-compose.yml <<EOF
  node_$n:
    image: $image
    volumes:
      - './$qd:/qdata'
    networks:
      quorum_net:
        ipv4_address: '$ip'
    ports:
      - $((n+22000)):8545
    user: '$uid:$gid'
EOF

  let n++
done

cat >> docker-compose.yml <<EOF

networks:
  quorum_net:
    driver: bridge
    ipam:
      driver: default
      config:
      - subnet: $subnet
EOF

#### Create pre-populated contracts ####################################
echo
echo '[6] ~~~> Generating sample contract scripts.'

mkdir scripts

# Private contract - insert Node 2 as the recipient
cat templates/contract_pri.js \
  | sed s:_NODEKEY_:`cat qdata_2/constellation/keys/tm.pub`:g \
  > scripts/contract_pri.js

# Public contract - no change required
cp templates/contract_pub.js scripts/
cp templates/contract_act.js scripts/

### Setup init script ################################################
./geninit.sh

#### Create the k8s yaml file ####################################
echo
echo '[7] ~~~> Creating kubernetes definition yaml.'

n=1
for ip in ${ips[*]}
do
  qd=qdata_$n
  pad='          '

  cat $qd/init.sh \
    | sed "s/^/$pad/" \
    | sed '/^[[:space:]]*$/d' \
    > init.sh
  echo "$pad/qdata/start.sh" >> init.sh

  cat templates/kubernetes.yaml \
    | sed "s;_NODE_ID_;$n;g" \
    | sed "s;_NODE_IP_;$ip;g" \
    | sed '/_NODE_SCRIPT_/r init.sh' \
    | sed '/_NODE_SCRIPT_/d' \
    >> kubernetes.yaml

  rm init.sh
  let n++
done
