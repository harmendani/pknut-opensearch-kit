const createCommanderFactory = require('../models/CommanderFactory')
const OpenSearch = require('../models/OpenSearch')

module.exports = (dependencies) => ({
  OpenSearch: OpenSearch(dependencies),
  CommanderFactory: createCommanderFactory(dependencies)
})
