<template>
    <component is="edit" params="{{params}}"></component>
</template>

<script>
    module.exports = {
        replace: true,
        props: ['params'],
        data:  function () {
            return {
                params: {
                    page: '',
                    type: ''
                }
            }
        },
        components: {
            'edit': require('../components/edit.vue')
        }
    }
</script>

<style lang="less">

</style>
