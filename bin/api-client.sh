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
    echo "TODO: Insert Stock"
} 

readstock () {
    echo "TODO: Read Stock"
}

stockreport () {
    jqfilter='[.[] | {
Ticker: .Ticker,
Company: .Company,
Sector: .Sector,
Industry: .Industry,
Price: .Price
}]'
    if [[ -f $1 && "${1##*.}" == "json" ]]; then
        tickerjson="$(tr '\n' ' ' < "$1")"
    else
        tickerjson="$1"
    fi
    if ! [[ "$tickerjson" =~ $jsonpattern ]]; then
        echo "Invalid JSON"
        return
    fi
    echo "Running stock report on $tickerjson"
    curl -H "Content-Type: application/json" -X POST -d "$tickerjson" -s \
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
