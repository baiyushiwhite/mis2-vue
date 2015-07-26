<template>
    <div class="col-md-10 city-field">
        <img class="loading" v-class="hidden:loaded" src="../../static/img/loading.gif">
        <p class="hint">已选择<span class="selected-city-num" v-class="invalid:fieldConfig.invalid && !activeCityIds.length">{{activeCityIds.length}}</span>个城市</p>
        <p class="hint">热门城市</p>
        <div class="hot-city-panel city-panel">
            <label>
                <input class="choose-all" type="checkbox" v-model="allHotCitiesSelected" v-on="click:checkAllHotCity($event)">全选
            </label>
            <ul class="hot-city-list city-list" v-on="click:checkBoxOfHot($event)">
                <label v-repeat="city:hotCities">
                    <input type="checkbox"
                           class="city-checkbox"
                           v-model="city.isCheck"
                           value="{{city.areaId}}">{{city.areaName}}
                </label>
            </ul>
        </div>
        <p class="hint">全部城市</p>
        <div class="all-city-panel city-panel">
            <label>
                <input class="choose-all"
                       type="checkbox"
                       v-model="allCitiesSelected"
                       v-on="click:checkAllCity($event)">全选
            </label>
            <ul class="all-city-list city-list" v-on="click:checkBoxOfAll($event)">
                <li v-repeat="allCities">
                    <p>{{$key}}</p>

                    <label v-repeat="city:$value">
                        <input type="checkbox"
                               class="city-checkbox"
                               v-model="city.isCheck"
                               value="{{city.areaId}}">{{city.areaName}}
                    </label>
                </li>
            </ul>
        </div>
    </div>
    <a v-on="click:test"></a>
    <p v-repeat="item:ab">
    <input type="checkbox" v-model="test[item.l]"/>{{test[item.l]}}
    </p>
</template>

