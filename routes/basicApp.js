#!/usr/bin/env node

const express = require('express')
const basicApp = express.Router()

function serverTime () {
  const time = new Date()
  const dateJSON = {
    date: `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`,
    time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  }
  return JSON.stringify(dateJSON)
}

basicApp.get('/currentTime', (req, res) => res.send(serverTime()))

basicApp.get('/hello', (req, res) => {
  const response = { hello: req.query.name }
  res.send(JSON.stringify(response, null, 2) + '\n')
})

basicApp.post('/strings', (req, res) => {
  console.log(req.body)
  const response = {
    first: req.body.string1,
    second: req.body.string2
  }
  res.send(JSON.stringify(response, null, 2) + '\n')
})

module.exports = basicApp
