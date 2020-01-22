<template>
    <div style="height: 100%">
        <div class="headers">
            <div class="wrapper rows">
                <div class="Headers_title" >新联中文语义演示平台</div>
                <Menu mode="horizontal" :theme="theme1" active-name="partsAnalysis" @on-select="onSelectClick">
                    <MenuItem name="partsAnalysis">
                        NLP文本分析
                    </MenuItem>
                    <MenuItem name="aIRecognition">
                        AI图像识别
                    </MenuItem>
                </Menu>
            </div>
        </div>
        <div style="height: calc(100% - 80px)">
            <router-view/>
        </div>
    </div>

</template>

<script>
  export default {
    name: "Headers",
    data() {
      return {
        theme1: 'light'
      };
    },
    computed: {},
    methods: {
      onSelectClick (name) {
        this.$router.push({
          path: name
        })
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
    .headers{
        background-color: #061840;
        .ivu-menu, .ivu-menu-item{
            font-size: 16px;
        }
        .ivu-menu-light{
            background-color: #061840;
        }
        .ivu-menu-horizontal{
            height: 80px;
            line-height: 80px;
        }
        .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover{
            color: #fff;
            border-bottom: 2px solid #fff;
        }
        .wrapper{
            height: 80px;
            align-items: center;
            .Headers_title {
                margin-right: 20px;
                color: #fff;
                font-size: 20px;
            }
        }
    }
</style>
