<template>

</template>

<script>
    import Cookies from 'js-cookie'
    import Keycloak from 'keycloak-js'
    import router from '../../router/index'
    export default {
        name: "Login",
        data() {
            return {}
        },
        computed: {},
        methods: {
            LoadData() {
                let refreshToken = Cookies.get('refreshToken') // 获取用户登录token
                let token = Cookies.get('token') // 获取用户登录token
                let formData = new URLSearchParams();
                formData.append('client_id', this.$store.state.clientId);
                formData.append('grant_type', 'refresh_token');
                formData.append('refresh_token', refreshToken);
                let _this = this
                let keycloak = null;
                keycloak = Keycloak({
                    url: 'http://u.xlmediawatch.com/auth',
                    realm: 'xlplatform',
                    clientId: _this.$store.state.clientId
                });

                keycloak.init({onLoad: 'login-required'}).success(function (authenticated) {
                    if (!authenticated) {
                        alert('登陆失败')
                    } else {
                        //登陆成功
                        keycloak.loadUserProfile().success(data => {
                            Cookies.set('token', keycloak.token)
                            Cookies.set('refreshToken', keycloak.refreshToken)
                            router.push({path: "/partsAnalysis"})
                        })
                    }
                }).error(function () {
                    alert('认证中心异常');
                });
            }
        },
        created() {
            this.LoadData()
        },
        mounted() {

        },
        updated() {
        }
    }
</script>

<style lang="sass">

</style>
