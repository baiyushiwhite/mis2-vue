<template>
    <div id="edit-dialog" class="modal fade edit-modal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">编辑</h4>
                </div>
                <div class="modal-body">
                    <form class="edit-item-form">
                        <fieldset v-repeat="fieldConfig:typeConfig">
                            <label class="col-md-2">
                                <span v-if="fieldConfig.must" class="required">*</span>
                                {{fieldConfig.title}}
                            </label>

                            <template v-if="'dealId' === fieldConfig.field">
                                <input type="text" class="text-input col-md-5" v-model="editItem.dealId" v-on="change:fetchItem"/>
                                <img class="right-loading" v-class="hidden:loaded" src="../static/img/loading.gif"/>
                            </template>

                            <template v-if="'black' === fieldConfig.field">
                                <select v-model="editItem.black" v-on="change:validate(fieldConfig)">
                                    <option value="1">是</option>
                                    <option value="0">否</option>
                                </select>
                            </template>

                            <template v-if="['position', 'sid'].indexOf(fieldConfig.field) >= 0">
                                <input type="text"
                                       v-model="editItem[fieldConfig.field]"
                                       v-on="change:validate(fieldConfig)"
                                       v-class="invalid:fieldConfig.invalid"
                                       class="text-input col-md-5"
                                       placeholder="请输入位置（仅限正整数）"/>
                            </template>

                            <template v-if="'explanation' === fieldConfig.field">
                            <textarea v-model="editItem[fieldConfig.field]"
                                      v-on="change:validate(fieldConfig)"
                                      class="textarea-input col-md-7"
                                      v-class="invalid:fieldConfig.invalid"
                                      rows="4"
                                      placeholder="请输入说明">
                            </textarea>
                            </template>

                            <!-- ugly::由于原值pic_url的格式和最终提交的数据不一致，因此需要另一个变量picUrl来上传-->
                            <template v-if="'picUrl' === fieldConfig.field">
                                <component is="image" pic-source="{{editItem.pic_url}}" pic-url="{{@ editItem.picUrl}}"
                                           field-config="{{@ fieldConfig}}"></component>
                            </template>

                            <template v-if="'link_url' === fieldConfig.field">
                            <textarea v-model="editItem.link_url"
                                      v-on="change:validate(fieldConfig)"
                                      class="textarea-input col-md-7"
                                      v-class="invalid:fieldConfig.invalid"
                                      rows="4"
                                      placeholder="请输入该团单的跳转地址">
                            </textarea>
                            </template>

                            <template v-if="'title' === fieldConfig.field">
                            <textarea v-model="editItem[fieldConfig.field]"
                                      v-on="change:validate(fieldConfig)"
                                      class="textarea-input col-md-7"
                                      v-class="invalid:fieldConfig.invalid"
                                      rows="2"
                                      placeholder="请输入团单标题">
                            </textarea>
                            </template>

                            <template v-if="'desc' === fieldConfig.field">
                            <textarea v-model="editItem[fieldConfig.field]"
                                      v-on="change:validate(fieldConfig)"
                                      class="textarea-input col-md-7"
                                      v-class="invalid:fieldConfig.invalid"
                                      rows="4"
                                      placeholder="请输入该团单描述">
                            </textarea>
                            </template>

                            <template v-if="'current_price' === fieldConfig.field">
                                <input type="text"
                                       v-model="editItem[fieldConfig.field]"
                                       v-on="change:validate(fieldConfig)"
                                       class="price text-input col-md-5"
                                       v-class="invalid:fieldConfig.invalid"
                                       placeholder="请输入该团单价格(元)，非负数" />
                            </textarea>
                            </template>

                            <template v-if="'market_price' === fieldConfig.field">
                                <input type="text"
                                       v-model="editItem[fieldConfig.field]"
                                       v-on="change:validate(fieldConfig)"
                                       class="price text-input col-md-5"
                                       v-class="invalid:fieldConfig.invalid"
                                       placeholder="请输入该团单原价(元)，非负数" />
                                </textarea>
                            </template>

                            <template v-if="'date' === fieldConfig.field">
                                <component is="date-field" start-time="{{@ editItem.start_time}}"
                                           end-time="{{@ editItem.end_time}}"></component>
                            </template>

                            <template v-if="'active_time' === fieldConfig.field">
                                <component is="time-field" active-time="{{@ editItem.active_time}}"></component>
                            </template>

                            <!-- ugly::由于原值active_city的格式和最终提交的数据不一致，因此需要另一个变量activeCityIds来上传-->
                            <template v-if="'activeCityIds' === fieldConfig.field">
                                <component is="city"
                                           active-city="{{editItem.active_city}}"
                                           active-city-ids="{{@ editItem.activeCityIds}}"
                                           field-config="{{fieldConfig}}"></component>
                            </template>
                            <span v-if="fieldConfig.remind" class="reminder">{{fieldConfig.remind}}</span>
                        </fieldset>
                    </form>
                </div>
                <div class="modal-footer center-block">
                    <button type="button" class="gray-btn" data-dismiss="modal">取消</button>
                    <button id="banner-submit-btn" type="button" class="submit-btn primary-btn"
                            v-attr="disabled: disabled" v-on="click:submitItem">提交
                    </button>
                </div>
            </div>
    </div></div>
