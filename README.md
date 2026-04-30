# pkNUT-OpenSearch-Kit

![Version](https://img.shields.io/badge/version-0.1.0-orange.svg)
![NodeJS](https://img.shields.io/badge/NodeJS-16+-blue.svg)
![Tests](https://img.shields.io/badge/TestCoverage-100-greenlight.svg)

## Description  

This library provides an easy-to-use interface for querying data from an OpenSearch or Elasticsearch instance. It exports two main classes: `OpenSearch` and `CommanderFactory`. These classes work together to construct and execute complex search queries seamlessly.

The library supports **legacy** (ES 7.x / OpenSearch 1.x) and **modern** (ES 8.x+ / OpenSearch 2.x+) client stacks.

### 🍔 Tech Stack  

- [NodeJS 16+](https://nodejs.org/dist/latest-v16.x/docs/api/)

### 🛠 Installation  

- Download the project locally
- Go to the next steps to import the source file

### 🛠 Building and Executing a Query  

Here's a complete example demonstrating the setup, configuration, and execution of a query:

```
// Required Imports
const { OpenSearch, CommanderFactory } = require('./src');

 ```

 1. Set up the OpenSearch client  

```
const client = new OpenSearch({
host: 'http://localhost:9200'
});
 ```

 2. Create an instance of CommanderFactory  

 ```
const commanderFactory = new CommanderFactory({ index: 'my_index' });
 ```


 3. Configure your query using CommanderFactory  

```
 // Example: Adding filters and a custom query
commanderFactory.addFilter({ type: 'MOVIE' });
commanderFactory.addCustom({ query: { bool: { should: [{ match: { licenseStart: '2024-01-01' } }] } } });
```

 4. Set additional query properties  

```
commanderFactory.setTrackScore(true); // Enable score tracking
 ```

 5. Build and execute the query  

```
const finalQuery = commanderFactory.build();
client.search(finalQuery)
```

### 🆕 Modern Stack (OpenSearch 2.x+ / Elasticsearch 8.x+)

For newer client versions the `body` wrapper was removed from search parameters.
Use `createClient()` to get a `CommanderFactory` that **automatically** produces the right format — just call `build()` as normal:

```js
const { createClient } = require('./src');

// Choose your stack:
//   'opensearch'       → @opensearch-project/opensearch (OpenSearch 2.x+ / 3.x+)
//   'elasticsearch-v8' → @elastic/elasticsearch v8 (ES 8.x+)
const { OpenSearch, CommanderFactory } = createClient({ stack: 'opensearch' });

const client = new OpenSearch({ host: 'http://localhost:9200' });

// build() automatically produces the right format for the configured stack
const query = new CommanderFactory({ index: 'my_index' })
  .addFilter([{ term: { status: 'active' } }])
  .setSize(20)
  .build(); // ← { index, query, sort, ... } — automatically flat, no body wrapper

const results = await client.search(query);
console.log(results.hits.hits);
```

> **How `build()` works by stack:**
>
> | Stack | Client used | `build()` output |
> |---|---|---|
> | `'opensearch'` (default) | `@opensearch-project/opensearch` 3.x | `{ index, query, ... }` |
> | `'elasticsearch-v8'` | `@elastic/elasticsearch` 8.x | `{ index, query, ... }` |
>
> `buildFlat()` is also available as an explicit override that always returns the flat format regardless of stack.

### 📦 Classes Overview  

#### OpenSearch

The OpenSearch class handles the connection to the OpenSearch (or Elasticsearch) instance and provides a search method to execute queries.

```
const { OpenSearch } = require('./src');  

const client = new OpenSearch({host, options})

client.search(query)
```

->> Configuration  

The default configuration (`openSearchDefault`) includes the properties:  

- maxRetries: 5 - Maximum number of retries for failed requests.
- requestTimeout: 60 * 1000` - Request timeout (1 minute).
- sniffInterval: false - Interval for sniffing (60 minutes).
- sniffOnStart: false - Perform sniffing on new connection startup.

You can override these settings by passing custom options when creating an instance of OpenSearch. Sniffing does not work when used auto-managed cluster

```  
const { OpenSearch  } = require('./src');  

const client = new OpenSearch({
host: 'http://localhost:9200',
options: {
maxRetries: 10,
requestTimeout: 120 * 1000
}
});
```

#### CommanderFactory  

The CommanderFactory class uses the Command Pattern to manage the query.  
You can use the "add" methods to handling the clauses or even to use "set" methods to setup your query as you wish.  

#### Add methods  

`addBuiltInQueries(BuiltInQueryClass)` - Adds the built-in queries
`addFilter(filter)` - Adds a filter clause
`addMust(condition)` - Adds a must clause
`addShould(condition)` - Adds a should clause
`addSort(sort)` - Adds a sort clause  
`addCustom(query)` - Adds a custom query directly

#### Set methods

`setSize(size)` - Sets the number of results  
`setFrom(from)` - Sets the starting point for results  
`setTrackScore(isTracked)` - Enables or disables score tracking  
`setIndex(index)` - Sets the index name  

#### The build methods  

`build()` — Constructs the final query from the stored commands. The output format is **automatically determined** by the stack you configured in `createClient()`:
- **Modern stacks** (`opensearch`, `elasticsearch-v8`): returns flat `{ index, query, sort, ... }` — no `body` wrapper
- When used directly (without `createClient`): also defaults to flat format

`buildFlat()` — Always returns flat format `{ index, query, sort, ... }`, regardless of configured stack. Use as an explicit override.

```js
const { createClient } = require('./src');

// Modern stack — build() is already smart
const { CommanderFactory } = createClient({ stack: 'opensearch' });
const query = commanderFactory.build(); // { index, query, sort, ... }
```

#### createClient({ stack })

Returns a `{ OpenSearch, CommanderFactory }` factory configured for the given stack.
`CommanderFactory.build()` automatically produces the right format — no need to choose manually.

| `stack` value | Client used | `build()` format |
|---|---|---|
| `'opensearch'` (default) | `@opensearch-project/opensearch` 3.x | `{ index, query, ... }` |
| `'elasticsearch-v8'` | `@elastic/elasticsearch` 8.x | `{ index, query, ... }` |

### ⚡ Built-In Queries  (on going)

Example Built-In Query: HashKey command

```
const { builtInQueries: {HashKey}} = require('./src');

// Assuming `commanderFactory` is an instance of `CommanderFactory`
commanderFactory.addBuiltInQueries(HashKey, values = ['3333-1111-0000']);
```

### 🧪 Testing  

To run tests, use:

```
npm run test
```

### 📜 Code Style  

To lint code:

```
npm run lint
```

## FAQ  

Q: How do I customize the connection options for OpenSearch?

A: You can pass custom options when creating an instance of OpenSearch. This allows you to override default settings such as `maxRetries`, `requestTimeout`, and others.

Q: How do I extend the built-in queries or create a query from scratch?

A: Create a new class that follows the structure of the built-in queries and pass it to `CommanderFactory`. Use `require('./src/')` to import the queries easily. Alternatively, create a customized query to `CommanderFactory.addCustom({customQuery})`.

Q: How can I configure query properties like sort, size, and custom queries?

A: You can use methods in `CommanderFactory` to set additional query properties:  

  `setSize(size)`: Sets the number of results.
  `setFrom(from)`: Sets the starting point for results.
  `setSort(sortCriteria)`: Sets sorting criteria.
  `setTrackScore(isTracked)`: Enables or disables score tracking.

Q: What are the default values for a QueryBuilder instance?

A QueryBuilder instance is initialized with the following default values:

  `sort = []` - No sorting criteria by default.
  `track_scores = false` - Score tracking is disabled by default.
  `size = '100'` - Default number of results to return.
  `from = 0` - Default starting point for results.

Q: Do I need to call build after altering query properties?

A: Yes, whenever you make changes using methods like `setSize`, `setTrackScore`, etc., you need to call `build()` to update the query with these changes.  
The build method constructs the query with the updated properties while preserving the rest of the query configuration.  

Q: Which build method should I use?

A: Just call `build()` — it automatically produces the right format for the stack you configured in `createClient()`. For modern stacks (`opensearch`, `elasticsearch-v8`), `build()` returns flat params `{ index, query, ... }`. If you need to explicitly force the flat format (e.g., without `createClient`), use `buildFlat()`.
