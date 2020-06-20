#!/usr/bin/env node

const mongo = require('mongodb')

/**
 * Reads a readable stream and transforms it into a string
 * @param {Object} stream - a readable stream
 * @returns {string} - a UTF8 string
 */
function streamToString (stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

/**
 * Parses a JSON stream into a native object representation of a MongoDB doc
 * @param {Object} stream - a readable stream
 * @returns {Object} - the object parsed from the stream
 */
async function jsonStreamToMongoDoc (stream) {
  const jsonString = await streamToString(stream)
  const mongoObj = JSON.parse(jsonString)
  for (const field in mongoObj) {
    if (typeof mongoObj[field] === 'object') {
      for (const fieldType in mongoObj[field]) {
        if (fieldType === '$oid') {
          mongoObj[field] = new mongo.ObjectID(mongoObj[field][fieldType])
        } else if (fieldType === '$date') {
          mongoObj[field] = new Date(mongoObj[field][fieldType])
        }
      }
    }
  }
  return mongoObj
}

module.exports = {
  streamToString: streamToString,
  jsonStreamToMongoDoc: jsonStreamToMongoDoc
}