</template>

<script>
    var config = require('../config.js')
    var validator = require('../validator.js')
    var $ = require('jquery')
    var util = require('../util.js')
    module.exports = {
        replace: true,
        props: ['editItem', 'params'],
        data: function () {
            return {
                params: {
                    page: '',
                    type: ''
                },
                editItem: {
                    active_time: [],
                    start_time: '',
                    end_time: '',
                    activeCityIds: [],
                    desc: '',
                    position: '',
                    dealId: '',
                    black: '',
                    explanation: '',
                    picUrl: '',
                    link_url: '',
                    title: '',
                    current_price: '',
                    market_price: ''
                },
                typeConfig: [],
                disabled: false,
                loaded: true
            }
        },
        watch: {
            'params': function () {
                this.typeConfig = $.extend(true, [], config.editConfig[this.params.page][this.params.type])
            },
            'editItem': function () {
                this.typeConfig = $.extend(true, [], config.editConfig[this.params.page][this.params.type])
            }
        },
        ready: function () {
            this.typeConfig = $.extend(true, [], config.editConfig[this.params.page][this.params.type])
        },
        components: {
            'date-field': require('./fields/date.vue'),
            'time-field': require('./fields/time.vue'),
            'city': require('./fields/city.vue'),
            'image': require('./fields/img.vue')
        },
        methods: {
            validate: function (fieldConfig) {
                validator.validate(fieldConfig, this.editItem[fieldConfig.field])
            },
            fetchItem: function () {
                var me = this;
                var dealId = me.editItem.dealId
                me.loaded = false
                $.ajax({
                    url: config.url.GET_DETAIL_ITEM,
                    method: 'get',
                    dataType: 'json',
                    data: {
                        dealId: dealId
                    }
                }).done(function (res) {
                    if(res.errno == config.statusCode.NOT_LOGIN) {
                        window.location.replace(config.url.HOME_URL)
                    } else {
                        if (!res || !res.data || res.data.length < 1) {
                            me.loaded = true
                            return
                        }

                        /**
                         * 好坑爹，一定要这么把editItem赋值为一个新对象。。。反过来用data extend editItem不行
                         */
                        var data = res.data
                        for (var key in me.editItem) {
                            if (me.editItem.hasOwnProperty(key) && !data.hasOwnProperty(key)) {
                                if (key === 'pic_url' && data.pic_url) {
                                    data.picUrl = ''
                                } else {
                                    data[key] = me.editItem[key]
                                }
                            }
                        }
                        me.editItem = data
                        me.loaded = true
                    }
                }).fail(function (xhr, error) {
                    util.errorHandler(undefined, '获取团单失败')
                    me.loaded = true
                })
            },
            submitItem: function () {
                var me = this
                var formData = validator.validateAll(this.typeConfig, me.editItem)
                if (formData) {
                    formData.append('pagetype', this.params.page)
                    formData.append('ideatype', this.params.type)

                    me.disabled = true
                    $.ajax({
                        url: config.url.UPDATE_ITEM_URL,
                        method: 'post',
                        processData: false,
                        contentType: false,
                        data: formData,
                        dataType: 'json'
                    }).done(function (res) {
                        if (res.errno != config.statusCode.SUCCESS) {
                            util.permissionForbidden(res);
                        } else {
                            util.successHint('恭喜你，提交成功啦');
                            window.location.reload()
                        }
                        me.disabled = false
                    }).fail(function (xhr, error) {
                        me.disabled = false
                    })
                }
            }
        }
    }
</script>
