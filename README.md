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
