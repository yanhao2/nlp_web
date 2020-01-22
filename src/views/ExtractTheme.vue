<template>
    <div class="PartsAnalysis">
        <Card dis-hover class="Card">
            <p slot="title">主题提取</p>
            <div v-if="data.length > 0">
                <div ref="KeywordId" class="KeywordEcharts">
                </div>
            </div>
            <div class="KeywordElse" v-else>
                <div>未提取到主题</div>
            </div>
            <Spin fix v-show="isList">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>

        </Card>
    </div>
</template>

<script>
  import api from "../api/api";

  export default {
    name: "ExtractTheme",
    props: ['formData'],
    data() {
      return {
        data: [],
        links: [],
        isList: true,
        industry: '22'
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
          grid: {
            top: '20',
            bottom: '20'
          },
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
            data: ['父节点', '子节点']
          },
          series: [{
            type: 'graph',
            layout: 'force',
            legendHoverLink: true,
            focusNodeAdjacency: true,
            symbolSize: 40,
            force: {
              repulsion: 600
            },
            categories: [
              {
                name: '父节点'
              },
              {
                name: '子节点'
              }
            ],
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 1,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              }
            },
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
            roam : false,
            data: this.data,
            links: this.links,
          }]
        };
        myChart.setOption(option, true);
      },
      async LoadData(record) {
        try {
          this.data = []
          this.links = []
          this.isList = true
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          let result = await api.extractThemeList(formData)
          console.log(result)
          if (result.code === 200) {
            this.listData = result.data
            let data = [
              {name: '主题', category: 0},
            ]
            if (this.listData.length > 0) {
              this.listData.map((v, i) => {
                this.data.push({
                  name: v,
                  category: 1,
                })
                this.links.push({
                  source: v,
                  target: "主题",
                })
              })
              this.data = [...data, ...this.data]
              this.data.forEach((node) => {
                if (node.category === 0) {
                  node.symbolSize = 50;
                } else {
                  node.symbolSize = 60
                  node.symbolSize /= 1.5;
                  node.label = {
                    normal: {
                      show: node.symbolSize > 30
                    }
                  };

                }
                node.itemStyle = null;
                node.category = node.category;
              });
            } else {
              this.data = []
            }

            this.isList = false
            this.$nextTick(() => {
              this.initEchart()
            })
          }
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
    .PartsAnalysis {
        background-color: #f6f6f6;
        min-height: 300px;
        padding: 20px;

        .KeywordElse {
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .Card {
            .KeywordEcharts {
                height: 300px;
            }
        }
    }
</style>

