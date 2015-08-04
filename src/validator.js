var config = require('./config.js')

module.exports = {
    validateFn: {
        nonnegative: function (fieldConfig, number) {
            var isValid = /^[1-9]+[0-9]*$/.test(number)
            fieldConfig.invalid = !isValid
            fieldConfig.remind = isValid ? config.validate.valid : config.validate.invalidNum
            return isValid
        },
        bool: function (fieldConfig, bool) {
            fieldConfig.invalid = false
            fieldConfig.remind = config.validate.valid
            return true
        },
        text: function (fieldConfig, text) {
            fieldConfig.invalid = false
            fieldConfig.remind = config.validate.valid
            return true
        },
        img: function (fieldConfig, image) {
            if (!image) {
                fieldConfig.remind = config.validate.invalidImg
                return false
            } else if (image.type.slice(0, 5) !== 'image') {
                fieldConfig.remind = config.validate.invalidImg
                return false
            } else if (image.size > config.MAX_IMG_SIZE) {
                fieldConfig.remind = config.validate.invalidImageSize
                return false
            }
            fieldConfig.remind = config.validate.valid
            return true
        },
        url: function (fieldConfig, url) {
            var re = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp:/~\+#]*[\w\-\@?^=%&amp/~\+#])?/
            var isValid = url.indexOf(' ') < 0 && re.test(url)
            fieldConfig.invalid = !isValid
            fieldConfig.remind = isValid ? config.validate.valid : config.validate.invalidUrl
            return isValid
        },
        price: function (fieldConfig, price) {
            if (price !== '' && (isNaN(Number(price)) || Number(price) <= 0)) {
                fieldConfig.invalid = true
                fieldConfig.remind = config.validate.invalidPrice
                return false
            }
            return true
        },
        time: function (time) {
            if (!time) {
                return false
            }
            var hourAndMin = time.split(':')
            if (hourAndMin.length !== 2) {
                return false
            }
            var hour = Number(hourAndMin[0])
            if (isNaN(hour) || hour > 23 || hour < 0) {
                return false
            }
            var min = Number(hourAndMin[1])
            if (isNaN(min) || min > 59 || hour < 0) {
                return false
            }
            return true
        },
        duration: function (duration) {
            duration.startInvalid = false
            duration.endInvalid = false

            var isTime = true
            if (!this.time(duration.start)) {
                duration.startInvalid = true
                isTime = false
            }

            if (!this.time(duration.end)) {
                duration.endInvalid = true
                isTime = false
            }

            if (!isTime) {
                duration.remind = config.validate.invalidTime
                return false
            }

            var hAndM1 = duration.start.split(':')
            var hAndM2 = duration.end.split(':')
            var h1 = +hAndM1[0]
            var h2 = +hAndM2[0]
            var m1 = +hAndM1[1]
            var m2 = +hAndM2[1]

            if ((h1 > h2) || (h1 === h2 && m1 > m2)) {
                duration.startInvalid = true
                duration.endInvalid = true
                duration.remind = config.validate.invalidDuration
                return false
            } else {
                duration.remind = config.validate.valid
                return true
            }
        },
        city: function (fieldConfig, cityIds) {
            var isValid = cityIds && (cityIds.length > 0)
            fieldConfig.invalid = !isValid
            fieldConfig.remind = isValid ? config.validate.valid : config.validate.invalidCity
            return isValid
        }
    },
    validate: function (fieldConfig, value, option) {
        if (fieldConfig.must && !value) {
            fieldConfig.invalid = true
            fieldConfig.remind = config.validate.empty
            return false
        } else if (!value) {
            fieldConfig.invalid = false
            fieldConfig.remind = config.validate.valid
            return true
        } else {
            return (this.validateFn[fieldConfig.format])(fieldConfig, value)
        }
    },
    validateImg: function (fieldConfig, picUrl, picSource) {
        if (!picUrl && !picSource) {
            fieldConfig.invalid = true
            fieldConfig.remind = config.validate.empty
            return false
        } else if (!picUrl && picSource) {
            fieldConfig.remind = config.validate.valid
            return true
        } else {
            return this.validateFn.img(fieldConfig, picUrl)
        }
    },
    validateAll: function (typeConfig, item) {
        var isAllValid = true
        var me = this
        var formData = new FormData()
        if (item.id) {
            formData.append('id', item.id)
        }

        $.each(typeConfig, function (i, fieldConfig) {
            if (fieldConfig.field === 'date') {
                formData.append('start_time', item.start_time)
                formData.append('end_time', item.end_time)
                return
            }
            if (fieldConfig.field === 'active_time') {
                var durations = []
                if (!item.active_time) {
                    isAllValid = false
                    return
                }
                $.each(item.active_time, function (i, duration) {
                    if (!me.validateFn.duration(duration)) {
                        isAllValid = false
                    }
                    durations.push(duration.start + '~' + duration.end)
                })

                formData.append('active_time', durations.join(','))
                return
            }

            if (fieldConfig.field === 'picUrl') {
                if (!me.validateImg(fieldConfig, item.picUrl, item.pic_url)) {
                    isAllValid = false
                }
                formData.append('pic_url', item.picUrl || '')
                return
            }

            if (fieldConfig.field === 'activeCityIds') {
                if (!me.validate(fieldConfig, item.activeCityIds)) {
                    isAllValid = false
                }
                if (item.activeCityIds.length === F.context('allCitiesNum')) {
                    formData.append('active_city', 0)
                } else {
                    formData.append('active_city', item.activeCityIds)
                }
                return
            }
            if (!me.validate(fieldConfig, item[fieldConfig.field])) {
                isAllValid = false
            }
            formData.append(fieldConfig.field, item[fieldConfig.field] || '')
        })

        if (!isAllValid) {
            formData = null
        }
        return formData
    }
}
