<template>
    <div id="delete-dialog" class="modal fade" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times</span></button>
                    <h4 class="modal-title">确认删除？</h4>
                </div>
                <div class="modal-body">
                    <button type="button" class="gray-btn" data-dismiss="modal">取消</button>
                    <button type="button" class="confirm-btn primary-btn" v-attr="disabled:disabled"
                            v-on="click:confirmDelete">确定
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var config = require('../../config.js')
    var util = require('../../util.js')
    var $ = require('jquery')

    module.exports = {
        el: '#delete-dialog',
        props: ['operationId'],
        data: function () {
            return {
                operationId: '',
                disabled: false
            }
        },
        methods: {
            confirmDelete: function () {
                var me = this
                me.disabled = true
                $.ajax({
                    url: config.url.UPDATE_STATUS_URL,
                    method: 'post',
                    dataType: 'json',
                    data: {
                        id: me.operationId,
                        opt: 'delete'
                    }
                }).done(function (res) {
                    if (res.errno != config.statusCode.SUCCESS) {
                        util.permissionForbidden(res)
                    } else {
                        $(me.$el).modal('hide')
                        me.disabled = false
                        util.successHint('恭喜你，删除操作成功啦')
                        window.location.reload()
                    }
                }).fail(function (xhr, error) {
                    $(me.$el).modal('hide')
                    me.disabled = false
                    util.errorHandler('', '删除操作失败了哦o(╯□╰)o')
                })
            }
        }
    }
</script>