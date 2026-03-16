module.exports = (value) => {
  if (!value || typeof value !== 'string') {
    return 'max'
  }
  return value === 'asc' ? 'min' : 'max'
}
