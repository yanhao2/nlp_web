<template>
    <div class="Layout">
        <div class="sorcoll">
            <div class="wrapper">
                <div class="nav">
                    <div class="paddTop">
                        <Form :model="formData" label-position="top">
                            <FormItem label="标题">
                                <Input v-model="formData.title"></Input>
                            </FormItem>
                            <FormItem label="正文">
                                <Input v-model="formData.content" type="textarea" :autosize="{minRows: 6,maxRows: 6}"  placeholder=""></Input>
                            </FormItem>
                            <FormItem style="text-align: center">
                                <div style="display: flex;align-items: center;justify-content: center">
                                    <div style="padding-right: 10px">行业:</div>
                                    <Select v-model="industry" style="width:100px;margin-right: 15px;text-align: left">
                                        <Option value="0">全部</Option>
                                        <Option value="22">汽车</Option>
                                    </Select>
                                    <Button type="primary" @click="AutomaticAccess(formData)" style="margin-right: 15px">自动获取数据</Button>
                                    <Button type="primary" @click="handleSubmit(formData)">开始分析</Button>
                                </div>

                            </FormItem>
                        </Form>
                    </div>
                    <el-tabs v-model="tabSName" @tab-click="tabClick">
                        <el-tab-pane v-for="(item, i) in navList" :key="i" :name="item.value" >
                            <span slot="label">
                                <i v-html="item.icon"></i>
                               {{item.name}}
                            </span>
                            <div :class="tabSName" v-if="item.value === routers" v-show="formData.title|| formData.content">
                                <router-view :ref="item.value" :formData="formData" @handleSubmitEvent="handleSubmit" :class="'item' + i" />
                            </div>
                            <div style="height: 50px;"></div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
   import api from "../api/api";
   import Headers from "../components/Headers";
  export default {
    name: "Layout",
    components: {Headers},
    data() {
      return {
        industry: '0',
        formData: {
          // title: '章子怡刘嘉玲好友突逝！泡温泉竟成罪魁祸首？',
          title: '',
          content:''
          // content: '。12月20日早上7点29分，章子怡、刘嘉玲的好友、上海名媛张瀞仁在日本去世，死因是因为泡温泉诱发脑溢血，导致血管崩裂不治身亡。图：从左至右依次为刘嘉玲、张瀞仁、章子怡张瀞仁今年53岁，是博达福泓的董事，曾经还上过富豪榜。她的老公吴侨峰是台聚集团创办人吴寿松的小儿子，早年从台湾到上海做房地产生意，现任聚华贸易有限公司的董事。去世的前两日（12月18日），张瀞仁在微博上称“开启了一年一度的滑雪季”。之后，在离世的前一日（12月19日），张瀞仁又在自己的社交平台发布了一张自拍照。照片中，她穿着一件黑色羽绒服，搭配一双白色雪地靴，状态看上去十分不错。没想到这也成了她留在人世间最后的倩影。此前，有外界传言称张瀞仁是因为滑雪跌倒不幸摔到了脑部去世，后来张瀞仁的亲友告知媒体，张瀞仁是因为泡温泉引起的脑溢血去世的。张瀞仁生前和娱乐圈中的不少明星交好，章子怡、安以轩、刘嘉玲、陈乔恩等人都是她的好朋友。据悉，张瀞仁的微博名 @上海吴太 就是出自好友刘嘉玲之手。张瀞仁生前陪伴章子怡多年，两人曾经一起出游，张瀞仁也曾经去剧组探班章子怡，作为大姐姐的张瀞仁很是照顾章子怡。张瀞仁生前是非常友善的人，本来还准备在1月8日邀请好友们一起庆祝新年，没想到t来源：最江阴。'
        },
        index: 0,
        tabSName: '/partsAnalysis',
        navList: [
          {name: '分词及词性', icon: '<span class="iconfont">&#xe709;</span>', value: '/partsAnalysis', data: 'partsAnalysis'},
          {name: '对象层面情感', icon: '<span class="iconfont">&#xe7d4;</span>', value: '/objectLevelEmotion', data: 'objectLevelEmotion'},
          {name: '实体识别', icon: '<span class="iconfont">&#xe61d;</span>', value: '/entityIdentification',data: 'entityIdentification',},
          // {name: '依存文法', icon: '<span class="iconfont">&#xe600;</span>', value: '/dependencyGrammar', data: 'dependencyGrammar'},
          {name: '分类分析', icon: '<span class="iconfont">&#xe607;</span>', value: '/classificationAnalysis' , data: 'classificationAnalysis'},
          {name: '情感分析', icon: '<span class="iconfont">&#xe615;</span>', value: '/emotionAnalysis', data: 'emotionAnalysis'},
          {name: '主体提取', icon: '<span class="iconfont">&#xe667;</span>', value: '/subjectExtract', data: 'subjectExtract'},
          {name: '主题提取', icon: '<span class="iconfont">&#xe6c2;</span>', value: '/extractTheme', data: 'extractTheme'},
          {name: '对象层面', icon: '<span class="iconfont">&#xe7d4;</span>', value: '/objectLevel', data: 'objectLevel'},
          {name: '关键词', icon: '<span class="iconfont">&#xe6eb;</span>', value: '/keyword' , data: 'keyword'},
          {name: '关键短语', icon: '<span class="iconfont">&#xe635;</span>', value: '/keyPhrase', data: 'keyPhrase'},
          {name: '新闻摘要', icon: '<span class="iconfont">&#xe65f;</span>', value: '/headline', data: 'headline'},
        ]
      };
    },
    computed: {
      routers () {
        return this.$route.path
      }
    },
    methods: {
      tabClick (val) {
        this.$router.push({
          path: this.tabSName
        })
      },
      AutomaticAccess () {
        this.LoadData()
      },
      async LoadData() {
        try {
          let formData = new FormData();
          formData.append('isIndustry',  this.industry == '0' ? false : true);
          formData.append('industry', this.industry == '0' ? '' :  this.industry );
          let result = await api.LayoutList(formData)
          if (result.code === 200) {
            this.formData = result.data[0]
          }
        } catch (e) {
          console.log(e)
        }
      },
      handleSubmit () {
        this.$refs[this.tabSName][0].LoadData(this.formData)
      }
    },
    created() {
      this.tabSName  = this.routers
    },

    mounted() {
    },
    updated() {
    }
  }
</script>

<style lang="scss">
    @import "../css/iconFontSize/iconfont.css";
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
</style>
