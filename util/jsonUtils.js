#!/usr/bin/env node

const mongo = require('mongodb')

/**
 * MongoDB dumps occasionally contain $oid and $date query fields, which
 * represent native MongoDB ObjectID and JavaScript Date objects, respectively.
 * This function parses an object imported from stringified JSON data and
 * replaces any occurrences of those fields with the respective native objects,
 * because not doing this apparently breaks MongoDB's Node driver in insidious
 * ways.
 *
 * @param {Object} mongoObj - the MongoDB object that may contain special fields
 * @returns {Object} - the object with these fields replaced with real objects
 */
function convertMongoQueryFields (mongoObj) {
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

/**
 * Parses a JSON stream into a native object representation of a MongoDB doc
 * @param {Object} stream - a readable stream
 * @returns {Object} - the object parsed from the stream
 */
async function jsonStreamToMongoDoc (stream) {
  const jsonString = await streamToString(stream)
  let mongoObj = JSON.parse(jsonString)
  mongoObj = convertMongoQueryFields(mongoObj)
  return mongoObj
}

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

module.exports = {
  convertMongoQueryFields: convertMongoQueryFields,
  jsonStreamToMongoDoc: jsonStreamToMongoDoc,
  streamToString: streamToString
}
