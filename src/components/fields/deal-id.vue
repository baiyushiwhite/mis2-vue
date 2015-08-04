<template>
    <input type="text" v-model="editItem.dealId" v-on="change:fetchItem"/>
    <img class="right-loading" v-class="hidden:loaded" src="../../static/img/loading.gif"/>
</template>

<script>
    var config = require('../../config.js')
    var validator = require('../../validator.js')
    var $ = require('jquery')
    var util = require('../../util.js')

    module.exports = {
        replace: true,
        props: ['editItem'],
        data: function () {
            return {
                editItem: {
                    id: '',
                    dealId: '',
                    position: '',
                    explanation: ''
                },
                fieldConfig: {},
                loaded: true
            }
        },
        methods: {
            fetchItem: function () {
                console.log('dealid', this.editItem.dealId)

                var me = this;
                var dealId = me.editItem.dealId
                me.loaded = false
                $.ajax({
                    url: config.url.GET_ITEM_LIST_URL,
                    method: 'get',
                    dataType: 'json',
                    data: {
                        dealId: dealId
                    }
                }).done(function (res) {
                    if(res.errno == config.statusCode.NOT_LOGIN) {
                        window.location.replace(config.url.HOME_URL)
                    } else {
//                        if (!res || !res.data || res.data.length < 1) {
//                            me.loaded = true
//                            return
//                        }
                        debugger
                        var data = res.data
                        data = {
                            id: 1,
                            position: 2,
                            black: true,
                            explanation: 'explatdsf',
                            pic_url: 'http://baidu.com',
                            link_url: 'http://bai.com',
                            title: 'tile',
                            desc: 'desc',
                            current_price: '12',
                            market_price: '23',
                            start_time: '2015-04-22',
                            end_time: '2015-09-22',
                            active_time: [
                                {
                                    start: '00:00',
                                    end: '22:00'
                                }
                            ],
                            active_city: [
                                {
                                    areaId: '1000100',
                                    areaName: '北京'
                                }
                            ]
                        }
                        me.loaded = true

                        me.editItem = data
                    }
                }).fail(function (xhr, error) {
                    util.errorHandler(undefined, '获取团单信息失败')
                    me.loaded = true
                })
            }
        }
    }
</script>