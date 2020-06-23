#!/bin/bash

companyportfolio () {
    echo "TODO: Company Portfolio"
}

deletestock () {
    echo "TODO: Delete Stock"
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
    jsonpattern='^\[(".*",[[:space:]])*".*"\]$'
    if [[ -f $1 && "${1##*.}" == "json" ]]; then
        inputjson="$(tr '\n' ' ' < "$1")"
    else
        inputjson="$1"
    fi
    if ! [[ "$inputjson" =~ $jsonpattern ]]; then
        echo "Invalid JSON"
        exit 1
    fi
}

readstock () {
    read -rp 'Ticker: ' ticker
    curl "http://localhost:3000/api/v1.0/readStock/$ticker" |
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
    echo "TODO: Update Stock"
}

case $1 in
    "company-portfolio")
        companyportfolio "$2"
        ;;
    "delete-stock")
        deletestock "$2"
        ;;
    "industry-report")
        industryreport "$2"
        ;;
    "insert-stock")
        insertstock "$2"
        ;;
    "read-stock")
        readstock "$2"
        ;;
    "stock-report")
        stockreport "$2"
        ;;
    "update-stock")
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
