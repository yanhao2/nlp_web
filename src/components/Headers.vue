<template>
    <div class="headersCon">
        <div class="headers">
            <div class="wrapper rows">
                <div class="cols">
                    <div class="rows" style="align-items: center">
                        <div class="Headers_title">新联中文语义演示平台</div>
                        <div v-for="(item, i) in navList" class="navItem" :key="i" :class="activeName == item.path ? 'active' : ''" @click="onSelectClick(item)" v-show="item.isShow">{{item.name}}</div>
                    </div>

                </div>
                <Dropdown @on-click="onLoGout">
                    <a href="javascript:void(0)" style="height: 80px;line-height: 80px">
                        <Icon type="md-person" style="color: #12D4C9;font-weight: bold;font-size: 20px;margin-right: 5px"/>
                        <span style="color: #fff;font-weight: bold;font-size: 16px;">{{userName}}</span>
                        <Icon type="ios-arrow-down" style="margin-left: 5px;color: #fff;"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="logout">退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <div style="height: calc(100% - 80px)">
            <router-view/>
        </div>
    </div>

</template>

<script>
    import jwtDecode from 'jwt-decode'
    import Cookies from 'js-cookie'
    import Keycloak from 'keycloak-js'
    import api from '../api/api'
    import router from '../router/index'
    export default {
        name: "Headers",
        data() {
            return {
                theme1: 'light',
                activeName: '/partsAnalysis',
                userName: '',
                navList: []
            };
        },
        computed: {
            routerUrl () {
                return this.$route.path
            }
        },
        methods: {
            onLoGout (val) {
                let refreshToken = Cookies.get('refreshToken') // 获取用户登录token
                let formData =  new URLSearchParams();
                formData.append('client_id', this.$store.state.clientId);
                formData.append('grant_type', 'refresh_token');
                formData.append('refresh_token', refreshToken);
                if (val == 'logout') {
                    this.$axios.post('http://u.xlmediawatch.com/auth/realms/xlplatform/protocol/openid-connect/logout',formData,
                        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then( function(res) {
                    }).catch(function (error) { // 请求失败处理
                    });
                    Cookies.remove('token');
                    Cookies.remove('routerUrl');
                    Cookies.remove('refreshToken');
                    router.push({ path: "/login" });
                }
            },
            onSelectClick(record, index) {
                this.activeName = record.path
                localStorage.setItem('routerUrl', this.activeName)
                this.$router.push({
                    path: record.path
                })
            },
            LoadData () {
                let token = Cookies.get('token')
                if (token) {
                    const decode = jwtDecode(token)
                    console.log(decode)
                    let isShow = false
                    if (decode.resource_access.nlp_web) {
                        isShow = decode.resource_access.nlp_web.roles[0] == 'develop' ? true : false
                    }
                    let navList = [
                        {name: 'NLP文本分析', path: '/partsAnalysis', isShow: true},
                        {name: 'NLP文本分析测试', path: '/partsAnalysisTest', isShow: isShow},
                        {name: 'AI图像识别', path: '/aIRecognition', isShow: true },
                        {name: '自动清洗', path: '/cleaning', isShow: true},
                    ]
                    this.navList = navList
                    this.userName = decode.name
                    if (Cookies.get('routerUrl')) {
                        this.activeName =  Cookies.get('routerUrl');
                    } else {
                        Cookies.set('routerUrl', this.activeName)
                    }
                } else {
                    this.$router.push({ path: "/partsAnalysis" });
                }

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

<style lang="scss">
    .headersCon{
        /*background-color: #f5f5f5;*/
        .divider{
            margin: 0px;
        }
    }
    .headers {
        background-color: #061840;

        .ivu-menu, .ivu-menu-item {
            font-size: 16px;
        }

        .ivu-menu-light {
            background-color: #fff;
        }

        .ivu-menu-horizontal {
            height: 80px;
            line-height: 80px;
        }

        .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
            color: #12d4c9;
        }

        .wrapper {
            height: 80px;
            align-items: center;
            .navItem{
                background-color: #D8D8D8;
                font-weight: bold;
                padding: 15px 20px;
                border-radius: 2px;
                font-size: 16px;
                margin: 0 15px;
                cursor: pointer;
                color: #323232;
            }
            .active{
                background-color: #12d4c9;
                color: #fff;
            }
            .navItem:hover{
                background-color: #12d4c9;
                color: #fff;
            }
            .Headers_title {
                margin-right: 20px;
                font-weight: 700;
                font-size: 20px;
                color: #ffffff;
            }
        }
    }
</style>
