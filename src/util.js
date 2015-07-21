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
var Config = require('./config.js')

function errorHandler(title, msg) {
//     var $modal = $('#err-dialog');
//     if (title) {
//         $modal.find('.modal-title').html(title);
//     }
//     if (msg) {
//         $modal.find('.error-message').html(msg);
//     }
//     $modal.modal('show');
}

function permissionForbidden(res) {
    if (res.errno === Config.statusCode.NOT_LOGIN) {
        window.location.replace(Config.statusCode.HOME_URL);
    }
    else if (res.errno === Config.statusCode.PERMISSION_FORBIDDEN){
        window.location.replace(Config.url.PERMISSION_DENIED_URL);
    }
    else {
        errorHandler('', res.errmsg);
    }
}

module.exports = {
    errorHandler: errorHandler,
    permissionForbidden: permissionForbidden
}
