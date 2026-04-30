/**
 * Main module type definitions for pknut-opensearch-kit
 */

import {
  OpenSearchConfig,
  SearchParams,
  FlatSearchParams,
  SearchResult,
  CommanderFactoryConfig,
  QueryObject,
  SortCriteria,
  BuiltInQueryConstructor,
  CreateClientOptions
} from './types'

/**
 * OpenSearch class for connecting to and searching an OpenSearch cluster
 */
export class OpenSearch {
  /**
   * Creates an OpenSearch client instance
   * @param config - Configuration object with host and optional settings
   */
  constructor(config: OpenSearchConfig)

  /**
   * Execute a search operation
   * @param params - Search parameters
   * @returns Promise resolving to search results
   */
  search(params?: SearchParams | FlatSearchParams): Promise<SearchResult>
}

/**
 * CommanderFactory class for building complex queries using the Command Pattern
 */
export class CommanderFactory {
  /**
   * Creates a CommanderFactory instance
   * @param config - Configuration object with index name
   */
  constructor(config: CommanderFactoryConfig)

  /**
   * Add a filter clause to the query
   * @param clause - Filter clause object
   * @returns The CommanderFactory instance for chaining
   */
  addFilter(clause: QueryObject): this

  /**
   * Add a must clause to the query
   * @param clause - Must clause object
   * @returns The CommanderFactory instance for chaining
   */
  addMust(clause: QueryObject): this

  /**
   * Add a should clause to the query
   * @param clause - Should clause object
   * @returns The CommanderFactory instance for chaining
   */
  addShould(clause: QueryObject): this

  /**
   * Add a sort clause to the query
   * @param clause - Sort criteria
   * @returns The CommanderFactory instance for chaining
   */
  addSort(clause: SortCriteria): this

  /**
   * Add a custom query directly
   * @param clause - Custom query object
   * @returns The CommanderFactory instance for chaining
   */
  addCustom(clause: QueryObject): this

  /**
   * Add a built-in query class
   * @param BuiltInQuery - Built-in query class constructor
   * @param values - Array of values to pass to the query
   * @returns The CommanderFactory instance for chaining
   */
  addBuiltInQueries(BuiltInQuery: BuiltInQueryConstructor, values: any[]): this

  /**
   * Set the number of results to return
   * @param size - Number of results
   * @returns The CommanderFactory instance for chaining
   */
  setSize(size: number | string): this

  /**
   * Set the starting point for results (pagination)
   * @param from - Starting index
   * @returns The CommanderFactory instance for chaining
   */
  setFrom(from: number): this

  /**
   * Set the index name
   * @param index - Index name
   * @returns The CommanderFactory instance for chaining
   */
  setIndex(index: string): this

  /**
   * Enable or disable score tracking
   * @param isTracked - Whether to track scores
   * @returns The CommanderFactory instance for chaining
   */
  setTrackScore(isTracked: boolean): this

  /**
   * Build and return the final query in legacy format (ES 7.x / OpenSearch 1.x).
   * Returns `{ index, body: { query, sort, ... } }`.
   * @returns The complete query object ready for execution with a legacy client
   */
  build(): SearchParams

  /**
   * Build and return the final query in flat format for modern clients (ES 8.x+ / OpenSearch 2.x+).
   * Returns `{ index, query, sort, ... }` without a `body` wrapper.
   * @returns The complete flat query object ready for execution with a modern client
   */
  buildFlat(): FlatSearchParams
}

/**
 * Built-in query classes
 */
export namespace builtInQueries {
  // Add specific built-in query types here as they are implemented
}

/**
 * Returns a factory (`{ OpenSearch, CommanderFactory }`) configured for the specified stack.
 *
 * @param options.stack
 *   - `'legacy'`           : ES 7.x / OpenSearch 1.x — use `build()` for `{ index, body }` format
 *   - `'opensearch'`       : OpenSearch 2.x+ / 3.x+ — use `buildFlat()` for flat params
 *   - `'elasticsearch-v8'` : Elasticsearch 8.x+      — use `buildFlat()` for flat params
 *
 * @example
 * // Modern OpenSearch setup
 * const { createClient } = require('pknut-opensearch-kit')
 * const { OpenSearch, CommanderFactory } = createClient({ stack: 'opensearch' })
 * const client = new OpenSearch({ host: 'http://localhost:9200' })
 * const query = new CommanderFactory({ index: 'my_index' }).addFilter([...]).buildFlat()
 * client.search(query)
 */
export function createClient(options?: CreateClientOptions): {
  OpenSearch: typeof OpenSearch
  CommanderFactory: typeof CommanderFactory
}

declare const _exports: {
  OpenSearch: typeof OpenSearch
  CommanderFactory: typeof CommanderFactory
  builtInQueries: typeof builtInQueries
  createClient: typeof createClient
}

export = _exports
