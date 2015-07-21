var baseUrl = 'http://10.94.43.36:8080';

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
        PERMISSION_DENIED_URL: baseUrl + '/mis/common/permissionForbidden.html'
    },
    validate: {
        VALID: 0,
        EMPTY: 1,
        INVALID_NUMBER: 2
    },
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
        }
    ],
    editConfig: {
        home: {
            banner: [
                {title: '显示位置', field: 'position', isOption: true, format: 'nonnegative'},
                {title: 'sid', field: 'sid', isOption: false, format: 'nonnegative'},
                {title: '说明', field: 'explanation', isOption: false, format: 'text'},
                {title: '图片', field: 'pic_url', isOption: true, format: 'img'},
                {title: '跳转地址', field: 'link_url', isOption: true, format: 'url'},
                {title: '投放日期', field: 'date', isOption: true, format: 'date'},
                {title: '投放时间', field: 'time', isOption: true, format: 'duration'},
                {title: '投放城市', field: 'city', isOption: true, format: 'city'}
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
        }
    }
}
