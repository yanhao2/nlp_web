<template>
    <div class="PartsAnalysis objectLevel">
        <Card dis-hover class="Card">
            <p slot="title">对象层面</p>
            <div ref="KeywordId" class="KeywordEcharts">
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
    name: "ObjectLevel",
    props: ['formData'],
    data() {
      return {
        data: [],
        links: [],
        isList: true,
        isShow: true,
        categories: [],
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
            force: {
              repulsion: 500
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
            roam : true,
            data : this.data,
            links : this.links,
          }]
        };
        myChart.setOption(option, true);
      },
      async LoadData(record) {
        try {
          this.data = []
          this.links = []
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          let result = await api.objectLevelList(formData)
          console.log(result)
          if (result.code === 200) {
            if (result.data.length > 0) {
              result.data.map((v, i) => {
                this.data.push({
                  name: v.name,
                  value: 0,
                  category: 0,
                })
                if (v.words.length > 0) {
                  v.words.map((item, j) => {
                    this.data.push({
                      name: item.word,
                      value: item.score,
                      category: 1,
                    })
                  })
                }
              })
              result.data.map((v, i) => {
                if (v.words.length > 0) {
                  v.words.map((item, j) => {
                    this.links.push({
                      source: item.word,
                      target: v.name,
                    })
                  })

                }
              })
              this.isList = false
              this.data.forEach((node) => {
                console.log(node.value)
                if (node.category === 0) {
                  node.symbolSize = 50;
                } else {
                  node.symbolSize = 60  / 1.5 + node.value;
                  node.label = {
                    normal: {
                      show: node.symbolSize > 30
                    }
                  };

                }
                node.itemStyle = null;
                node.category = node.category;
              });

              console.log('data', this.data)
              console.log('links', this.links)
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

