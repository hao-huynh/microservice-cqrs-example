#!/usr/bin/env bash
#TODO asserts

SERVICE_URL=http://localhost:3000
#SERVICE_URL=https://jyweivteb1.execute-api.us-east-1.amazonaws.com/dev

echo "Create Order:"
curl -H "Content-Type: application/json" -d '{"restaurant":"KMS-HS"}' ${SERVICE_URL}/orders
echo
sleep 1

echo "Get Orders:"
echo ${SERVICE_URL}/orders
curl -H "Content-Type: application/json" ${SERVICE_URL}/orders
echo

