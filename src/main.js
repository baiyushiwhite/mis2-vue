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
  app.params = {
    page: page,
    type: type,
    pn: pn
  }
  app.view = 'list-view'
})

router.configure({
  notfound: function () {
    router.setRoute('/list/home/banner/1')
  }
})

window.F = (function () {
  var b = {}
  return {
    context: function (p, r) {
      var q = arguments.length
      if (q > 1) {
        b[p] = r
      } else {
        if (q == 1) {
          if (typeof p == "object") {
            for (var o in p) {
              if (p.hasOwnProperty(o)) {
                b[o] = p[o]
              }
            }
          } else {
            return b[p]
          }
        }
      }
    }
  }
})()
router.init('/list/home/banner/1')