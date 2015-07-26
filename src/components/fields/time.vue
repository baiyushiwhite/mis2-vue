<template>
    <div class="duration-field col-md-10">
        <template v-if="activeTime">
            <div v-repeat="duration:activeTime" class="duration">
                <input type="text" class="from-time text-input"
                       v-model="duration.start"
                       v-class="invalid:duration.startInvalid"
                       v-on="change:validateDuration(duration)"
                       placeholder="00:00" />
                <span class="time-to">到</span>
                <input input type="text" class="to-time text-input"
                       v-class="invalid:duration.endInvalid"
                       v-model="duration.end"
                       v-on="change:validateDuration(duration)"
                       placeholder="23:59" />
                <template v-if="$index > 0">
                    <a class="remove-time-btn circle-btn" v-on="click:removeDuration($index)"><span class="glyphicon glyphicon-remove"></span></a>
                </template>
                <span class="reminder">{{duration.remind}}</span>
            </div>
        </template>

        <a class="add-time-btn circle-btn" v-on="click:addDuration"><span class="glyphicon glyphicon-plus"></span></a>
    </div>
</template>

<script>
    var validator = require('../../validator.js')
    var config = require('../../config.js')
    module.exports = {
        replace: true,
        props: ['activeTime'],
        data: function () {
            return {
                activeTime: {}
            }
        },
        watch: {
            'activeTime': function () {
                console.log('activeTime change')
            }
        },
        methods: {
            addDuration: function () {
                this.activeTime.push({
                    start: '',
                    end: '',
                    remind: '',
                    startInvalid: false,
                    endInvalid: false
                })
            },
            removeDuration: function (index) {
                this.activeTime.splice(index, 1)
            },
            validateDuration: function (duration) {
                validator.validateFn.duration(duration)
                console.dir(duration)
            }
        },
        ready: function () {
            if (!this.activeTime || this.activeTime.length === 0) {
                this.activeTime = [{
                    start: '00:00',
                    end: '23:59',
                    remind: '',
                    startInvalid: false,
                    endInvalid: false
                }]
            }
        }
    }
</script>
