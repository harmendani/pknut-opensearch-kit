const stopwords = require('nltk-stopwords')

module.exports = (text) => {
  text = stopwords.remove(text, 'portuguese').replace(/:/g, '')
  text = stopwords.remove(text, 'english').replace(/:/g, '')
  text = stopwords.remove(text, 'spanish').replace(/:/g, '')
  return text
}
