#!/usr/bin/env node

const config = require('../config.json')

/**
 * Initialize the MongoClient
 *
 * @param {object} conf - a Config object with connection URI component info
 * @returns {MongoClient} - a MongoClient object initialized with the config
 */
function initClient (conf = config) {
  const MongoClient = require('mongodb').MongoClient
  const url = (
    'mongodb://' +
    `${conf.connectURI.user}:${conf.connectURI.pass}` + // Authentication creds
    `@${conf.connectURI.host}:${conf.connectURI.port}` + // Host name and port
    `/?authSource=${conf.connectURI.auth}` // Authentication db
  )

  const client = new MongoClient(url, { useUnifiedTopology: true })

  return client
}

exports.initClient = initClient