<script>
    var $ = require('jquery')
    var config = require('../../config.js')
    var util = require('../../util.js')

    module.exports = {
        replace: true,
        props: ['activeCity', 'allCityMap', 'fieldConfig'],
        data: function () {
            return {
                activeCity: [],
                activeCityIds: [],
                hotCities: [],
                allCities: {},
                fieldConfig: {},
                loaded: false,
                ab: [],
                test: {a:true, b: false}// 好大的坑
            }
        },
        computed: {
            allHotCitiesSelected: function () {
                for (var i = 0, len = this.hotCities.length; i < len; i++) {
                    if (!this.hotCities[i].isCheck) {
                        return false
                    }
                }
                return true
            },
            allCitiesSelected: function () {
                return this.activeCityIds.length === F.context('allCitiesNum')
            }
        },
        methods: {
            calAllCitiesNum: function () {
                var count = 0
                $.each(F.context('allCities'), function (key, value) {
                    $.each(value, function (i, city) {
                        count++
                    })
                })
                return count
            },
            initActiveCity: function () {
                var me = this
                if (!me.activeCity || me.activeCity.length === 0) {
                    me.activeCity = []
                }

                me.activeCityIds = []
                $.each(me.activeCity, function (i, city) {
                    me.activeCityIds.push(city.areaId)
                })
            },
            loadCity: function () {
                var me = this
                $.ajax({
                    url: config.url.CITY_URL,
                    method: 'get',
                    dataType: 'json'
                }).done(function (res) {
                    if (res.errno != config.statusCode.SUCCESS) {
                        util.permissionForbidden(res)
                    } else {
                        F.context('allCities', res.data.list)
                        F.context('hotCities', res.data.cityhot)
                        F.context('cityLoaded', true)
                        F.context('allCitiesNum', me.calAllCitiesNum())

                        me.initCityMap()
                        me.loaded = true
                    }
                }).fail(function () {
                    me.loaded = true
                    util.errorHandler(undefined, '获取城市列表失败')
                })
            },
            addCityOfAll: function (cityId) {
                this.addCity(cityId)
                $.each(this.allCities, function (key, value) {
                    $.each(value, function (i, city) {
                        if (city.areaId === cityId) {
                            city.isCheck = true
                        }
                    })
                })
            },
            removeCityOfAll: function (cityId) {
                this.removeCity(cityId)
                $.each(this.allCities, function (key, value) {
                    $.each(value, function (i, city) {
                        if (city.areaId === cityId) {
                            city.isCheck = false
                        }
                    })
                })
            },
            addCityOfHot: function (cityId) {
                this.addCity(cityId)
                $.each(this.hotCities, function (i, city) {
                    if (city.areaId === cityId) {
                        city.isCheck = true
                    }
                })
            },
            removeCityOfHot: function (cityId) {
                this.removeCity(cityId)
                $.each(this.hotCities, function (i, city) {
                    if (city.areaId === cityId) {
                        city.isCheck = false
                    }
                })
            },
            addCity: function (cityId) {
                if (this.activeCityIds.indexOf(cityId) < 0) {
                    this.activeCityIds.push(cityId)
                }
            },
            removeCity: function (cityId) {
                var index = this.activeCityIds.indexOf(cityId)
                if (index >= 0) {
                    this.activeCityIds.splice(index, 1)
                }
            },
            checkBoxOfAll: function (e) {
                // 十分的ugly，但是暂时想不出解决方案，checkMap的方案已经深深深深的把我的心摔碎了
                var $target = $(e.target)
                if (e.target.tagName === 'INPUT') {
                    var cityId = $target.val()
                    var check = $target.prop('checked')
                    if (check) {
                        this.addCityOfHot(cityId)
                    }
                    else {
                        this.removeCityOfHot(cityId)
                    }

                }
            },
            checkBoxOfHot: function (e) {
                // 十分的ugly，但是暂时想不出解决方案，checkMap的方案已经深深深深的把我的心摔碎了
                var $target = $(e.target)
                if (e.target.tagName === 'INPUT') {
                    var cityId = $target.val()
                    var check = $target.prop('checked')
                    if (check) {
                        this.addCityOfAll(cityId)
                    }
                    else {
                        this.removeCityOfAll(cityId)
                    }
                }
            },
            checkAllHotCity: function (e) {
                var me = this
                if ($(e.target).prop('checked')) {
                    $.each(me.hotCities, function (i, city) {
                        city.isCheck = true
                        me.addCityOfAll(city.areaId)
                    })
                }
                else {
                    $.each(this.hotCities, function (i, city) {
                        city.isCheck = false
                        me.removeCityOfAll(city.areaId)
                    })
                }
            },
            checkAllCity: function (e) {
                var me = this
                if ($(e.target).prop('checked')) {
                    $.each(me.allCities, function (key, value) {
                        $.each(value, function (i, city) {
                            city.isCheck = true
                            me.addCityOfHot(city.areaId)
                        })
                    })
                }
                else {
                    $.each(me.allCities, function (key, value) {
                        $.each(value, function (i, city) {
                            city.isCheck = false
                            me.removeCityOfHot(city.areaId)
                        })
                    })
                }
            },
            initCityMap: function () {
                var me = this

                me.ab.push({l:'a'})
                me.ab.push({l:'b'})
                me.ab.push({l:'c'})
                me.test['a'] = true
                me.test['b'] = false
                me.test['c'] = false

                $.each(F.context('hotCities'), function (i, city) {
                    me.hotCities.push({
                        areaId: city.areaId,
                        areaName: city.areaName,
                        isCheck: me.activeCityIds.indexOf(city.areaId) >= 0
                    })
                })

                $.each(F.context('allCities'), function (key, value) {
                    me.allCities[key] = me.allCities[key] || []
                    $.each(value, function (i, city) {
                        me.allCities[key].push({
                            areaId: city.areaId,
                            areaName: city.areaName,
                            isCheck: me.activeCityIds.indexOf(city.areaId) >= 0
                        })
                    })
                })
            }
        },
        created: function () {
            this.initActiveCity()
            if (!F.context('cityLoaded')) {
                this.loadCity()
            } else {
                this.initCityMap()
                this.loaded = true
            }
        }
    }
</script>
