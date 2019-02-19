#!/usr/bin/env bash
#TODO asserts

SERVICE_URL=http://localhost:3000
#SERVICE_URL=https://ixf7ludzhh.execute-api.us-east-1.amazonaws.com/dev

echo "Create Payment:"
curl -H "Content-Type: application/json" -d '{"orderId":"0fc12520-33ee-11e9-9e9c-1970b53c2a83", "status": "PAID"}' ${SERVICE_URL}/payments
echo
sleep 1

echo "Get Payments:"
echo ${SERVICE_URL}/payments
curl -H "Content-Type: application/json" ${SERVICE_URL}/payments
echo

