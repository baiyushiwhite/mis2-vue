<template>
    <div class="duration-field col-md-10">
        <template v-if="activeTime">
            <div v-repeat="duration:activeTime" class="duration">
                <input type="text" class="from-time text-input" v-model="duration.start" placeholder="00:00" />
                <span class="time-to">到</span>
                <input input type="text" class="to-time text-input" v-model="duration.end" placeholder="23:59" />
                <template v-if="$index > 0">
                    <a class="remove-time-btn circle-btn" v-on="click:removeDuration($index)"><span class="glyphicon glyphicon-remove"></span></a>
                </template>
                <span class="reminder"></span>
            </div>
        </template>

        <a class="add-time-btn circle-btn" v-on="click:addDuration"><span class="glyphicon glyphicon-plus"></span></a>
    </div>
</template>

<script>

    module.exports = {
        replace: true,
        props: ['activeTime'],
        data: function () {
            return {
                activeTime: {}
            }
        },
        methods: {
            addDuration: function () {
                this.activeTime.push({})
            },
            removeDuration: function (index) {
                this.activeTime.splice(index, 1)
            }
        },
        created: function () {
            if (!this.activeTime || this.activeTime.length === 0) {
                this.activeTime = [{
                    start: '00:00',
                    end: '23:59'
                }]
            }
        }
    }
</script>

<style lang="less">
</style>