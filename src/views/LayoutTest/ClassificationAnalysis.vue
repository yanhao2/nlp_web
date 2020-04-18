<template>
    <div class="PartsAnalysis">
        <Card dis-hover class="Card ClassificationAnalysis">
            <p slot="title">分类分析</p>
            <div ref="ClassificationAnalysisId" class="EntityIdentificationEcharts">

            </div>
        </Card>
    </div>
</template>

<script>
  import api from '../../api/api'

  export default {
    props: ['formData'],
    name: "ClassificationAnalysis",
    data() {
      return {
        data: [],
      };
    },
    computed: {},
    methods: {
      initEchart() {
        let ClassificationAnalysisId = this.$refs.ClassificationAnalysisId;
        if (!ClassificationAnalysisId) {
          return false
        }
        const myChart = this.$echarts.init(ClassificationAnalysisId);
        let option = {
          // tooltip : {
          //  show: fa
          // },
          toolbox : {
            show : true,
            feature : {
              mark : { show : true },
              restore : { show : true },
              saveAsImage : { show : true }
            }
          },
          series : [{
            name : '文本分类',
            type : 'gauge',
            center: ["50%", "55%"],
            axisLine : {
              show : true,
            },
            axisTick : {
              show : true,
            },
            axisLabel : {
              distance: -50,
              show : true,
              formatter : function(v) {
                switch (v + '') {
                  case '0' : return '体育';
                  case '10' : return '娱乐';
                  case '20' : return '房产家居';
                  case '30' : return '教育';
                  case '40' : return '旅游';
                  case '50' : return '游戏';
                  case '60' : return '科技';
                  case '70' : return '财经';
                  case '80' : return '汽车';
                  case '90' : return '美妆';
                  case '100' : return '餐饮';
                  default: return '其他';
                }
              },
              textStyle : {
                color : '#333'
              }
            },
            splitLine : {
              show : true,
              length : 2
            },
            pointer : {
              length : '80%',
              width : 8,
              color : 'auto'
            },
            title : {
              show : true,
              offsetCenter : ['-65%', -10],
              textStyle : {
                color : '#333',
                fontSize : 12
              }
            },
            detail : {
              show : true,
              backgroundColor : 'rgba(0,0,0,0)',
              borderWidth : 0,
              borderColor : '#ccc',
              width : 100,
              height : 40,
              formatter: this.data.name,
              textStyle: {
                color: 'auto',
                fontSize : 24
              }
            },
            data : [{
              value : this.data.value,
            }]
          }]
        };
        myChart.setOption(option, true);
      },
      async LoadData(record) {
        try {
          this.data = []
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          let result = await api.classificationAnalysisList(formData)
          if (result.code === 200) {
            this.data = result.data[0]
            this.data.value = this.getValue(this.data.name)
          }
          this.$nextTick(() => {
            this.initEchart()
          })
        } catch (e) {
          console.log(e)
        }
      },
      getValue (v) {
        switch (v + '') {
          case '体育' : return '0';
          case '娱乐' : return '10';
          case '房产家居' : return '20';
          case '教育' : return '30';
          case '旅游' : return '40';
          case '游戏' : return '50';
          case '科技' : return '60';
          case '财经' : return '70';
          case '汽车' : return '80';
          case '美妆' : return '90';
          case '餐饮' : return '100';
          default: return '0';
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
          if (this.$refs.ClassificationAnalysisId) {
            this.$echarts.init(this.$refs.ClassificationAnalysisId).resize()
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

        .ClassificationAnalysis {
            .EntityIdentificationEcharts {
                width: 100%;
                min-height: 300px;
            }
        }
    }
</style>
