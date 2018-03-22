# quorum-consortium
Create quorum based consortium, run it by Docker-compose & Kubernetes

## Dependencies
* `docker`
* `kubectl`
* `minikube`

## Installation
~~~shell
git clone https://github.com/ATNIO/quorum-consortium.git
cd quorum-consortium
docker build -t quorum . -f quorum.Dockerfile .
docker build -t explorer-ui -f ui.Dockerfile .
~~~

## Usage

### Docker-compose
Edit `ip.cfg`, enable the config for docker and disable the kubernetes one
~~~shell
./setup.sh
docker-compose up -d
~~~
Then `geth attach http://0.0.0.0:22001` and copy code in `scripts/contract_pri.js`, paste it to the console to create a private contract.

### Kubernetes
Edit `ip.cfg`, enable the config for kubernetes and disable the other one
~~~shell
./setup.sh
minikube start
kubectl create -f consortium.yaml,explorer.yaml
~~~
Now you have a local consortium cluster running inside minikube.

### Try on testnet
Our consortium chain is now living on the `GCP Kubernetes Engine`, named [consortiumchain](https://console.cloud.google.com/kubernetes/list?project=consortiumchain).
* Consortium chain explorer url:
~~~shell
http://35.229.221.95:5000/
~~~
* Consortium node rpc urls:
~~~shell
# node-1
http://35.189.163.25:8545
# node-2
http://35.201.215.219:8545
# node-3
http://35.229.229.248:8545
~~~
* Consortium node public keys:
~~~shell
# node-1
hMaN1moDsF0woutJDVm/gYenxzoPblWOtUsITZCnPH0=
# node-2
W3/wJdmOdtDl8Vn78i+m35V3tlS0wXd1g0/9EONv4Vc=
# node-3
K55ODn4F9sY9wAQDHYuUlEwRFCV7eSFenJbKv+Np+Q0=
~~~
You may play with them in this way:
* Public contract creation
~~~shell
geth --exec 'loadScript("scripts/contract_pub.js")' attach http://35.189.163.25:8545
~~~
* Private contract creation
~~~shell
geth --exec 'loadScript("scripts/contract_pri.js")' attach http://35.189.163.25:8545
~~~
Now open [http://35.229.221.95:5000/](http://35.229.221.95:5000/) on your web explorer to explorer blocks & transactions.
