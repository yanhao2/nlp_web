<template>
    <div class="PartsAnalysis">
        <Card dis-hover class="Card">
            <p slot="title">新闻摘要</p>
            <div ref="KeywordId" class="KeywordEcharts" v-if="word">
                <div style="display: flex;align-items: center;justify-content: flex-end">
                    <RadioGroup v-model="bili" type="button" @on-change="onChange">
                        <Radio label="0.2">20%</Radio>
                        <Radio label="0.3">30%</Radio>
                        <Radio label="0.4">40%</Radio>
                        <Radio label="0.5">50%</Radio>
                    </RadioGroup>
                </div>
                <div>{{word}}</div>
            </div>
            <div v-else class="KeywordElse">
                <div>没有数据</div>
            </div>
        </Card>
    </div>
</template>

<script>
  import api from "../api/api";

  export default {
    name: "Headline",
    props: ['formData'],
    data() {
      return {
        word: '',
        bili: ''
      };
    },
    computed: {},
    methods: {
      async LoadData(record) {
        try {
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          let result = await api.HeadlineList(formData)
          if (result.code === 200) {
            this.word = result.data
          }
        } catch (e) {
          console.log(e)
        }
      },
      onChange () {
        this.LoadDataBili(this.formData)
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
