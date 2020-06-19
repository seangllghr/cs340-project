#!/usr/bin/env node

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
 * Parses a JSON stream into a native object
 * @param {Object} stream - a readable stream
 * @returns {Object} - the object parsed from the stream
 */
async function jsonStreamToObj (stream) {
  const jsonString = await streamToString(stream)
  return JSON.parse(jsonString)
}

module.exports = {
  streamToString: streamToString,
  jsonStreamToObj: jsonStreamToObj
}
