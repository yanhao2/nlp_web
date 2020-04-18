<template>
    <div class="Layout">
        <div class="sorcoll">
            <div class="wrapper">
                <div class="nav">
                    <div class="paddTop">
                        <div class="row">
                            <div class="col">
                                <Form :model="formData" :label-width="30">
                                    <FormItem label="URL">
                                        <Input v-model="formData.url" :autosize="{minRows: 4,maxRows: 4}"  placeholder=""></Input>
                                    </FormItem>
                                </Form>
                            </div>
                            <div style="padding-left: 10px">
                                <Button type="primary" @click="AutomaticAccess">自动清洗</Button>
                            </div>
                        </div>

                    </div>
                    <div style="position: relative;min-height: 300px">
                        <div v-if="!isLoading">
                            <div style="border: 1px solid #dcdee2;min-height: 300px;padding: 10px">
                                <pre style="word-wrap: break-word; white-space: pre-wrap;margin: 0">{{data}}</pre>
                            </div>
                        </div>
<!--                        <Input v-model="data" type="textarea" :autosize="{minRows: 15,maxRows: 15}" placeholder="" v-if="!isLoading"/>-->
                        <Spin fix v-else>
                            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                            <div>努力加载中...</div>
                        </Spin>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from "./api/api";
    import Headers from "../../components/Headers";
    export default {
        name: "cleaning",
        components: {Headers},
        data() {
            return {
                industry: '0',
                formData: {
                    url: '',
                },
                isLoading: false,
                index: 0,
                tabSName: '/toutiao',
                navList: [
                    {name: '今日头条解析', api: '/toutiao'},
                    {name: '天天快报解析', api: '/ttkb'},
                    {name: '网络通用解析', api: '/web'},
                    {name: '微博解析', api: '/weibo'},
                    {name: '微信解析', api: '/weixin'},
                    {name: '一点资讯解析', api: '/ydzx'},
                    {name: '知乎解析', api: '/zhihu'},
                ],
                data: ''
            };
        },
        computed: {
            routers () {
                return this.$route.path
            }
        },
        methods: {
            AutomaticAccess (record) {
                if (this.formData.url) {
                    this.data = ''
                    this.tabSName = record.api
                    this.LoadData(record)
                } else {
                    this.$Message.error('请输入url');
                }

            },
            async LoadData() {
                try {
                    this.isLoading = true
                    let result = await api.List({url: this.formData.url})
                    let jsonStr = JSON.stringify(result.data,null,4);
                    jsonStr.replace(/\s+/g,"");
                    this.data = jsonStr
                    this.isLoading = false
                } catch (e) {
                    console.log(e)
                }
            },
            handleSubmit () {
                this.$refs[this.tabSName][0].LoadData(this.formData)
            }
        },
        created() {
        },

        mounted() {
        },
        updated() {
        }
    }
</script>

<style lang="scss">
    @import "../../css/iconFontSize/iconfont.css";
    .Layout{
        .sorcoll{
            height: calc(100vh - 80px);
            overflow-y: auto;
        }
        .wrapper{
            .nav{
                .el-tabs__item{
                    padding: 0 15px;
                }
            }
            .paddTop{
                padding-top: 20px;
            }
        }
        .footer{
            height: 50px;
        }
        .ivu-form-item{
            margin-bottom: 15px;
        }
    }
    .ivu-btn-text:hover{
        color: #19be6b;
    }
    .row{
        display: flex;
    }
    .col{
        flex: 1;
    }
    .ivu-input:focus{
        border-color: #12d4c9;
    }
    .ivu-spin{
        color: #12d4c9;
    }
</style>
