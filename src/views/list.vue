<template>
    <div id="{{params.type}}-section" class="section">
        <div id="{{params.type}}-info" class="info-section inner-section clearfix">
            <span class="glyphicon glyphicon-bookmark" aria-hidden="true"></span>
            <span class="title">{{params.type}}区域</span>
            <a class="create-btn pull-right primary-btn" href="#/create/{{params.page}}/{{params.type}}" data-type="{{params.type}}" data-target="#{{params.type}}-edit-dialog">新建内容</a>
        </div>
        <img class="loading center-block" src="../static/img/loading.gif"/>
        <div class="list-section inner-section">
            <table class="list-table">
                <thead>
                <tr>
                    <th v-repeat="typeConfig" width="{{width}}" class="t-head">{{title}}</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-repeat="item:list" v-component="item" type-config="{{typeConfig}}" show-item="{{@ showItem}}"></tr>
                </tbody>
            </table>
            <component is="pagination" total="{{total}}" params="{{params}}"></component>
        </div>
    </div>

    <div id="view-dialog" class="modal fade detail-modal" role="dialog">
        <component is="detail" show-item="{{showItem}}"></component>
    </div>
</template>

<script>
    var Config = require('../config.js')
    var Util = require('../util.js')
    var $ = require('jquery')

    module.exports = {
        replace: true,
        props: ['params'],
        data: function () {
            return {
                params: {
                    page: '',
                    type: '',
                    pn: ''
                },
                typeConfig: [],
                list: [],
                total: 0,
                showItem: {}
            }
        },
        components: {
            item: require('../components/item.vue'),
            pagination: require('../components/pagination.vue'),
            detail: require('../components/detail.vue')
        },
        watch: {
            'params.page': function () {
                this.update()
            },
            'params.type': function () {
                this.update()
            },
            'params.pn': function () {
                this.update()
            }
        },
        methods: {
            update: function () {
                $('.loading').show()
                $('.list-section').hide()
                var page = this.params.page
                var type = this.params.type
                var pn = this.params.pn
                var me = this
                this.typeConfig = Config.listConfig[page][type]
                $.ajax({
                    url: Config.url.GET_ITEM_LIST_URL,
                    method: 'get',
                    dataType: 'json',
                    data: {
                        pagetype: page,
                        ideatype: type,
                        pn: pn,
                        page_size: Config.page.PAGE_SIZE
                    }
                }).done(function (res) {
                    if(res.errno == Config.statusCode.NOT_LOGIN) {
                        window.location.replace(Config.url.HOME_URL)
                    } else {
                        var data = res.data
                        $('.loading').hide()
                        me.list = data.list
                        me.total = data.total
                        $('.list-section').show()
                    }
                }).fail(function (xhr, error) {
                    console.log('fail')
                    Util.errorHandler(undefined, '获取列表失败')
                    $('.loading').hide()
                })
            }
        },
        created: function () {
            this.update()
        }
    }
</script>

<style lang="less">
@import "../static/style/list.less";
</style>
