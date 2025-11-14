# Pkgo-OpenSearch

![Version](https://img.shields.io/badge/version-0.1.0-orange.svg)
![NodeJS](https://img.shields.io/badge/NodeJS-16+-blue.svg)
![Tests](https://img.shields.io/badge/TestCoverage-100-greenlight.svg)

## Description  

This library provides an easy-to-use interface for querying data from an OpenSearch instance. It exports two main classes: `OpenSearch` and `CommanderFactory`. These classes work together to construct and execute complex search queries seamlessly.

### 🍔 Tech Stack  

- [NodeJS 16+](https://nodejs.org/dist/latest-v16.x/docs/api/)
- [ElasticSearch 7.10.0](https://www.elastic.co/guide/en/elasticsearch/reference/7.10/release-notes-7.10.0.html)

### 🛠 Installation  

To set up the app we config 'cli:login' on your pkg and then, run:

```
npm install @scope/pkgo-opensearch
```

### 🛠 Building and Executing a Query  

Here's a complete example demonstrating the setup, configuration, and execution of a query:

```
// Require Imports
const { OpenSearch, CommanderFactory } = require('./src');

// Optional imports to use builtIn features
const { builtInQueries: { HashKey, ReleaseYear } } = require('./src/');
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

 3. Add built-in or custom queries  

 ```
commanderFactory.addBuiltInQueries(ReleaseYear, values = [2024]);
```

 4. Configure your query using CommanderFactory  

```
 // Example: Adding filters and a custom query
commanderFactory.addFilter({ type: 'MOVIE' });
commanderFactory.addCustom({ query: { bool: { should: [{ match: { licenseStart: '2024-01-01' } }] } } });
```

 5. Set additional query properties  

```
commanderFactory.setTrackScore(true); // Enable score tracking
 ```

 6. Build and execute the query  

```
const finalQuery = commanderFactory.build();
client.search(finalQuery)
```

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

#### The build method  

`build()` - Constructs the final query from the stored commands. Returns an object in the format `{ index, body }`.  

```
const { CommanderFactory } = require('./src');

// Build and execute the query
const finalQuery = commanderFactory.build();
```

### ⚡ Built-In Queries  

The library includes several built-in query classes ready for use.  
These handle common search operations and can be extended or customized.  
Example Built-In Query: ReleaseYear

```
const { builtInQueries: {ReleaseYear} } = require('./src');

// Assuming `commanderFactory` is an instance of `CommanderFactory`
commanderFactory.addBuiltInQueries(ReleaseYear, values = [2023]);
```

Example Built-In Query: HashKey

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
The `build()` method will construct the query with the updated properties while preserving the rest of the query configuration.  
