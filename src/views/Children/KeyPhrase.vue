<template>
    <div class="PartsAnalysis">
        <Card dis-hover class="Card">
            <p slot="title">关键短语</p>
            <div ref="KeywordId" class="KeywordEcharts" v-if="word.length > 0">

            </div>
            <div  class="KeywordElse" v-else>
                <div>没有关键短语</div>
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
    name: "KeyPhrase",
    props: ['formData'],
    data() {
      return {
        word: [],
        isList: true
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
        var num = '';
        for (var i = 0; i < 3; i++) {
          num += Math.floor(Math.random() * 10);
        }
        const words = []
        this.word.map((v, i) => {
          words.push({
            name: v.word,
            value: v.score
          })
        })
        myChart.setOption({
          tooltip: {
            show: true
          },
          toolbox : {
            show : true,
            feature : {
              mark : { show : true },
              restore : { show : true },
              saveAsImage : { show : true }
            }
          },
          series: [
            {
              name: "",
              type: "wordCloud",
              size: ["100%", "100%"],
              textPadding: 0,
              autoSize: {
                enable: true,
                minSize: 14
              },
              textStyle: {
                normal: {
                  color: function () {
                    return (
                      "rgb(" +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ")"
                    );
                  }
                }
              },
              data: words
            }
          ],
          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }, true);
      },
      async LoadData(record) {
        try {
          this.word = []
          this.isList = true
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          let result = await api.KeyPhraseList(formData)
          if (result.code === 200) {
            this.word = result.data
          }
          this.isList = false
          this.$nextTick(() => {
            this.initEchart()
          })
        } catch (e) {
          console.log(e)
        }
      }
    },
    created() {
        console.log(this.formData)
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
