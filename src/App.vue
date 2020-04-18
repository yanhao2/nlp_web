<template>
    <div id="app">
        <router-view/>
    </div>
</template>


<script>
    import Vue from 'vue';
    // import './permission'
    import Keycloak from 'keycloak-js'
    import Cookies from 'js-cookie'
    import axios from 'axios'
    import router from './router/index'
    export default {
        name: "App",
        data () {
            return {
            }
        },
        computed: {
        },
        methods: {
            LoadData () {
                let refreshToken = Cookies.get('refreshToken') // 获取用户登录token
                let token = Cookies.get('token') // 获取用户登录token
                let formData =  new URLSearchParams();
                formData.append('client_id', this.$store.state.clientId);
                formData.append('grant_type', 'refresh_token');
                formData.append('refresh_token', refreshToken);
                let _this = this
                if (!token || !refreshToken) {
                    let keycloak = null;
                    keycloak = Keycloak({
                        url: 'http://u.xlmediawatch.com/auth',
                        realm: 'xlplatform',
                        clientId: _this.$store.state.clientId
                    });

                    keycloak.init({ onLoad: 'login-required' }).success(function (authenticated) {
                        if (!authenticated) {
                            alert('登陆失败')
                        } else {
                            //登陆成功
                            keycloak.loadUserProfile().success(data => {
                                Cookies.set('token', keycloak.token)
                                Cookies.set('refreshToken', keycloak.refreshToken)
                                router.push({ path: "/partsAnalysis" })
                            })
                        }
                    }).error(function () {
                        alert('认证中心异常');
                    });
                } else {
                    axios.post('http://u.xlmediawatch.com/auth/realms/xlplatform/protocol/openid-connect/token', formData,{
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' //将表单数据传递转化为form-data类型
                        },
                    }).then(function (response) {
                        if (response.data.expires_in <= 0) {
                            // 这个response.data.expires_in 小于等于0  更新 refreshToken
                            // 这个response.data.expires_in 小于等于0  更新 refreshToken
                            axios.post('http://u.xlmediawatch.com/auth/realms/xlplatform/protocol/openid-connect/logout',formData,
                                {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then( function(res) {
                            }).catch(function (error) { // 请求失败处理
                            });
                            let keycloak = null;
                            keycloak = Keycloak({
                                url: 'http://u.xlmediawatch.com/auth',
                                realm: 'xlplatform',
                                clientId: _this.$store.state.clientId
                            });

                            keycloak.init({ onLoad: 'login-required' }).success(function (authenticated) {
                                if (!authenticated) {
                                    alert('登陆失败')
                                } else {
                                    //登陆成功
                                    keycloak.loadUserProfile().success(data => {
                                        Cookies.set('token', keycloak.token)
                                        Cookies.set('refreshToken', keycloak.refreshToken)
                                        router.push({ path:'/partsAnalysis' })
                                    })
                                }
                            }).error(function () {
                                alert('认证中心异常');
                            });
                        } else {
                            router.push({ path:'/partsAnalysis' })
                        }
                    })
                    .catch(function (error) {
                        axios.post('http://u.xlmediawatch.com/auth/realms/xlplatform/protocol/openid-connect/logout',formData,
                            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then( function(res) {
                        }).catch(function (error) { // 请求失败处理
                        });
                        Cookies.remove('token');
                        Cookies.remove('routerUrl');
                        Cookies.remove('refreshToken');
                        router.push({ path: "/login" });
                    });

                }
            }
        },
        created () {
            this.LoadData()
        },
        mounted () {

        },
        updated () {
        }
    }
</script>


<style lang="scss">
    @import "./css/reset.css";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
