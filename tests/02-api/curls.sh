#!/usr/bin/env bash

curl \
    -H "Content-Type: application/json" \
    -X POST \
    -d @create.json \
    'http://localhost:3000/api/create'
echo ""

curl 'http://localhost:3000/api/read?business_name=ACME+TEST+INC.'
echo ""
curl 'http://localhost:3000/api/update?id=10011-2017-TEST&result=Violation+Issued'
echo ""
curl 'http://localhost:3000/api/update?id=10011-2017'
echo ""
curl 'http://localhost:3000/api/update?id=10011-2017-TEST&result=Violation+Issued&test=bad'
echo ""
curl 'http://localhost:3000/api/delete?id=10011-2017-TEST'
echo ""
