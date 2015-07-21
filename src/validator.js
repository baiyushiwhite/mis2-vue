var config = require('./config.js')
module.exports = {
    validateAll: function (typeConfig, item) {

    },
    validateFn: {
        nonnegative: function (number) {
            return /^[1-9]+[0-9]*$/.test(number) ? config.validate.INVALID_NUMBER : config.validate.VALID
        }
    },
    validate: function (fieldConfig, value) {
        if (fieldConfig.isOption && !value) {
            return config.validate.EMPTY
        }
        return (this.validateFn[fieldConfig.format])(value)
    }
}
