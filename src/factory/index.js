const { Client: LegacyClient } = require('@elastic/elasticsearch')
const { Client: ModernClient } = require('@opensearch-project/opensearch')
const { openSearchDefault } = require('../config')
const { openSearchService } = require('../services')
const factory = require('./factory')

// Legacy setup: ES 7.x / OpenSearch 1.x (uses { index, body: {...} } query format)
const LegacyOpenSearchService = openSearchService({ Client: LegacyClient, openSearchDefault })
const legacyDependencies = { OpenSearchService: LegacyOpenSearchService }

// Modern setup: ES 8.x+ / OpenSearch 2.x+ (uses flat { index, query, ... } format)
const ModernOpenSearchService = openSearchService({ Client: ModernClient, openSearchDefault })
const modernDependencies = { OpenSearchService: ModernOpenSearchService }

/**
 * Returns a factory configured for the specified stack.
 *
 * @param {Object} [options={}]
 * @param {'legacy'|'opensearch'|'elasticsearch-v8'} [options.stack='legacy']
 *   - 'legacy'           : ES 7.x / OpenSearch 1.x — use `build()` for query params
 *   - 'opensearch'       : OpenSearch 2.x+ / 3.x+ — use `buildFlat()` for query params
 *   - 'elasticsearch-v8' : Elasticsearch 8.x+    — use `buildFlat()` for query params
 * @returns {{ OpenSearch: Function, CommanderFactory: Function }}
 */
function createClient ({ stack = 'legacy' } = {}) {
  if (stack === 'opensearch' || stack === 'elasticsearch-v8') {
    return factory(modernDependencies)
  }
  return factory(legacyDependencies)
}

module.exports = {
  ...factory(legacyDependencies),
  createClient
}
