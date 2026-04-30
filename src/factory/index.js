const { Client: ElasticSearchV8Client } = require('@elastic/elasticsearch')
const { Client: OpenSearchClient } = require('@opensearch-project/opensearch')
const { openSearchDefault } = require('../config')
const { openSearchService } = require('../services')
const factory = require('./factory')

// OpenSearch stack: @opensearch-project/opensearch (OS 2.x+ / 3.x+)
const OpenSearchDependencies = {
  OpenSearchService: openSearchService({ Client: OpenSearchClient, openSearchDefault })
}

// Elasticsearch v8+ stack: @elastic/elasticsearch (ES 8.x+)
const ElasticSearchV8Dependencies = {
  OpenSearchService: openSearchService({ Client: ElasticSearchV8Client, openSearchDefault })
}

/**
 * Returns a factory configured for the specified stack.
 * Both stacks use flat query params — use `buildFlat()` instead of `build()`.
 *
 * @param {Object} [options={}]
 * @param {'opensearch'|'elasticsearch-v8'} [options.stack='opensearch']
 *   - 'opensearch'       : OpenSearch 2.x+ / 3.x+  — uses @opensearch-project/opensearch
 *   - 'elasticsearch-v8' : Elasticsearch 8.x+       — uses @elastic/elasticsearch v8
 * @returns {{ OpenSearch: Function, CommanderFactory: Function }}
 */
function createClient ({ stack = 'opensearch' } = {}) {
  if (stack === 'elasticsearch-v8') {
    return factory(ElasticSearchV8Dependencies)
  }
  return factory(OpenSearchDependencies)
}

module.exports = {
  ...factory(OpenSearchDependencies),
  createClient
}
