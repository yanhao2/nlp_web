<template>
    <div class="PartsAnalysis">
        <Card dis-hover class="Card">
            <p slot="title">实体识别</p>
            <div ref="EntityIdentificationId" class="EntityIdentificationEcharts">

            </div>
        </Card>
    </div>
</template>

<script>
  import api from '../api/api'

  export default {
    props: ['formData'],
    name: "EntityIdentification",
    data() {
      return {
        data: [],
        links: [],
      };
    },
    computed: {},
    methods: {
      initEchart() {
        let EntityIdentificationId = this.$refs.EntityIdentificationId;
        if (!EntityIdentificationId) {
          return false
        }
        const myChart = this.$echarts.init(EntityIdentificationId);
        let option = {
          grid: {
            top: '20',
            bottom: '20'
          },
          title : {
            text : '',
            subtext : '',
            x : 'right',
            y : 'bottom'
          },
          // tooltip : {
          // },
          toolbox : {
            show : true,
            feature : {
              restore : { show : true },
              magicType : { show : true,},
              saveAsImage : { show : true }
            }
          },
          legend : {
            x : 'left',
            data : ['实体类型', '实体内容']
          },
          series : [{
            left: 'center',
            top: '100',
            bottom: '100',
            type: 'graph',
            layout: 'force',
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            legendHoverLink: true,
            focusNodeAdjacency: true,
            force: {
              repulsion: 200
            },
            name : "内容",
            categories : [
              {
                name : '文本'
              },
              {
                name : '实体类型'
              },
              {
                name : '实体内容'
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
            // itemStyle : {
            //   normal : {
            //
            //     nodeStyle : {
            //       brushType : 'both',
            //       borderColor : 'rgba(255,215,0,0.4)',
            //       borderWidth : 1
            //     },
            //     lineStyle: {
            //       color: 'source',
            //       curveness: 0.3
            //     },
            //   },
            //   emphasis: {
            //     lineStyle: {
            //       width: 10
            //     }
            //   }
            // },
            roam : false,
            data : this.data,
            links : this.links,
          }]
        };
        myChart.setOption(option);
      },
      async LoadData(record) {
        try {
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          let result = await api.EntityIdentificationList(formData)
          console.log(result)
          if (result.code === 200) {
            if (result.data.length > 0) {
              result.data.map((v, i) => {
                this.data.push({
                  name: v.name,
                  category: 1,
                })
                if (v.words.length > 0) {
                  v.words.map((items, k) => {
                    this.data.push({
                      name: items,
                      category: 2,
                    })
                  })
                }
            console.log(v)
              })
              let data = [{name: '文本', category: 0}]
              this.data = [...data, ...this.data]
              this.data.forEach((node) => {
                if (node.category === 0) {
                  node.symbolSize = 50;
                }
                node.itemStyle = null;
                node.symbolSize = 60
                node.value = node.symbolSize;
                node.symbolSize /= 1.5;
                node.label = {
                  normal: {
                    show: node.symbolSize > 30
                  }
                };
                node.category = node.category;
              });

              console.log('data', this.data)
              result.data.map((v, i) => {
                this.links.push({
                  source: v.name,
                  target: "文本",
                  name: "实体",
                })
                if (v.words.length > 0) {
                  v.words.map((items, k) => {
                    this.links.push({
                      source: v.name,
                      target: items,
                      name: "内容",
                    })
                  })
                }
              })
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
      if (this.formData.title || this.formData.content) {
        this.LoadData(this.formData)
      }
    },

    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          if (this.$refs.EntityIdentificationId) {
            this.$echarts.init(this.$refs.EntityIdentificationId).resize()
          }
        })
      })
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

        .Card {
            .EntityIdentificationEcharts {
                width: 100%;
                height: 300px;
            }
        }
    }
</style>

