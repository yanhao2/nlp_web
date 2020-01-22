<template>
    <div class="PartsAnalysis">
        <Card dis-hover class="Card">
            <p slot="title">分词及词性</p>
            <div class="height">
                <div class="rows">
                    <div class="cols sorcolls">
                        <div class="content">
                            <div class="item" v-for="(item, i) in word" :style="{backgroundColor: item.bgColor}">{{item.name}}
                            </div>
                        </div>
                    </div>
                    <div class="right sorcolls">
                        <div >
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
        let str = "rgb(" +Math.round(Math.random() * 255) +", " +Math.round(Math.random() * 255) + ", " +Math.round(Math.random() * 255) + ")"
        return str;
      },
      async LoadData(record) {
        try {
          this.pos = []
          this.word = []
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
                        color: #fff;
                    }
                }
            }
        }
        .sorcolls{
            overflow-y: auto;
            height: 300px;
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
