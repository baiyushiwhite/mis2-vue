<template>
    <ul class="pagination" data-current="1">
        <li class="previous" v-class="disabled:params.pn==1">
            <a aria-label="Previous" href="#/list/{{params.page}}/{{params.type}}/{{params.pn - 1}}">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li v-repeat="pageNum:pages" class="num" v-class="active:pageNum==params.pn"><a href="#/list/{{params.page}}/{{params.type}}/{{pageNum}}">{{pageNum}}</a></li>
        <li class="next" v-class="disabled:params.pn==last">
            <a aria-label="Next" href="#/list/{{params.page}}/{{params.type}}/{{params.pn - (-1)}}">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</template>

<script>
    var Config = require('../config.js')
    var $ = require('jquery')
    module.exports = {
        replace: true,
        props: ['params', 'total'],
        data: function () {
            return {
                params: {
                    page: '',
                    type: '',
                    pn: ''
                },
                total: 0
            }
        },
        computed: {
            pages: function () {
                var array = []
                for (var i = 0; i < this.last; i++) {
                    array.push(i + 1)
                }
                return array
            },
            last: function () {
                return Math.ceil(this.total / Config.page.PAGE_SIZE)
            }
        },
        compiled: function () {
            $(this.$el).on('click', '.disabled a', function (e) {
                e.preventDefault()
            })
        }
    }
</script>