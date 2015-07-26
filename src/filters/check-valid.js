var validateFn = require('../validator.js').validateFn

module.exports = function (value, format) {
    return validateFn[format].call(value)
}