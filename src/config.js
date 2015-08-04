//var baseUrl = 'http://10.94.43.36:8080';
var baseUrl = '';

module.exports = {
    statusCode: {
        NOT_LOGIN: 100,
        SUCCESS: 0,
        PERMISSION_FORBIDDEN: 101
    },
    url: {
        GET_ITEM_LIST_URL: baseUrl + '/wapmis/main/getidea',
        HOME_URL: baseUrl + '/wapmis/main/home',
        CITY_URL: baseUrl + '/wapmis/main/city',
        PERMISSION_DENIED_URL: baseUrl + '/mis/common/permissionForbidden.html',
        UPDATE_STATUS_URL: baseUrl + '/wapmis/main/updateideastatus',
        UPDATE_ITEM_URL: baseUrl + '/wapmis/main/updateidea',
        GET_DETAIL_ITEM: baseUrl + '/wapmis/main/detail'
    },
    validate: {
        valid: '',
        empty: '不能为空',
        invalidNum: '请输入正整数',
        invalidUrl: '请输入合法链接,如https://www.baidu.com',
        invalidTime: '请输入00:00-23:59之间的时间',
        invalidDuration: '结束时间应该晚于开始时间',
        invalidCity: '请选择投放城市',
        invalidImg: '请选择正确图片',
        invalidImageSize: '图片大小不超过100kb',
        invalidPrice: '请输入正确的价格（非负数）'
    },
    MAX_IMG_SIZE: 100000,
    page: {
        PAGE_SIZE: 8
    },
    navConfig: [
        {
            title: '首页',
            page: 'home',
            types: [
                {title: 'Banner区', type: 'banner'},
                {title: 'Icon区', type: 'icon'},
                {title: 'Top10区', type: 't10'},
                {title: '运营位区', type: 'business'},
                {title: '虚拟团单区', type: 'vdeal'}
            ]
        },
        {
            title: '今日值得买',
            page: 'worthBuy',
            types: [
                {title: '团单', type: 'poiList'},
            ]
        }
    ],
    editConfig: {
        home: {
            banner: [
                {title: '显示位置', field: 'position', must: true, format: 'nonnegative', remind: '', invalid: false},
                {title: 'sid', field: 'sid', must: false, format: 'nonnegative', remind: '', invalid: false},
                {title: '说明', field: 'explanation', must: false, format: 'text', remind: '', invalid: false},
                {title: '图片', field: 'picUrl', must: true, format: 'img', remind: '', invalid: false},
                {title: '跳转地址', field: 'link_url', must: true, format: 'url', remind: '', invalid: false},
                {title: '投放日期', field: 'date', must: true, format: 'date', invalid: false},
                {title: '投放时间', field: 'active_time', must: true, format: 'duration', invalid: false},
                {title: '投放城市', field: 'activeCityIds', must: true, format: 'city', invalid: false}
            ],
            icon: [
                {title: '显示位置', field: 'position', must: true, format: 'nonnegative', remind: '', invalid: false},
                {title: 'sid', field: 'sid', must: false, format: 'nonnegative', remind: '', invalid: false},
                {title: '说明', field: 'explanation', must: false, format: 'text', remind: '', invalid: false},
                {title: '图片', field: 'picUrl', must: true, format: 'img', remind: '', invalid: false},
                {title: '跳转地址', field: 'link_url', must: true, format: 'url', remind: '', invalid: false},
                {title: '投放日期', field: 'date', must: true, format: 'date', invalid: false},
                {title: '投放时间', field: 'active_time', must: true, format: 'duration', invalid: false},
                {title: '投放城市', field: 'activeCityIds', must: true, format: 'city', invalid: false}
            ],
            t10: [
                {title: 'sid', field: 'sid', must: false, format: 'nonnegative', remind: '', invalid: false},
                {title: '说明', field: 'explanation', must: false, format: 'text', remind: '', invalid: false},
                {title: '图片', field: 'picUrl', must: true, format: 'img', remind: '', invalid: false},
                {title: '跳转地址', field: 'link_url', must: true, format: 'url', remind: '', invalid: false},
                {title: '标题', field: 'title', must: false, format: 'text', remind: '', invalid: false},
                {title: '价格', field: 'current_price', must: false, format: 'price', remind: '', invalid: false},
                {title: '投放日期', field: 'date', must: true, format: 'date', invalid: false},
                {title: '投放时间', field: 'active_time', must: true, format: 'duration', invalid: false},
                {title: '投放城市', field: 'activeCityIds', must: true, format: 'city', invalid: false}
            ],
            business: [
                {title: '显示位置', field: 'position', must: true, format: 'nonnegative', remind: '', invalid: false},
                {title: 'sid', field: 'sid', must: false, format: 'nonnegative', remind: '', invalid: false},
                {title: '说明', field: 'explanation', must: false, format: 'text', remind: '', invalid: false},
                {title: '图片', field: 'picUrl', must: true, format: 'img', remind: '', invalid: false},
                {title: '跳转地址', field: 'link_url', must: true, format: 'url', remind: '', invalid: false},
                {title: '投放日期', field: 'date', must: true, format: 'date', invalid: false},
                {title: '投放时间', field: 'active_time', must: true, format: 'duration', invalid: false},
                {title: '投放城市', field: 'activeCityIds', must: true, format: 'city', invalid: false}
            ],
            vdeal: [
                {title: 'sid', field: 'sid', must: false, format: 'nonnegative', remind: '', invalid: false},
                {title: '说明', field: 'explanation', must: false, format: 'text', remind: '', invalid: false},
                {title: '图片', field: 'picUrl', must: true, format: 'img', remind: '', invalid: false},
                {title: '跳转地址', field: 'link_url', must: true, format: 'url', remind: '', invalid: false},
                {title: '标题', field: 'title', must: true, format: 'text', remind: '', invalid: false},
                {title: '描述', field: 'desc', must: true, format: 'text', remind: '', invalid: false},
                {title: '价格', field: 'current_price', must: false, format: 'price', remind: '', invalid: false},
                {title: '原价', field: 'market_price', must: false, format: 'price', remind: '', invalid: false},
                {title: '投放日期', field: 'date', must: true, format: 'date', invalid: false},
                {title: '投放时间', field: 'active_time', must: true, format: 'duration', invalid: false},
                {title: '投放城市', field: 'activeCityIds', must: true, format: 'city', invalid: false}
            ]
        },
        worthBuy: {
            poiList: [
                {title: '显示位置', field: 'position', must: true, format: 'nonnegative', remind: '', invalid: false},
                {title: 'dealId', field: 'dealId', must: true, format: 'text', remind: '', invalid: false},
                {title: '黑名单', field: 'black', must: true, format: 'bool', remind: '', invalid: false},
                {title: '说明', field: 'explanation', must: false, format: 'text', remind: '', invalid: false},
                {title: '图片', field: 'picUrl', must: true, format: 'img', remind: '', invalid: false},
                {title: '跳转地址', field: 'link_url', must: true, format: 'url', remind: '', invalid: false},
                {title: '标题', field: 'title', must: true, format: 'text', remind: '', invalid: false},
                {title: '描述', field: 'desc', must: true, format: 'text', remind: '', invalid: false},
                {title: '价格', field: 'current_price', must: false, format: 'price', remind: '', invalid: false},
                {title: '原价', field: 'market_price', must: false, format: 'price', remind: '', invalid: false},
                {title: '投放日期', field: 'date', must: true, format: 'date', invalid: false},
                {title: '投放时间', field: 'active_time', must: true, format: 'duration', invalid: false},
                {title: '投放城市', field: 'activeCityIds', must: true, format: 'city', invalid: false}
            ]
        }
    },
    listConfig: {
        home: {
            banner: [
                {title: '图片', width: '10%', field: 'pic_url'},
                {title: '链接', width: '15%', field: 'link_url'},
                {title: '说明', width: '12%', field: 'explanation'},
                {title: '投放日期', width: '20%', field: 'date'},
                {title: '投放时间', width: '15%', field: 'time'},
                {title: '投放城市', width: '18%', field: 'city'},
                {title: '状态', width: '5%', field: 'status'},
                {title: '操作', width: '5%', field: 'operation'}
            ],
            icon: [
                {title: '图片', width: '10%', field: 'pic_url'},
                {title: '链接', width: '15%', field: 'link_url'},
                {title: '说明', width: '12%', field: 'explanation'},
                {title: '投放日期', width: '20%', field: 'date'},
                {title: '投放时间', width: '15%', field: 'time'},
                {title: '投放城市', width: '18%', field: 'city'},
                {title: '状态', width: '5%', field: 'status'},
                {title: '操作', width: '5%', field: 'operation'}
            ],
            t10: [
                {title: '图片', width: '10%', field: 'pic_url'},
                {title: '链接', width: '10%', field: 'link_url'},
                {title: '名称', width: '10%', field: 'name'},
                {title: '说明', width: '12%', field: 'explanation'},
                {title: '价格', width: '5%', field: 'current_price'},
                {title: '投放日期', width: '15%', field: 'date'},
                {title: '投放时间', width: '10%', field: 'time'},
                {title: '投放城市', width: '18%', field: 'city'},
                {title: '状态', width: '5%', field: 'status'},
                {title: '操作', width: '5%', field: 'operation'}
            ],
            business: [
                {title: '图片', width: '10%', field: 'pic_url'},
                {title: '链接', width: '15%', field: 'link_url'},
                {title: '说明', width: '12%', field: 'explanation'},
                {title: '投放日期', width: '20%', field: 'date'},
                {title: '投放时间', width: '15%', field: 'time'},
                {title: '投放城市', width: '18%', field: 'city'},
                {title: '状态', width: '5%', field: 'status'},
                {title: '操作', width: '5%', field: 'operation'}
            ],
            vdeal: [
                {title: '图片', width: '10%', field: 'pic_url'},
                {title: '链接', width: '10%', field: 'link_url'},
                {title: '说明', width: '12%', field: 'explanation'},
                {title: '标题', width: '8%', field: 'title'},
                {title: '描述', width: '8%', field: 'desc'},
                {title: '价格', width: '5%', field: 'current_price'},
                {title: '原价', width: '5%', field: 'market_price'},
                {title: '投放日期', width: '8%', field: 'date'},
                {title: '投放时间', width: '8%', field: 'time'},
                {title: '投放城市', width: '14%', field: 'city'},
                {title: '状态', width: '5%', field: 'status'},
                {title: '操作', width: '5%', field: 'operation'}
            ]
        },
        worthBuy: {
            poiList: [
                {title: '黑名单', width: '5%', field: 'black'},
                {title: '图片', width: '10%', field: 'pic_url'},
                {title: '链接', width: '10%', field: 'link_url'},
                {title: '说明', width: '9%', field: 'explanation'},
                {title: '标题', width: '8%', field: 'title'},
                {title: '描述', width: '8%', field: 'desc'},
                {title: '价格', width: '5%', field: 'current_price'},
                {title: '原价', width: '5%', field: 'market_price'},
                {title: '投放日期', width: '8%', field: 'date'},
                {title: '投放时间', width: '8%', field: 'time'},
                {title: '投放城市', width: '12%', field: 'city'},
                {title: '状态', width: '5%', field: 'status'},
                {title: '操作', width: '5%', field: 'operation'}
            ]
        }
    }
}