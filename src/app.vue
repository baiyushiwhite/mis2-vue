<template>
    <div id="wrapper">
        <!-- header -->
        <div id="header">
            <div id="header-content" class="container">
                <a id="logo" href="/list/index"></a>

                <p id="username-info" class="pull-right col-md-2">
                    <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                    <span id="username"></span>
                </p>
            </div>
        </div>

        <div id="main" class="container">
            <div id="content" class="col-md-11">
                <!-- main view -->
                <component is="{{view}}"
                           params="{{params}}"
                           v-transition
                           transition-mode="out-in">
                </component>
            </div>
            <div class="col-md-1">
                <div id="side-nav">
                    <ul>
                        <li v-repeat="pageConfig:navConfig"
                            v-class="active:pageConfig.page === params.page">
                            <a v-class="active:pageConfig.page === params.page">{{pageConfig.title}}
                            </a>
                            <ul class="nav sub-item">
                                <li v-repeat="typeConfig:pageConfig.types"
                                    v-class="active:pageConfig.page === params.page && typeConfig.type === params.type">
                                    <a v-class="active:pageConfig.page === params.page && typeConfig.type === params.type"
                                       href="#/list/{{pageConfig.page}}/{{typeConfig.type}}/1">
                                        {{typeConfig.title}}
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <component is="err-dialog"></component>
    <component is="success-dialog"></component>
</template>

<script>
    require('./static/style/app.less')
    module.exports = {
        el: '#app',
        data: {
            view: '',
            params: {
                page: '',
                type: '',
                pn: ''
            },
            navConfig: require('./config.js').navConfig
        },
        components: {
            'list-view': require('./views/list.vue'),
            'create-view': require('./views/create.vue'),
            'err-dialog': require('./components/modal/err.vue'),
            'success-dialog': require('./components/modal/success.vue')
        }
    }
</script>
