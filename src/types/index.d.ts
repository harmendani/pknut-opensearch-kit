/**
 * Type definitions for pknut-opensearch-kit
 */

export interface SearchParams {
  index: string
  body: {
    query: any
    track_scores: boolean
    sort: any[]
    size: number | string
    from: number
  }
}

/**
 * Flat search params format for modern clients (ES 8.x+ / OpenSearch 2.x+).
 * Query parameters are at the top level — no `body` wrapper.
 */
export interface FlatSearchParams {
  index: string
  query: any
  track_scores: boolean
  sort: any[]
  size: number | string
  from: number
}

export interface SearchResult {
  hits?: {
    hits: any[]
    total: {
      value: number
      relation: string
    }
  }
  [key: string]: any
}

export interface QueryBuilderConfig {
  index: string
}

export interface CommanderFactoryConfig {
  index: string
}

/**
 * Stack type determines which client and query format to use.
 * - 'legacy'           : ES 7.x / OpenSearch 1.x — use `build()` for `{ index, body }` format
 * - 'opensearch'       : OpenSearch 2.x+ / 3.x+ — use `buildFlat()` for flat params format
 * - 'elasticsearch-v8' : Elasticsearch 8.x+      — use `buildFlat()` for flat params format
 */
export type StackType = 'legacy' | 'opensearch' | 'elasticsearch-v8'

export interface OpenSearchConfig {
  host: string
  options?: {
    maxRetries?: number
    requestTimeout?: number
    sniffInterval?: number | boolean
    sniffOnStart?: boolean
    [key: string]: any
  }
}

export interface CreateClientOptions {
  stack?: StackType
}

export interface QueryObject {
  [key: string]: any
}

export interface BoolQuery {
  bool?: {
    must?: any[]
    filter?: any[]
    should?: any[]
    must_not?: any[]
  }
}

export interface SortCriteria {
  [key: string]: {
    order: 'asc' | 'desc'
    mode?: 'min' | 'max' | 'avg' | 'sum' | 'median'
  }
}

export interface Command {
  execute(builder: any): void
}

export type BuiltInQueryConstructor = new (values: any[]) => Command
