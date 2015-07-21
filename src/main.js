/***
 * @file app entry
 * @author baiyushi@baidu.com
 */
var Vue = require('vue')
var Router = require('director').Router
var app = new Vue(require('./app.vue'))
var router = new Router()

require(['jquery'], function (jQuery) {
  window.$ = window.jQuery = jQuery
  require("bootstrap-webpack")
})

router.on('/list/:page/:type/:pn', function (page, type, pn) {
  app.params.page = page
  app.params.type = type
  app.params.pn = pn
  app.view = 'list-view'
})

router.on('/create/:page/:type', function (page, type) {
  app.view = 'create-view'
  app.params.page = page
  app.params.type = type
})

router.configure({
  notfound: function () {
    router.setRoute('/list/home/banner/1')
  }
})

router.init('/list/home/banner/1')