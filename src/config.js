var baseUrl = 'http://10.94.43.36:8080';

module.exports = {
    statusCode: {
        NOT_LOGIN: 100
    },
    url: {
        GET_ITEM_LIST_URL: baseUrl + '/wapmis/main/getidea',
        HOME_URL: baseUrl + '/wapmis/main/home'
    },
    page: {
        PAGE_SIZE: 8
    },
    editConfig: {
        home: {
            banner: [
                {title: '显示位置', field: 'position', isOption: true},
                {title: 'sid', field: 'sid', isOption: false},
                {title: '说明', field: 'explanation', isOption: false},
                {title: '图片', field: 'pic_url', isOption: true},
                {title: '跳转地址', field: 'link_url', isOption: true},
                {title: '投放日期', field: 'date', isOption: true},
                {title: '投放时间', field: 'time', isOption: true},
                {title: '投放城市', field: 'city', isOption: true}
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