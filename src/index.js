/**
 * Exports the main classes for the library.
 *
 * The `OpenSearch` class handles the connection to OpenSearch (or Elasticsearch) and provides the search method
 * The `CommanderFactory` class is used to build and manage complex queries with various clauses and configurations.
 *
 * Usage:
 * const { OpenSearch, CommanderFactory } = require('pknut-opensearch-kit');
 */
module.exports = require('./factory')
