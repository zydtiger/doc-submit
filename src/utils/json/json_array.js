const fs = require('fs-extra')

/**
 * appends a new element at the array end
 * @param {string} filepath 
 * @param {any} nelem 
 */
exports.push = (filepath, nelem) => {
  try {
    let data = this.from(filepath)
    data.push(nelem)
    fs.writeFileSync(filepath, JSON.stringify(data), 'utf8')
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
    return []
  }
}

function findObjectContains(objArr, target) {
  for (let i in objArr)
    if (Object.values(objArr[i]).includes(target)) return i;
}

/**
 * removes the element that has target in its Object.values()
 * @param {string} filepath 
 * @param {any} val 
 */
exports.removeObjectContains = (filepath, val) => {
  try {
    let data = this.from(filepath)
    let targetIndex = findObjectContains(data, val)
    data = [...data.slice(0, targetIndex), ...data.slice(targetIndex + 1)]
    fs.writeFileSync(filepath, JSON.stringify(data), 'utf8')
  } catch (err) {
    console.error(err)
  }
}

/**
 * removes the element that is equal to target
 * @param {string} filepath 
 * @param {any} target 
 */
exports.remove = (filepath, target) => {
  try {
    let data = this.from(filepath)
    let targetIndex = data.indexOf(target)
    data = [...data.slice(0, targetIndex), ...data.slice(targetIndex + 1)]
    fs.writeFileSync(filepath, JSON.stringify(data), 'utf8')
  } catch (err) {
    console.error(err)
  }
}

/**
 * finds the index of the specified target
 * @param {string} filepath 
 * @param {any} target 
 */
exports.indexOf = (filepath, target) => {
  try {
    let data = this.from(filepath)
    return data.indexOf(target)
  } catch (err) {
    console.error(err)
  }
}

/**
 * replaces the value at index with nval
 * @param {string} filepath 
 * @param {number} index 
 * @param {any} nval 
 */
exports.edit = (filepath, index, nval) => {
  try {
    let data = this.from(filepath)
    data[index] = nval
    fs.writeFileSync(filepath, JSON.stringify(data), 'utf8')
  } catch (err) {
    console.error(err);
  }
}