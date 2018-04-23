var address = "";
var toKeys = [""]

var abi = [{"constant":true,"inputs":[],"name":"storedData","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"initVal","type":"uint256"}],"type":"constructor"}];

var private = eth.contract(abi).at(address)

function get() {
  return private.get()
}

function set(val) {
  return private.set(val, {
    from: eth.coinbase,
    privateFor: toKeys,
    gas: 4700000
  })
}
