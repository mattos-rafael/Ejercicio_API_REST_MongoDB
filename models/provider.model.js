const mongoose = require('mongoose')
require('../config/db_mongo')

const providerSchema = {
  company_name: {
    type: String,
    required: [true, 'company name is required']
  },
  CIF: {
    type: String,
    required: [true, 'CIF is required']
  },
  address: {
    type: String,
    required: [true, 'address is required']
  },
  url_web: {
    type: String
  }
}

const Provider = mongoose.model("Provider", providerSchema)

module.exports = Provider