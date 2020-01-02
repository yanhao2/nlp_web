<template>
    <div class="PartsAnalysis">
        <Card dis-hover class="Card">
            <p slot="title">主题提取</p>
            <div v-if="listData">
                <div ref="KeywordId" class="KeywordEcharts">
                </div>
            </div>
            <div class="KeywordElse" v-else>
                <div>没有数据</div>
            </div>
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
        listData: '',
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
            symbolSize: 40,
            force: {
              repulsion: 300
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
                label: {
                  show: true,
                },
                nodeStyle: {
                  brushType: 'both',
                  borderColor: 'rgba(255,215,0,0.4)',
                  borderWidth: 1
                },
                lineStyle: {
                  color: 'source',
                  curveness: 0.3
                },
              },
              emphasis: {
                lineStyle: {
                  width: 10
                }
              }
            },
            roam: true,
            data: this.data,
            links: this.links,
          }]
        };
        myChart.setOption(option);
      },
      async LoadData(record) {
        try {
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          let result = await api.extractThemeList(formData)
          console.log(result)
          if (result.code === 200) {
            this.listData = result.data
            let data = [
              {name: '主题', category: 0},
              {name: result.data, category: 1}
            ]
            if (data.length > 0) {
              data.map((v, i) => {
                this.data.push({
                  name: v.name,
                  category: v.category,
                })
                this.links.push({
                  source: v.name,
                  target: "主题",
                })
              })

              console.log('data', this.data)
            }
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

