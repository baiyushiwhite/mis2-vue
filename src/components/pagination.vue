<template>
    <ul class="pagination" data-current="1">
        <li class="previous" v-class="disabled:params.pn == 1">
            <a aria-label="Previous" href="#/list/{{params.page}}/{{params.type}}/{{params.pn - 1}}">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li v-repeat="last" class="num" v-class="active:$index + 1 == params.pn"><a href="#/list/{{params.page}}/{{params.type}}/{{$index + 1}}">{{$index + 1}}</a></li>
        <li class="next" v-class="disabled:params.pn == last">
            <a aria-label="Next" href="#/list/{{params.page}}/{{params.type}}/{{params.pn - (-1)}}">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</template>

<script>
    var config = require('../config.js')
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
            last: function () {
                return Math.ceil(this.total / config.page.PAGE_SIZE)
            }
        },
        compiled: function () {
            $(this.$el).on('click', '.disabled a', function (e) {
                e.preventDefault()
            })
        }
    }
</script>