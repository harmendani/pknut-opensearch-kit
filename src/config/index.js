/** file: defaultConfig.js */
module.exports = Object.freeze(
  {
    openSearchDefault: {
      maxRetries: 3,
      requestTimeout: 60 * 1000 * 5, // 5 min in ms
      sniffInterval: false, // Auto managed Cluster as AWS do not accept this feature
      sniffOnStart: false // Auto managed Cluster as AWS do not accept this feature
    }
  }
)
