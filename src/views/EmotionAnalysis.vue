<template>
    <div class="PartsAnalysis">
        <Card dis-hover class="Card cardList">
            <div slot="title">
                <div class="headersIn">
                    <div class="p">情感分析</div>
                    <div class="p">
                        中性区间
                        <Input v-model="form.start" @on-change="onChange" placeholder="" style="width: 80px" />
                        -
                        <Input v-model="form.end" @on-change="onChange" placeholder="" style="width: 80px" />
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
        form:{
          start: 0,
          end: 0
        },
        data: '',
        list: []
      };
    },
    computed: {},
    methods: {
      onChange () {
        if (this.form.start > this.form.end) {
          this.$Message.error({
            background: true,
            content: '前值要不能大于后值'
          });
        } else {
          if (this.data > this.form.end) {
            this.list =  [
              {value:1, name:'正'},
              {value:0, name:'中'},
              {value:0, name:'负'},
            ]
          }
          if  (this.data < this.form.end) {
            this.list =  [
              {value:0, name:'正'},
              {value:0, name:'中'},
              {value:1, name:'负'},
            ]
          }
          if  (this.data >= this.form.start || this.data <  this.form.end) {
            this.list =  [
              {value:0, name:'正'},
              {value:1, name:'中'},
              {value:0, name:'负'},
            ]
          }
          this.$nextTick(() => {
            this.initEchart()
          })
        }
      },
      async LoadData(record) {
        try {
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content',record.content);
          let result = await api.EmotionAnalysisList(formData)
          console.log(result)
          if (result.code === 200) {
            this.data = result.data
            if (this.data > this.form.end) {
              this.list =  [
                {value:1, name:'正'},
                {value:0, name:'中'},
                {value:0, name:'负'},
              ]
            }
            if  (this.data < this.form.end) {
              this.list =  [
                {value:0, name:'正'},
                {value:0, name:'中'},
                {value:1, name:'负'},
              ]
            }
            if  (this.data >= this.form.start || this.data <  this.form.end) {
              this.list =  [
                {value:0, name:'正'},
                {value:1, name:'中'},
                {value:0, name:'负'},
              ]
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

        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {d}%"
          },
          toolbox : {
            show : true,
            feature : {
              mark : { show : true },
              restore : { show : true },
              saveAsImage : { show : true }
            }
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['正','中','负']
          },
          series: [
            {
              name:'情感分析',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
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
        myChart.setOption(option);
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

        .cardList {
            .headersIn{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 16px;
            }
            .ivu-card-head{
                padding: 0;
            }
            .EntityIdentificationEcharts {
                width: 100%;
                height: 300px;
            }
            .p{
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
