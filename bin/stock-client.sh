#!/bin/bash

companyportfolio () {
    echo "TODO: Company Portfolio"
}

deletestock () {
    if [[ $# -eq 1 ]]; then
        ticker=$1
    else
        read -rp 'Ticker: ' ticker
    fi
    curl -X DELETE "http://localhost:3000/api/v1.0/deleteStock/$ticker" -s
    echo ""
}

industryreport () {
    echo "TODO: Industry Report"
}

insertstock () {
    loadjson "$1"
    ticker=$(echo "$inputjson" | jq -cr '.Ticker')
    curl -H "Content-Type: application/json" -X POST -d "$inputjson" -s \
        "http://localhost:3000/api/v1.0/createStock/$ticker"
}

loadjson () {
    # I spent hours trying to do this with regex. It mostly worked, except when
    # it didn't. This is my rage-flip and quit solution. Serendipitously, it
    # allows the client to accept input in both YAML and JSON.
    if [[ -f $1 ]]; then
        inputjson=$(yq read --tojson $1) || exit 1
    else
        inputjson=$(echo $1 | yq read --tojson -) || exit 1
    fi
}

readstock () {
    if [[ $# -eq 1 ]]; then
        ticker=$1
    else
        read -rp 'Ticker: ' ticker
    fi
    curl "http://localhost:3000/api/v1.0/readStock/$ticker" -s |
        yq read --prettyPrint --colors -
}

stockreport () {
    jqfilter='[.[] | {
Ticker: .Ticker,
Company: .Company,
Sector: .Sector,
Industry: .Industry,
Price: .Price
}]'
    loadjson "$1"
    echo "Running stock report on $inputjson"
    curl -H "Content-Type: application/json" -X POST -d "$inputjson" -s \
        'http://localhost:3000/api/v1.0/stockReport' |
        jq -cr "$jqfilter" |
        yq read --prettyPrint --colors -
}

updatestock () {
    ticker=$1
    loadjson "$2"
    echo "Ticker: $ticker Update JSON: $inputjson"
    curl -H "Content-Type: application/json" -X PUT -d "$inputjson" -s \
        "http://localhost:3000/api/v1.0/updateStock/$ticker"
    echo ""
}

case $1 in
    "company-portfolio")
        companyportfolio "$2"
        ;;
    "delete")
        deletestock "$2"
        ;;
    "industry-report")
        industryreport "$2"
        ;;
    "insert")
        insertstock "$2"
        ;;
    "read")
        readstock "$2"
        ;;
    "stock-report")
        stockreport "$2"
        ;;
    "update")
        updatestock "$2" "$3"
        ;;
    "help")
        echo "This program is offered as a rudimentary frontend for accessing
the stocks API. It supports the following options:
"
        echo "  api-client stock-report <JSON string or file>"
        ;;
    *)
        echo "Unrecognized command. Aborting"
        ;;
esac
