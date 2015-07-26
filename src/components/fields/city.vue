<template>
    <div class="col-md-10 city-field">
        <img class="loading" v-class="hidden:loaded" src="../../static/img/loading.gif">
        <p class="hint">已选择<span class="selected-city-num" v-class="invalid:fieldConfig.invalid">{{activeCityIds.length}}</span>个城市</p>
        <p class="hint">热门城市</p>
        <div class="hot-city-panel city-panel">
            <label>
                <input class="choose-all"
                       type="checkbox"
                       v-model="allHotCitiesSelected"
                       v-on="click:checkAllHotCity($event)">全选
            </label>
            <ul class="hot-city-list city-list" v-on="click:checkBox($event)">
                <label v-repeat="city:hotCities">
                    <input class="city-checkbox"
                           v-model="activeCityIds.indexOf(city.areaId) + 1"
                           type="checkbox" value="{{city.areaId}}">{{city.shortName}}
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
            <ul class="all-city-list city-list" v-on="click:checkBox($event)">
                <li v-repeat="allCities">
                    <p>{{$key}}</p>

                    <label v-repeat="city:$value">
                        <input class="city-checkbox"
                               v-model="activeCityIds.indexOf(city.areaId) + 1"
                               type="checkbox" value="{{city.areaId}}">{{city.shortName}}
                    </label>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    var $ = require('jquery')
    var config = require('../../config.js')
    var util = require('../../util.js')

    module.exports = {
        replace: true,
        props: ['activeCity', 'activeCityIds', 'fieldConfig'],
        data: function () {
            return {
                activeCity: [],
                activeCityIds: [],
                hotCities: [],
                allCities: {},
                allCitiesNum: 0,
                fieldConfig: {},
                loaded: false
            }
        },
        computed: {
            allHotCitiesSelected: function () {
                var me = this
                if (me.hotCities.length > me.activeCityIds.length) {
                    return false
                } else {
                    var isAll = true
                    $.each(me.hotCities, function (i, city) {
                        if (me.activeCityIds.indexOf(city.areaId) < 0) {
                            isAll = false
                            return isAll
                        }
                    })
                    return isAll
                }
            },
            allCitiesSelected: function () {
                return this.activeCityIds.length === this.allCitiesNum
            }
        },
        watch: {
            'activeCity': function () {
                this.initActiveCity()
            }
        },
        methods: {
            initAllCitiesNum: function () {
                var count = 0
                $.each(this.allCities, function (key, value) {
                    $.each(value, function (i, city) {
                        count++
                    })
                })
                this.allCitiesNum = count
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
                        me.allCities = res.data.list
                        me.hotCities = res.data.cityhot
                        me.loaded = true
                        me.initAllCitiesNum()
                    }
                }).fail(function () {
                    me.loaded = true
                    util.errorHandler(undefined, '获取城市列表失败')
                })
            },
            removeCity: function (cityId) {
                var index = this.activeCityIds.indexOf(cityId)
                if (index >= 0) {
                    this.activeCityIds.splice(index, 1)
                }
            },
            addCity: function (cityId) {
                if (this.activeCityIds.indexOf(cityId) < 0) {
                    this.activeCityIds.push(cityId)
                }
            },
            checkBox: function (e) {
                var $target = $(e.target)
                if (e.target.tagName === 'INPUT') {
                    var cityId = $target.val()
                    if ($target.prop('checked')) {
                        this.addCity(cityId)
                    }
                    else {
                        this.removeCity(cityId)
                    }
                }
            },
            checkAllHotCity: function (e) {
                var me = this
                if ($(e.target).prop('checked')) {
                    $.each(this.hotCities, function (i, city) {
                        me.addCity(city.areaId)
                    })
                }
                else {
                    $.each(this.hotCities, function (i, city) {
                        me.removeCity(city.areaId)
                    })
                }
            },
            checkAllCity: function (e) {
                var me = this
                if ($(e.target).prop('checked')) {
                    $.each(this.allCities, function (key, value) {
                        $.each(value, function (i, city) {
                            me.addCity(city.areaId)
                        })
                    })
                }
                else {
                    $.each(this.allCities, function (key, value) {
                        $.each(value, function (i, city) {
                            me.removeCity(city.areaId)
                        })
                    })
                }
            }
        },
        created: function () {
            this.initActiveCity()
            if (!this.loaded) {
                this.loadCity()
            }
        }
    }
</script>
