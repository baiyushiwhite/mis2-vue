<template>
    <!-- item详情 -->
    <div id="view-dialog" class="modal fade detail-modal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">详情查看</h4>
                </div>
                <div class="modal-body">
                    <table>
                        <tbody>
                        <tr>
                            <td class="col-md-2">id</td>
                            <td class="col-md-10">{{showItem.id}}</td>
                        </tr>

                        <tr>
                            <td class="col-md-2">sid</td>
                            <td class="col-md-10">{{showItem.sid}}</td>
                        </tr>

                        <tr>
                            <td class="col-md-2">显示位置</td>
                            <td class="col-md-10">{{showItem.position}}</td>
                        </tr>

                        <tr>
                            <td class="col-md-2">图片</td>
                            <td class="col-md-10"><img v-attr="src:showItem.pic_url, title:showItem.pic_url"></td>
                        </tr>
                        <tr>
                            <td class="col-md-2">跳转地址</td>
                            <td class="col-md-10"><a href="{{showItem.link_url}}"
                                                     target="_blank">{{showItem.link_url}}</a></td>
                        </tr>

                        <tr>
                            <td class="col-md-2">名称</td>
                            <td>{{showItem.name}}</td>
                        </tr>

                        <tr>
                            <td class="col-md-2">标题</td>
                            <td>{{showItem.title}}</td>
                        </tr>

                        <tr>
                            <td class="col-md-2">描述</td>
                            <td>{{showItem.desc}}</td>
                        </tr>

                        <tr>
                            <td class="col-md-2">团购价</td>
                            <td>{{showItem.current_price}}</td>
                        </tr>

                        <tr>
                            <td class="col-md-2">原价</td>
                            <td>{{showItem.market_price}}</td>
                        </tr>

                        <tr>
                            <td class="col-md-2">说明</td>
                            <td>{{showItem.explanation}}</td>
                        </tr>
                        <tr>
                            <td class="col-md-2">投放日期</td>
                            <td>{{showItem.start_time}} - {{showItem.end_time}}</td>
                        </tr>
                        <tr>
                            <td class="col-md-2">投放时间</td>
                            <td>
                                <p v-repeat="duration:showItem.active_time">
                                    {{duration.start}} - {{duration.end}}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td class="col-md-2">投放城市</td>
                            <td>
                            <span v-repeat="city:showItem.active_city">
                                {{city.areaName}}
                            </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer center-block">
                    <button type="button" data-dismiss="modal" class="primary-btn">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        replace: true,
        props: ['showItem'],
        data: function () {
            return {
                showItem: {}
            }
        }
    }
</script>
