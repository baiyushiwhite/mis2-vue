<template>
  <div id="wrapper">
    <!-- header -->
    <div id="header">
        <div id="header-content" class="container">
            <a id="logo" href="/list/index"></a>
            <p id="username-info" class="pull-right col-md-2">
                <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                <span id="username"></span>
            </p>
        </div>
    </div>

    <div id="main" class="container">
      <div id="content" class="col-md-11">
        <!-- main view -->
        <component is="{{view}}"
                   params="{{params}}"
                   v-transition
                   transition-mode="out-in">
        </component>
      </div>
      <div class="col-md-1">
        <div id="side-nav">
          <ul>
            <li>
              <a href="#/list/home" class="active">首页</a>
              <ul class="nav sub-item">
                <li class="active"><a href="#/list/home/banner">Banner区</a></li>
                <li><a href="#/list/home/icon/1">Icons区</a></li>
                <li><a href="#/list/home/t10/1">Top10区</a></li>
                <li><a href="#/list/home/business/1">运营位区</a></li>
                <li><a href="#/list/home/vdeal/1">虚拟团单区</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    module.exports = {
        el: '#app',
        data: {
            view: '',
            params: {
                page: '',
                type: '',
                pn: ''
            }
        },
        components: {
            'list-view': require('./views/list.vue'),
            'create-view': require('./views/create.vue')
        }
    }
</script>

<style lang="less">
@import "static/style/app.less";
</style>