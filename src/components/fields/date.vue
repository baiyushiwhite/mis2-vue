<template>
    <div class="input-group col-md-3 date" id="start-date">
        <input type="text" class="form-control text-input" v-model="startTime"/>
        <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
        </span>
    </div>
    <span class="pull-left">到</span>
    <div class="input-group col-md-3 date" id="end-date">
        <input type="text" class="form-control text-input" v-model="endTime"/>
        <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
        </span>
    </div>
</template>

<script>

    module.exports = {
        replace: true,
        props: ['startTime', 'endTime'],
        data: function () {
            return {
                startTime: 0,
                endTime: 0
            }
        },
        methods: {
            addListener: function () {
                var me = this
                require(['jquery'], function (jQuery) {
                    window.$ = window.jQuery = jQuery
                    // http://eonasdan.github.io/bootstrap-datetimepicker
                    require(['eonasdan-bootstrap-datetimepicker'], function () {
                        var today = new Date()
                        var minDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

                        var pickerConf = {
                            format: 'YYYY-MM-DD',
                            dayViewHeaderFormat: 'YYYY-MM',
                            widgetPositioning: {
                                horizontal: 'auto',
                                vertical: 'bottom'
                            }
                        }

                        $('#start-date').datetimepicker(pickerConf)
                                .data("DateTimePicker")
                                .defaultDate(me.startTime)
                                .minDate(minDate)
                        $('#end-date').datetimepicker(pickerConf)
                                .data("DateTimePicker")
                                .defaultDate(me.endTime)
                                .minDate(me.startTime)

                        $("#start-date").on("dp.change", function (e) {
                            $('#end-date').data("DateTimePicker").minDate(e.date)
                            me.startTime = $('#start-date input').val()
                        })
                        $("#end-date").on("dp.change", function (e) {
                            $('#start-date').data("DateTimePicker").maxDate(e.date)
                            me.endTime = $('#end-date input').val()
                        })
                    })
                })
            }
        },
        ready: function () {
            // 在require(jquery)先执行
            if (!this.startTime || !this.endTime) {
                var today = new Date()
                this.startTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                var twoweek = new Date(today - 0 + 14 * 86400000)
                this.endTime = twoweek.getFullYear() + '-' + (twoweek.getMonth() + 1) + '-' + twoweek.getDate()
            }
            this.addListener()
        }
    }
</script>
