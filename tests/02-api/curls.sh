#!/usr/bin/env bash

echo "Testing Create API Endpoint:"
curl \
    -H "Content-Type: application/json" \
    -X POST \
    -d @create.json \
    'http://localhost:3000/api/create'
echo ""

echo "Testing Read API Endpoint:"
curl 'http://localhost:3000/api/read?business_name=ACME+TEST+INC.'
echo ""

echo "Testing Update API Endpoint:"
curl 'http://localhost:3000/api/update?id=10011-2017-TEST&result=Violation+Issued'
echo ""

echo "Verification:"
curl 'http://localhost:3000/api/read?business_name=ACME+TEST+INC.'
echo ""

echo "Testing Delete API Endpoint:"
curl 'http://localhost:3000/api/delete?id=10011-2017-TEST'
echo ""

echo "Verification:"
curl 'http://localhost:3000/api/read?business_name=ACME+TEST+INC.'
echo ""
