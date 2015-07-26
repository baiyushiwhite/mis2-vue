<template>
    <label for="pic-url" class="gray-btn">上传图片</label>
    <input v-on="change:validateImg($event)"
           id="pic-url"
           type="file"
           class="hidden"/>

    <img class="preview-image" v-attr="src:picSource, title:picSource"/>
</template>

<script>
    var validator = require('../../validator.js')

    module.exports = {
        replace: true,
        props: ['picSource', 'picUrl', 'fieldConfig'],
        data: function () {
            return {
                picSource: '',
                picUrl: '',
                fieldConfig: {}
            }
        },
        methods: {
            validateImg: function (event) {
                var input = event.target
                var me = this
                if (input.files && input.files[0]) {
                    var reader = new FileReader()
                    reader.onload = function (e) {
                        me.picUrl = input.files[0]
                        if (validator.validateImg(me.fieldConfig, me.picUrl, me.picSource)) {
                            me.picSource = e.target.result
                        } else {
                            me.picUrl = ''
                            me.picSource = ''
                        }
                    }
                    reader.readAsDataURL(input.files[0])
                }
            }
        }
    }
</script>