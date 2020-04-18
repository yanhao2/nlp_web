<template>
    <div class="PartsAnalysis">
        <Card dis-hover class="Card">
            <p slot="title">主体提取</p>
            <div ref="KeywordId" class="KeywordEcharts" v-if="data.length > 0">
            </div>
            <div class="KeywordElse" v-else>
                <div>未提取到主体</div>
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
    name: "SubjectExtract",
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
          title : {
            text : '',
            subtext : '',
            x : 'right',
            y : 'bottom'
          },
          tooltip : {
            show: false,
          },
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
            data : ['父节点', '子节点']
          },
          series : [{
            type: 'graph',
            layout: 'force',
            legendHoverLink: true,
            focusNodeAdjacency: true,
            symbolSize: 40,
            force: {
              repulsion: 600
            },
            categories : [
              {
                name : '父节点'
              },
              {
                name : '子节点'
              }
            ],
            itemStyle : {
              normal : {
                label : {
                  show : true,
                },
                nodeStyle : {
                  brushType : 'both',
                  borderColor : 'rgba(255,215,0,0.4)',
                  borderWidth : 1
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
          this.links = []
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content',record.content);
          formData.append('industry', this.industry == '0' ? '' : this.industry);
          let result = await api.SubjectExtractList(formData)
          console.log(result)
          if (result.code === 200) {
            if (result.data.length > 0) {
              result.data.map((v, i) => {
                this.data.push({
                  name: v.name,
                  category: 1,
                })
                this.links.push({
                  source: v.name,
                  target: "主体",
                })
              })
              let data = [{name: '主体', category: 0}]
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
        .KeywordElse{
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

