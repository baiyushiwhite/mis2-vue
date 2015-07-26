<template>
    <div class="section">
        <div class="info-section clearfix">
            <span class="glyphicon glyphicon-bookmark" aria-hidden="true"></span>
            <span class="title">{{params.type}}区域</span>
            <a class="create-btn pull-right primary-btn" data-type="{{params.type}}" v-on="click:showCreate" data-target="#{{params.type}}-edit-dialog">新建内容</a>
        </div>
        <img class="loading center-block" src="../static/img/loading.gif"/>
        <div class="list-section">
            <table class="list-table">
                <thead>
                <tr>
                    <th v-repeat="typeConfig" width="{{width}}" class="t-head">{{title}}</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-repeat="item:list" v-component="item" type-config="{{typeConfig}}" show-item="{{@ showItem}}" edit-item="{{@ editItem}}" operation-id="{{@ operationId}}"></tr>
                </tbody>
            </table>
            <component is="pagination" total="{{total}}" params="{{params}}"></component>
        </div>
    </div>

    <component is="detail" show-item="{{showItem}}"></component>
    <component is="edit" edit-item="{{sourceEditItem}}" params="{{params}}"></component>
    <component is="delete" operation-id="{{operationId}}"></component>
    <component is="approve" operation-id="{{operationId}}"></component>
    <component is="online" operation-id="{{operationId}}"></component>
    <component is="offline" operation-id="{{operationId}}"></component>

</template>

<script>
    var config = require('../config.js')
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
                showItem: {},
                editItem: {},
                operationId: ''
            }
        },
        computed: {
            /*
             * ugly 因为editItem在传递给Item的时候被双向绑定了，在传递给edit的时候也被双向绑定了，导致
             * 在edit模态框里面修改的时候，list的值也改变了。。。真是。。。哎
             */
            sourceEditItem: function () {
                return $.extend(true, {}, this.editItem)
            }
        },
        components: {
            item: require('../components/item.vue'),
            pagination: require('../components/pagination.vue'),
            detail: require('../components/detail.vue'),
            edit: require('../components/edit.vue'),
            delete: require('../components/modal/delete.vue'),
            approve: require('../components/modal/approve.vue'),
            online: require('../components/modal/online.vue'),
            offline: require('../components/modal/offline.vue')
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
            showCreate: function () {
                this.editItem = {}
                $('#edit-dialog').modal('show')
            },
            update: function () {
                $('.loading').show()
                $('.list-section').hide()
                var page = this.params.page
                var type = this.params.type
                var pn = this.params.pn
                var me = this
                this.typeConfig = config.listConfig[page][type]
                $.ajax({
                    url: config.url.GET_ITEM_LIST_URL,
                    method: 'get',
                    dataType: 'json',
                    data: {
                        pagetype: page,
                        ideatype: type,
                        pn: pn,
                        page_size: config.page.PAGE_SIZE
                    }
                }).done(function (res) {
                    if(res.errno == config.statusCode.NOT_LOGIN) {
                        window.location.replace(config.url.HOME_URL)
                    } else {
                        var data = res.data
                        $('.loading').hide()
                        me.list = data.list
                        me.total = data.total
                        $('.list-section').show()
                    }
                }).fail(function (xhr, error) {
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
