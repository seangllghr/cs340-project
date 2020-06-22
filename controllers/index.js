const basic = require('./basic')
const stocks = require('./stocks')

module.exports = {
  createController: basic.createController,
  readController: basic.readController,
  updateController: basic.updateController,
  deleteController: basic.deleteController,
  stocks: stocks
}
