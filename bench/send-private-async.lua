wrk.method = "POST"
wrk.body = '{"jsonrpc":"2.0","method":"eth_sendTransactionAsync","params":[{"from": "oxox", "to": "oxox", "gas": "0x76c0", "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675", "privateFor": ["xxxx"]}],"id":1}'
wrk.headers["Content-Type"] = "application/json"
