<template>
    <form class="edit-item-form">
        <fieldset v-repeat="fieldConfig:typeConfig">
            <label class="col-md-2">
                <span v-if="fieldConfig.isOption" class="required">*</span>
                {{fieldConfig.title}}
            </label>
            <template v-if="['position', 'sid'].indexOf(fieldConfig.field) >= 0">
                <input type="text"
                       data-format="number"
                       v-model="item[fieldConfig.field]"
                       class="text-input col-md-5"
                       v-class="required-field:fieldConfig.isOption"
                       placeholder="请输入位置（仅限正整数）"/>
            </template>

            <template v-if="'explanation' === fieldConfig.field">
                <textarea v-model="item[fieldConfig.field]"
                          class="textarea-input col-md-7"
                          v-class="required-field:fieldConfig.isOption"
                          rows="4"
                          placeholder="请输入说明">
                </textarea>
            </template>

            <template v-if="'pic_url' === fieldConfig.field">
                <label for="pic_url" class="gray-btn">上传图片</label>
                <input v-model="item.pic_url"
                       id="pic_url"
                       type="file"
                       class="hidden"
                       v-class="required-field:fieldConfig.isOption"
                       />
                <img src="{{item.pic_url || ''}}" title="{{item.pic_url || ''}}"/>
            </template>

            <template v-if="'link_url' === fieldConfig.field">
                <textarea v-model="item.link_url"
                          data-format="url"
                          class="textarea-input col-md-7"
                          rows="4"
                          placeholder="请输入该团单的跳转地址">
                </textarea>
            </template>

            <template v-if="'date' === fieldConfig.field">
                <component is="date-field" start-time="{{@ item.start_time}}" end-time="{{@ item.end_time}}"></component>
            </template>

            <template v-if="'time' === fieldConfig.field">
                <component is="time-field" item="{{@ item}}"></component>
            </template>
            <span class="reminder"></span>
        </fieldset>

        <button type="button" class="submit-btn primary-btn" v-on="click:submitItem">提交</button>
    </form>
</template>

<script>
    var Config = require('../config.js')

    module.exports = {
        replace: true,
        props: ['item', 'params'],
        data: function () {
            return {
                params: {
                    page: '',
                    type: ''
                },
                item: {}
            }
        },
        computed: {
            typeConfig: function () {
                return Config.editConfig[this.params.page][this.params.type]
            }
        },
        components: {
            'date-field': require('./fields/date.vue'),
            'time-field': require('./fields/time.vue')
        },
        methods: {
            submitItem: function () {
                console.dir(this.item)
            }
        }
    }
</script>

<style lang="less">

</style>