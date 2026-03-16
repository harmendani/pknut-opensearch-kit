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
