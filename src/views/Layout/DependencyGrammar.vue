<template>
    <div class="PartsAnalysis DependencyGrammar">
        <Card dis-hover class="Card">
            <p slot="title">依存文法</p>
            <div class="KeywordEcharts" v-for="(item, i) in dataList">
                <div class="header">
                    <Badge :count="i + 1"></Badge>
                    <div style="padding-left: 10px">{{item.title}}</div>
                </div>
                <div style="overflow-x:auto;">
                    <DependencyGrammarVue :id="'myCanvas' + i" :dataTitle="item.dataTitle" :relations="item.relations"
                                          :positions="item.positions"/>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
  import api from "../../api/api";
  import DependencyGrammarVue from '../../components/DependencyGrammarVue'

  export default {
    name: "DependencyGrammar",
    components: {DependencyGrammarVue},
    props: ['formData'],
    data() {
      return {
        data: [],
        links: [],
        categories: [],
        dataList: []
      };
    },
    computed: {},
    methods: {
      async LoadData(record) {
        try {
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          let result = await api.dependencyGrammarList(formData)
          if (result.code === 200) {
            if (result.data.length > 0) {
              result.data.map((v, i) => {
                v.title = ''
                v.data = []
                v.dataTitle = []
                v.relations = []
                v.positions = []
                if (v.length > 0) {
                  v.map((item, j) => {
                    if (j !== 0) {
                      v.title += item.word
                    }
                    v.data.push({
                      name: item.word,
                    })
                    v.dataTitle.push(item.word)
                    v.relations.push(item.relation)
                    v.positions.push(item.position)
                  })
                }

              })
            }
            this.dataList = result.data
            console.log(this.dataList)
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
    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .demo-spin-col {
        position: relative;
        border: 1px solid #eee;
    }

    .DependencyGrammar {
        background-color: #f6f6f6;
        min-height: 350px;
        padding: 20px;

        .KeywordElse {
            min-height: 350px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .KeywordEcharts {
            min-height: 350px;

            .header {
                display: flex;
                align-items: center;
            }
        }
    }
</style>

