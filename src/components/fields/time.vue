<template>
    <div class="duration-field col-md-10">
        <template v-if="item.active_time">
            <div v-repeat="duration:activeTime" class="duration">
                <input type="text" class="from-time text-input" v-model="duration.start" placeholder="00:00" />
                <span class="time-to">到</span>
                <input input type="text" class="to-time text-input" v-model="duration.end" placeholder="23:59" />
                <template v-if="$index === 0">
                    <a class="remove-time-btn circle-btn"><span class="glyphicon glyphicon-remove"></span></a>
                </template>
                <span class="reminder"></span>
            </div>
        </template>

        <template v-if="!item.active_time">
            <div class="duration">
                <input input type="text" class="from-time text-input" v-model="newDuration.start" placeholder="00:00" />
                <span class="time-to">到</span>
                <input input type="text" class="to-time text-input"  v-model="newDuration.end" placeholder="23:59" />
                <span class="reminder"></span>
            </div>
        </template>
        <a class="add-time-btn circle-btn"><span class="glyphicon glyphicon-plus"></span></a>
    </div>
</template>

<script>

    module.exports = {
        replace: true,
        props: ['item'],
        data: function () {
            return {
                item: {}
            }
        },
        methods: {

        }
    }
</script>

<style lang="less">
    @import "../../dep/bootstrap/bootstrap-datetimepicker.min.css";
</style>