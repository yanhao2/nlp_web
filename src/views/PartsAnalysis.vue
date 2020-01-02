<template>
    <div class="PartsAnalysis">
        <Card dis-hover class="Card">
            <p slot="title">词性分析</p>
            <div class="height">
                <div class="rows">
                    <div class="cols">
                        <div class="content">
                            <div class="item" v-for="(item, i) in word" :style="{backgroundColor: item.bgColor}">{{item.name}}
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div>
                            <div class="title">词性类别图示:</div>
                            <div class="content">
                                <div class="item" v-for="(item, i) in pos" v-if="i < 40"
                                     :style="{backgroundColor: item.bgColor}">{{item.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>

  import api from "../api/api";

  export default {
    props: ['formData',],
    name: "PartsAnalysis",
    data() {
      return {
        word: [],
        pos: [],
        sizeColor: [],
      };
    },
    computed: {},
    methods: {
      getBgColor () {
        var str = "#";
        var arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
        for(var i=0;i<6;i++){
          var num = parseInt(Math.random() * 16);
          str+=arr[num];
        }
        return str;
      },
      async LoadData(record) {
        try {

          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          let result = await api.PartsAnalysisList(formData)
          if (result.code === 200) {
            if (result.data.length > 0) {
              result.data.map((v, i) => {
                v.bgColor = this.getBgColor()
                let isTrue = this.pos.some(function(item) {
                  if (item.name == v.pos) {
                    return true;
                  }
                })
                if (!isTrue) {
                  this.pos.push({
                    name: v.pos,
                    bgColor: v.bgColor,
                  })
                }
                // console.log(this.pos)
                if (this.pos.length > 0) {
                  this.pos.map((items, j) => {
                    if (items.name == v.pos) {
                      this.word.push({
                        name: v.word,
                        bgColor: items.bgColor,
                      })
                    }
                  })
                }
              })
            }
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
        .height{
            min-height: 300px;
        }
        .Card {
            .rows {
                .right {
                    padding-left: 20px;
                    width: 300px;
                    display: flex;
                    justify-content: flex-end;

                    .title {
                        font-weight: bold;
                        font-size: 16px;
                    }

                }

                .content {
                    display: flex;
                    flex-wrap: wrap;

                    .item {
                        padding: 3px 12px;
                        margin-right: 5px;
                        margin-bottom: 5px;
                    }
                }
            }
        }
    }
</style>
