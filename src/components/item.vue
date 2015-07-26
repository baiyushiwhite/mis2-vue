<template>
  <!-- item组件，表格一行 -->
  <tr v-on="click:showDetail(item, $event)">
    <td v-repeat="fieldConfig:typeConfig" width="{{fieldConfig.width}}">
      <template v-if="['explanation', 'name', 'title', 'desc', 'current_price', 'market_price'].indexOf(fieldConfig.field) >= 0">
        {{item[fieldConfig.field]}}
      </template>
      <template v-if="'pic_url' === fieldConfig.field">
        <img v-attr="src:item.pic_url, title:item.pic_url"/>
      </template>

      <template v-if="'link_url' === fieldConfig.field">
        <a target="_blank" class="link-url" href="{{item.link_url}}">{{item.link_url}}</a>
      </template>

      <template v-if="'date' === fieldConfig.field">
        {{item.start_time}} ~ {{item.end_time}}
      </template>

      <template v-if="'time' === fieldConfig.field">
        <p v-repeat="duration:item.active_time">
          {{duration.start}} ~ {{duration.end}}
        </p>
      </template>

      <template v-if="'city' === fieldConfig.field">
        <span v-repeat="city:item.active_city.slice(0,6)" data-areaid="{{city.areaId}}">
          {{city.areaName}}
        </span>
        <span v-repeat="city:item.active_city.slice(6)" class="hidden" data-areaid="{{city.areaId}}">
          {{city.areaName}}
        </span>
        <span v-if="item.active_city.length > 6">等个{{item.active_city.length}}城市</span>
      </template>

      <template v-if="'status' === fieldConfig.field">
        <span class="status-wrap-{{item.stat1}}">
          {{item.status_name}}
        </span>
      </template>

      <template v-if="'operation' === fieldConfig.field">
        <p><a class="edit-btn" data-target="#edit-dialog" v-on="click:showEdit(item, $event)">编辑</a></p>
        <p><a class="delete-btn" v-on="click:showDelete(item.id)">删除</a></p>
        <p v-if="0 == item.stat1"><a class="approve-btn" v-on="click:showApprove(item.id)">通过</a></p>
        <p v-if="1 == item.stat1"><a class="offline-btn" v-on="click:showOffline(item.id)">下线</a></p>
        <p v-if="2 == item.stat1"><a class="online-btn" v-on="click:showOnline(item.id)">上线</a></p>
        <p v-if="item.online_data"><a class="view-online" v-on="click:showDetail(item.online_data, $event)">线上版本</a></p>
      </template>
    </td>
  </tr>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['item', 'showItem', 'editItem', 'typeConfig', 'operationId'],
    data: function () {
      return {
        typeConfig: [],
        item: {},
        showItem: {},
        editItem: {},
        operationId: ''
      }
    },
    methods: {
      showDetail: function (showItem, e) {
        var target = e.target
        if ($(target).hasClass('view-online')) {
          this.showItem = showItem
          $('#view-dialog').modal('show')
        }
        if (target.tagName === 'A') {
          e.cancelBubble = true
          e.stopPropagation()
          return false
        }
        this.showItem = showItem
        $('#view-dialog').modal('show')
      },
      showEdit: function (editItem, e) {
        this.editItem = editItem
        $('#edit-dialog').modal({
          backdrop: 'static',
          keyboard: false
        })
      },
      showDelete: function (deleteId) {
        this.operationId = deleteId
        $('#delete-dialog').modal('show')
      },
      showApprove: function (approveId) {
        this.operationId = approveId
        $('#approve-dialog').modal('show')
      },
      showOnline: function (onlineId) {
        this.operationId = onlineId
        $('#online-dialog').modal('show')
      },
      showOffline: function (onlineId) {
        this.operationId = onlineId
        $('#offline-dialog').modal('show')
      }
    }
  }
</script>

<style lang="less">
</style>