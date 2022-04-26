const fs = require('fs-extra')

/**
 * appends a new kv pair
 * @param {string} filepath 
 * @param {Object} npair 
 */
exports.add = (filepath, [key, value]) => {
  try {
    let data = this.from(filepath);
    data[key] = value;
    fs.writeFileSync(filepath, JSON.stringify(data), 'utf8')
  } catch (err) {
    console.error(err);
  }
}

/**
 * gets value from key
 * @param {string} filepath 
 * @param {any} key 
 */
exports.get = (filepath, key) => {
  try {
    let data = this.from(filepath)
    return data[key]
  } catch (err) {
    console.error(err)
  }
}

/**
 * extracts the JSON array within the filepath
 * @param {string} filepath 
 * @returns any[]
 */
exports.from = (filepath) => {
  try {
    return JSON.parse(fs.readFileSync(filepath), 'utf8')
  } catch (err) {
    console.error(err)
    return {}
  }
}