<template>
    <div id="offline-dialog" class="modal fade" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times</span></button>
                    <h4 class="modal-title">确认下线？</h4>
                </div>
                <div class="modal-body">
                    <button type="button" class="gray-btn" data-dismiss="modal">取消</button>
                    <button type="button" class="confirm-btn primary-btn" v-attr="disabled:disabled"
                            v-on="click:confirmOffline">确定
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
        props: ['operationId'],
        data: function () {
            return {
                operationId: '',
                disabled: false
            }
        },
        methods: {
            confirmOffline: function () {
                var me = this
                me.disabled = true
                $.ajax({
                    url: config.url.UPDATE_STATUS_URL,
                    method: 'post',
                    dataType: 'json',
                    data: {
                        id: me.operationId,
                        opt: 'offline'
                    }
                }).done(function (res) {
                    if (res.errno != config.statusCode.SUCCESS) {
                        util.permissionForbidden(res)
                    } else {
                        $('#offline-dialog').modal('hide')
                        me.disabled = false
                        util.successHint('恭喜你，下线操作成功啦')
                        window.location.reload()
                    }
                }).fail(function (xhr, error) {
                    $('#offline-dialog').modal('hide')
                    me.disabled = false
                    util.errorHandler('', '通过下线失败了哦o(╯□╰)o')
                })
            }
        }
    }
</script>