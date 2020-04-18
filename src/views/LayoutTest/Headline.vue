<template>
    <div class="PartsAnalysis Headline">
        <Card dis-hover class="Card">
            <p slot="title">新闻摘要</p>
            <div ref="KeywordId" class="KeywordEcharts" v-if="word">
                <div style="display: flex;align-items: center;justify-content: flex-end">
                    <RadioGroup v-model="bili" type="button" @on-change="onChange">
                        <Radio label="1">自动</Radio>
                        <Radio label="0.2">20%</Radio>
                        <Radio label="0.3">30%</Radio>
                        <Radio label="0.4">40%</Radio>
                        <Radio label="0.5">50%</Radio>
                    </RadioGroup>
                </div>
                <div style="height: 260px;overflow-y: auto;margin: 10px 0;" class="sorcolls">{{word}}</div>
            </div>
            <div  class="KeywordElse" v-else>
                <div>没有新闻摘要</div>
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
    name: "Headline",
    props: ['formData'],
    data() {
      return {
        word: '',
        bili: '1',
        isList: true,
      };
    },
    computed: {},
    methods: {
      async LoadData(record) {
        try {
          this.word = []
          this.isList = true
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          let result = await api.HeadlineList(formData)
          if (result.code === 200) {
            this.word = result.data
          }
          this.isList = false
        } catch (e) {
          console.log(e)
        }
      },
      onChange () {
        if (this.bili == 1) {
          this.LoadData(this.formData)
        } else {
          this.LoadDataBili(this.formData)
        }

      },
      async LoadDataBili(record) {
        try {
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          formData.append('bili', this.bili);
          let result = await api.HeadlineListBili(formData)
          if (result.code === 200) {
            this.word = result.data
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
    .Headline {
        background-color: #f6f6f6;
        min-height: 300px;
        padding: 20px;
        .KeywordElse{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .Card {
            .KeywordEcharts {
                min-height: 300px;
            }
        }
        .sorcolls::-webkit-scrollbar {/*滚动条整体样式*/
            width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 5px;
        }

        .sorcolls::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(144,147,153,.4);
            background: #f5f5f5;
        }

        .sorcolls::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px #fff;
            background: #fff;
        }
    }
</style>
