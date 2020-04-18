import router from './router'
import store from './store'
import Keycloak from 'keycloak-js'
import Cookies from 'js-cookie'
import api from './api/api'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
router.beforeEach((to, from, next) => {
    let refreshToken = Cookies.get('refreshToken') // 获取用户登录token
    let token = Cookies.get('token') // 获取用户登录token
    let formData =  new URLSearchParams();
    formData.append('client_id', store.state.clientId);
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refreshToken);


    if (!token || !refreshToken) {
        let keycloak = null;
        keycloak = Keycloak({
            url: 'http://u.xlmediawatch.com/auth',
            realm: 'xlplatform',
            clientId: store.state.clientId
        });

        keycloak.init({ onLoad: 'login-required' }).success(function (authenticated) {
            if (!authenticated) {
                alert('登陆失败')
            } else {
                //登陆成功
                keycloak.loadUserProfile().success(data => {
                    const decode = jwtDecode(keycloak.token)
                    console.log(JSON.stringify(keycloak))
                    Cookies.set('token', keycloak.token)
                    Cookies.set('refreshToken', keycloak.refreshToken)
                    next({ path: "/partsAnalysis" })
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
                    Cookies.set('refreshToken', response.data.refresh_token)
                    Cookies.set('token', response.data.access_token)
                    axios.post('http://u.xlmediawatch.com/auth/realms/xlplatform/protocol/openid-connect/logout',formData,
                        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then( function(res) {
                    }).catch(function (error) { // 请求失败处理
                    });
                } else {
                    // 大于0 就不要更新 refreshToken
                    if (to.path.indexOf('&state=') !== -1) {
                        next({path: '/'})
                    } else {
                        next()
                    }
                }
            })
            .catch(function (error) {
                axios.post('http://u.xlmediawatch.com/auth/realms/xlplatform/protocol/openid-connect/logout',formData,
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then( function(res) {
                }).catch(function (error) { // 请求失败处理
                });
                Cookies.get('token', '');
                Cookies.remove('routerUrl');
                Cookies.remove('refreshToken');
                router.push({ path: "/b" });
            });

    }
})

