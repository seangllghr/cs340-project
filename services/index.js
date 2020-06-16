#!/usr/bin/env node

async function createService (doc) {
  // TODO: Create service logic
  console.log(doc)
}

async function readService (query) {
  // TODO: Read service logic
  console.log(query)
}

async function updateService (query, newValue) {
  // TODO: Update service logic
  console.log(query)
  console.log(newValue)
}

async function deleteService (query) {
  // TODO: Delete service logic
  console.log(query)
}

module.exports = {
  createService: createService,
  readService: readService,
  updateService: updateService,
  deleteService: deleteService
}
