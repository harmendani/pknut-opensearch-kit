module.exports = value => {
  if (!value || typeof value !== 'string') {
    return 'asc'
  }
  return value.toLowerCase() === 'desc' ? 'desc' : 'asc'
}
