<template>
    <div class="PartsAnalysis">
        <Card dis-hover class="Card cardList EmotionAnalysis">
            <div slot="title">
                <div class="headersIn">
                    <div class="p">情感分析</div>
                    <div class="p">
                        中性区间
                        <Input v-model="form.start" @on-change="onChange" placeholder="" style="width: 80px"/>
                        -
                        <Input v-model="form.end" @on-change="onChange" placeholder="" style="width: 80px"/>
                    </div>
                </div>
            </div>
            <div ref="EmotionAnalysisId" class="EntityIdentificationEcharts">

            </div>
        </Card>
    </div>
</template>

<script>
  import api from "../api/api";

  export default {
    name: "EmotionAnalysis",
    props: ['formData'],
    data() {
      return {
        form: {
          start: '0',
          end: '0'
        },
        text: '',
        fill: '',
        data: '',
        list: []
      };
    },
    computed: {},
    methods: {
      onChange() {
        if (this.form.end && this.form.start) {
          if (this.form.start <= this.data && this.data <= this.form.end) {
            this.list = [
              {value: 0, name: '正'},
              {value: 1, name: '中'},
              {value: 0, name: '负'},
            ]
            this.text = '中'

          } else {
            if (this.data < this.form.start) {
              this.list = [
                {value: 0, name: '正'},
                {value: 0, name: '中'},
                {value: 1, name: '负'},
              ]
              this.text = '负'
            } else if (this.data > this.form.end) {
              this.list = [
                {value: 1, name: '正'},
                {value: 0, name: '中'},
                {value: 0, name: '负'},
              ]
              this.text = '正'
            }
          }
        }
        this.$nextTick(() => {
          this.initEchart()
        })
      },
      async LoadData(record) {
        try {
          this.data = []
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          let result = await api.EmotionAnalysisList(formData)
          if (result.code === 200) {
            this.data = result.data
            if (this.form.start <= this.data && this.data <= this.form.end) {
              this.list = [
                {value: 0, name: '正'},
                {value: 1, name: '中'},
                {value: 0, name: '负'},
              ]
              this.text = '中'
            } else {
              if (this.data < this.form.start) {
                this.list = [
                  {value: 0, name: '正'},
                  {value: 0, name: '中'},
                  {value: 1, name: '负'},
                ]
                this.text = '负'
              } else if (this.data > this.form.end) {
                this.list = [
                  {value: 1, name: '正'},
                  {value: 0, name: '中'},
                  {value: 0, name: '负'},
                ]
                this.text = '正'
              }
            }
          }
          this.$nextTick(() => {
            this.initEchart()
          })
        } catch (e) {
          console.log(e)
        }
      },
      initEchart() {
        let EmotionAnalysisId = this.$refs.EmotionAnalysisId;
        if (!EmotionAnalysisId) {
          return false
        }
        const myChart = this.$echarts.init(EmotionAnalysisId);
        this.fill = this.text == '正' ? "#017E03" : this.text == '中' ?  "#FF8529" : this.text == '负' ?  "#D3333F" : "#000"
        let option = {
          color: [
            "#017E03",
            "#FF8529",
            "#D3333F",
          ],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {d}%"
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['正', '中', '负']
          },
          graphic:{       //图形中间文字
            type:"text",
            left:"center",
            top:"center",
            style:{
              text: this.text,
              textAlign:"center",
              fill: this.fill,
              fontSize: 30
            }
          },
          series: [
            {
              name: '情感分析',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              data: this.list
            }
          ]
        };
        myChart.setOption(option, true);
      },
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

        .EmotionAnalysis {
            .headersIn {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 16px;
            }

            .ivu-card-head {
                padding: 0;
            }

            .EntityIdentificationEcharts {
                width: 100%;
                min-height: 300px;
            }

            .p {
                font-size: 16px;
                color: #17233d;
                font-weight: 500;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>
