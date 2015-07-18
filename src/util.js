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

module.exports = {
    errorHandler: errorHandler
}
