const { Client } = require('@elastic/elasticsearch')
const { openSearchDefault } = require('../config')
const { openSearchService } = require('../services')
const OpenSearchService = openSearchService({ Client, openSearchDefault })

const dependencies = {
  OpenSearchService
}
module.exports = require('./factory')(dependencies)
