<template>
    <div class="PartsAnalysis EntityIdentification">
        <Card dis-hover class="Card">
            <p slot="title">实体识别</p>
            <div ref="EntityIdentificationId" class="EntityIdentificationEcharts">

            </div>
            <Spin fix v-show="isList">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>载入中...</div>
            </Spin>
        </Card>
    </div>
</template>

<script>
  import api from '../../api/api'
  import pinyin from "pinyin";

  export default {
    props: ['formData'],
    name: "EntityIdentification",
    data() {
      return {
        data: [],
        links: [],
        isList: true
      };
    },
    computed: {},
    methods: {
      pinyin: pinyin,
      initEchart() {
        let EntityIdentificationId = this.$refs.EntityIdentificationId;
        if (!EntityIdentificationId) {
          return false
        }
        const myChart = this.$echarts.init(EntityIdentificationId);
        let option = {
          title: {
            text: '',
            subtext: '',
            x: 'right',
            y: 'bottom'
          },
          // tooltip : {
          // },
          toolbox: {
            show: true,
            feature: {
              restore: {show: true},
              magicType: {show: true,},
              saveAsImage: {show: true}
            }
          },
          legend: {
            x: 'left',
            data: ['实体', '实体词']
          },
          series: [{
            type: 'graph',
            layout: 'force',
            legendHoverLink: true,
            focusNodeAdjacency: true,
            force: {
              repulsion: 300
            },
            categories: [
              {
                name: '实体'
              },
              {
                name: '实体词'
              }
            ],
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 1,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              }
            },
            label: {
              show: true,
              formatter: function (params) {
                return params.data.showName //此处为label转换
              }

            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              lineStyle: {
                width: 5
              }
            },
            roam: true,
            data: this.data,
            links: this.links,
          }]
        };
        myChart.setOption(option, true);
      },
      async LoadData(record) {
        try {
          this.isList = true
          const data = []
          this.links = []
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          let id = 1
          let result = await api.EntityIdentificationListTest(formData)
          if (result.code === 200) {
            let List = this.deteleObject(result.data)
            if (List.length > 0) {
              List = this.deteleObject(List)
              List.map((v, i) => {
                data.push({
                  id: v.code,
                  showName: v.name,
                  category: 0,
                })
                if (v.words.length > 0) {
                  v.words = this.deteleObject(v.words)
                  v.words.map((item, j) => {
                    data.push({
                      id: i + item.id,
                      value: item.score,
                      showName: item.word,
                      category: 1,
                    })
                  })
                }
              })
              let item = [{name: '文本0', showName: '文本', category: 0}]
              this.data = [...item, ...data]
              this.data.forEach((node, i) => {
                if (node.category === 0) {
                  node.symbolSize = 50;
                } else {
                  node.symbolSize = 50 / 1.5 + node.value;
                  node.category = node.category;
                }
              });
              List.map((v, i) => {
                this.links.push({
                  source: v.code,
                  target: '文本0'
                })
                if (v.words.length > 0) {
                  v.words.map((items, k) => {
                    this.links.push({
                      source: i + items.id,
                      target: v.code,
                    })
                  })
                }
              })
            }
            this.isList = false
            this.$nextTick(() => {
              this.initEchart()
            })
          }
        } catch (e) {
          console.log(e)
        }
      },
      deteleObject(obj) {
        var uniques = [];
        var stringify = {};
        for (var i = 0; i < obj.length; i++) {
          var keys = Object.keys(obj[i]);
          keys.sort(function (a, b) {
            return (Number(a) - Number(b));
          });
          var str = '';
          for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j]);
            str += JSON.stringify(obj[i][keys[j]]);
          }
          if (!stringify.hasOwnProperty(str)) {
            uniques.push(obj[i]);
            stringify[str] = true;
          }
        }
        uniques = uniques;
        return uniques;
      },
    },
    created() {
      if (this.formData.title || this.formData.content) {
        this.LoadData(this.formData)
      }
    },

    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          if (this.$refs.EntityIdentificationId) {
            this.$echarts.init(this.$refs.EntityIdentificationId).resize()
          }
        })
      })
    },
    updated() {
    }
  }
</script>

<style lang="scss">
    .EntityIdentification {
        background-color: #f6f6f6;
        padding: 20px;

        .Card {
            .EntityIdentificationEcharts {
                width: 100%;
                min-height: 600px;
            }
        }
    }
</style>

