/**
 * @file define some util function
 * @author baiyushi@baidu.com
 */

/**
 * 错误提示框
 * @param title
 * @param msg
 */
var $ = require('jquery')
var config = require('./config.js')

function errorHandler(title, msg) {
    var $modal = $('#err-dialog');
    if (title) {
        $modal.find('.modal-title').html(title);
    }
    if (msg) {
        $modal.find('.error-message').html(msg);
    }
    $modal.modal('show');
}

function permissionForbidden(res) {
    debugger
    if (res.errno == config.statusCode.NOT_LOGIN) {
        window.location.replace(config.url.HOME_URL);
    }
    else if (res.errno == config.statusCode.PERMISSION_FORBIDDEN){
        window.location.replace(config.url.PERMISSION_DENIED_URL);
    }
    else {
        errorHandler('', res.errmsg);
    }
}

function successHint(msg) {
    var $hint = $("#success-hint");
    if (msg) {
        $hint.find('.success-message').html(msg);
    }
    $hint.fadeTo(1000, 500).slideUp(500, function () {
        $hint.alert('close');
    });
}

module.exports = {
    errorHandler: errorHandler,
    permissionForbidden: permissionForbidden,
    successHint: successHint
}
