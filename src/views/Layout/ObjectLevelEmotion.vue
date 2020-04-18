<template>
    <div class="PartsAnalysis objectLevel">
        <Card dis-hover class="Card">
            <p slot="title">对象层面情感</p>
            <div style="position: relative" v-if="!isShow">
                <div ref="KeywordId" class="KeywordEcharts">

                </div>
                <div style="position: absolute;right: 80px;top: 6px;display: flex;align-items: center;">
                    <div style="display: flex;align-items: center;" v-for="(item, i) in list" :key="i">
                        <div style="width: 30px;height: 15px;border-radius: 3px" :style="{backgroundColor: item.color}"></div>
                        <div style="padding: 0 5px">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div v-else style="min-height: 600px;display: flex;align-items: center;justify-content: center">
                没有对象层面情感
            </div>
            <Spin fix v-show="isList">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>载入中...</div>
            </Spin>
        </Card>
    </div>
</template>

<script>
  import api from "../../api/api";

  export default {
    name: "ObjectLevelEmotion",
    props: ['formData'],
    data() {
      return {
        data: [],
        links: [],
        isList: true,
        isShow: false,
        categories: [],
        list: [{name: '正', color: '#017E03'}, {name: '中', color: '#FF8529'}, {name: '负', color: '#D3333F'}]
      };
    },
    computed: {},
    methods: {
      initEchart() {
        let KeywordId = this.$refs.KeywordId;
        if (!KeywordId) {
          return false
        }
        const myChart = this.$echarts.init(KeywordId);
        let option = {
          color: [
            "#19c7b9",
            "#1919c7",
            "#9f19c7",
          ],
          title: {
            text: '',
            subtext: '',
            x: 'right',
            y: 'bottom'
          },
          tooltip: {
            show: false,
          },
          toolbox: {
            show: true,
            feature: {
              restore: {show: true},
              magicType: {show: true,},
              saveAsImage: {show: true}
            }
          },
          legend: {
            x: 'left',
            data: ['文本', '对象', '层面',]
          },
          series: [{
            type: 'graph',
            layout: 'force',
            legendHoverLink: true,
            focusNodeAdjacency: true,
            force: {
              repulsion: 500
            },
            categories: [
              {
                name: '文本'
              },
              {
                name: '对象'
              },
              {
                name: '层面'
              },
            ],
            label : {
              show : true,
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              lineStyle: {
                width: 5
              }
            },
            roam : true,
            data : this.data,
            links : this.links,
          }]
        };
        myChart.setOption(option, true);
      },
      async LoadData(record) {
        try {
          this.isList = true
          this.data = []
          const data = []
          this.links = []
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          formData.append('industry', 22);
          let result = await api.ObjectLevelEmotionList(formData)

          if (result.code === 200) {
            if (result.data.length === 0) {
              this.isShow = true
            } else {
              this.isShow = false
            }
            console.log(result)
            if (result.data.length > 0) {
              result.data.map((v, i) => {
                data.push({
                  id: v.target.id,
                  name: v.target.name,
                  value: v.target.sentiment,
                  category: 1,
                })
                if (v.beddings.length > 0) {
                  v.beddings.map((item, j) => {
                    data.push({
                      id: item.id,
                      name: item.name,
                      value: item.sentiment,
                      category: 2,
                    })
                  })
                }
              })

              let item = [{id: '-1', name: '文本', showName: '文本', value: 10, category: 0}]
              this.data = [...item, ...data]
              result.data.map((v, i) => {
                this.links.push({
                  source: v.target.id,
                  target: '-1'
                })
                if (v.beddings.length > 0) {
                  v.beddings.map((item, j) => {
                    this.links.push({
                      source: item.id,
                      target: v.target.id,
                    })
                  })
                }
              })
              this.isList = false
              this.data.forEach((node) => {
                if (node.category === 0) {
                  node.symbolSize = 70;
                  node.itemStyle = {
                    normal: {
                      borderColor: '#19c7b9',
                      borderWidth: 5,
                      color: '#19c7b9',
                    },

                  }
                } else if (node.category === 1) {
                  node.symbolSize = 60;
                  node.itemStyle = {
                    normal: {
                      borderColor: '#1919c7',
                      borderWidth: 5,
                      color: node.value > 0 ? "#017E03" : node.value == 0 ? "#FF8529" : node.value < 0 ? "#D3333F" : '',
                    },

                  }
                } else {
                  // 大于0 正面，等于0 中性，小于0 负面
                  node.symbolSize = 70  / 1.5;
                  node.label = {
                    normal: {
                      show: node.symbolSize > 30
                    }
                  };
                  node.itemStyle = {
                    normal: {
                      borderColor: '#9f19c7',
                      borderWidth: 5,
                      color: node.value > 0 ? "#017E03" : node.value == 0 ? "#FF8529" : node.value < 0 ? "#D3333F" : '',
                    },

                  }
                }

                node.category = node.category;
              });
            }
            this.$nextTick(() => {
              this.initEchart()
            })
          }
          this.isList = false
        } catch (e) {
          console.log(e)
        }
      }
    },
    created() {
      if (this.formData.title && this.formData.content) {
        this.LoadData(this.formData)
      }
    },

    mounted() {
    },
    updated() {
    }
  }
</script>

<style lang="scss">
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        position: relative;
        border: 1px solid #eee;
    }
    .objectLevel {
        background-color: #f6f6f6;
        min-height: 600px;
        padding: 20px;

        .KeywordElse {
            min-height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .Card {
            .KeywordEcharts {
                min-height: 600px;
            }
        }
    }
</style>

