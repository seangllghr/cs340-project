#!/bin/bash

companyportfolio () {
    echo "TODO: Company Portfolio"
}

deletestock () {
    if [[ $# -eq 1 ]]; then
        ticker=$(echo "$1" | tr '[:lower:]' '[:upper:]')
    else
        read -rp 'Ticker: ' ticker
    fi
    curl -X DELETE "http://localhost:3000/api/v1.0/deleteStock/$ticker" -s
    echo ""
}

industryreport () {
    jqfilter='[.[] | {
Ticker: .Ticker,
Company: .Company,
Sector: .Sector,
Industry: .Industry,
Price: .Price,
"Analyst Recom": ."Analyst Recom"
}]'
    industry=$(uriencode "$1")
    curl -s "http://localhost:3000/api/v1.0/industryReport/$industry" |
        jq -cr "$jqfilter" |
        yq read --prettyPrint --colors -
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
        inputjson=$(yq read --tojson "$1") || exit 1
    else
        inputjson=$(echo "$1" | yq read --tojson -) || exit 1
    fi
}

printhelp () {
    echo "This program is offered as a rudimentary frontend for accessing
the stocks API. Input is either as unformatted string or JSON- or YAML-formatted
document (which can be passed inline at the command line or loaded from a file).
Strings passed on the command line should be single-quoted.

Usage: stock-client delete [ticker]
       stock-client industry-report [industry]
       stock-client insert <JSON/YAML stock document>
       stock-client read [ticker]
       stock-client stock-report <JSON/YAML ticker list>
       stock-client update <ticker> <JSON/YAML update document>"
}

readstock () {
    ticker=$(echo "$1" | tr '[:lower:]' '[:upper:]')
    curl "http://localhost:3000/api/v1.0/readStock/$ticker" -s |
        yq read --prettyPrint --colors - |
        less
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
    ticker=$(echo "$1" | tr '[:lower:]' '[:upper:]')
    loadjson "$2"
    curl -H "Content-Type: application/json" -X PUT -d "$inputjson" -s \
        "http://localhost:3000/api/v1.0/updateStock/$ticker"
    echo ""
}

uriencode () { jq -nr --arg v "$1" '$v|@uri'; }

if [[ $# -lt 1 || $# -gt 3 ]]; then
    echo "Incorrect number of arguments"
    printhelp
    exit 1
elif [[ $# -eq 2 ]]; then
    input=$2
fi
case $1 in
    "company-portfolio")
        companyportfolio "$input"
        ;;
    "delete")
        deletestock "$input"
        ;;
    "industry-report")
        if ! [[ $# -eq 2 ]]; then read -rp 'Industry: ' input; fi
        industryreport "$input"
        ;;
    "insert")
        insertstock "$input"
        ;;
    "read")
        if ! [[ $# -eq 2 ]]; then read -rp 'Ticker: ' input; fi
        readstock "$input"
        ;;
    "stock-report")
        stockreport "$input"
        ;;
    "update")
        if ! [[ $# -eq 3 ]]; then
            echo "Incorrect number of arguments"
            printhelp
            exit 1
        fi
        updatestock "$2" "$3"
        ;;
    "help")
        printhelp
        ;;
    *)
        echo "Unrecognized command. Aborting"
        ;;
esac
