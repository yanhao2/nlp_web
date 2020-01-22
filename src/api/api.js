import axios from 'axios'
import store from '../store'
import qs from 'qs'
axios.defaults.timeout = 60000 // timeout in 10 seconds.
axios.defaults.baseURL = store.state.urlApi
export default {
  send (method, uri, data, headers, record, ken) {
    // data = qs(data)
    return new Promise((resolve, reject) => {
      try {
        axios({
          method: method,
          url:  uri,
          data: data,
          params: method === 'POST'  || method === 'PUT'  ? '' : data,
          headers :{
            // 'consumes': 'application/json',
          }
        })
          .then(response => {
            if (response.status === 200) {
              resolve(response.data)
            }
            if (ken === 'token') {
              resolve(response)
            }
          })
          .catch((error) => {
            console.error(error)
            reject(new Error('Communication exception, please check the network or retry later.'))
          })
      } catch (e) {
        console.error(`Exception: ${e}`)
        reject(e)
      }
    })
  },
  // 词性分析
  PartsAnalysisList (data) {
    return this.send('POST', `/nlp_api/v1/seg/getSegPos`, data)
  },
  // 实体识别
  EntityIdentificationList (data) {
    return this.send('POST', `/nlp_api/v1/entry/getEntryByModelWithScore`, data)
  },
  // 关键词
  keywordList (data) {
    return this.send('POST', `/nlp_api/v1/keyword/getKeyWords`, data)
  },
  // 关键短语
  KeyPhraseList (data) {
    return this.send('POST', `/nlp_api/v1/keyword/getKeyPhrases`, data)
  },
  // 新闻摘要
  HeadlineList (data) {
    return this.send('POST', `/nlp_api/v1/keyword/getSummary`, data)
  },
  // 新闻摘要 比例
  HeadlineListBili (data) {
    return this.send('POST', `/nlp_api/v1/keyword/getSummaryBybili`, data)
  },
  // 分类分析
  classificationAnalysisList (data) {
    return this.send('POST', `/nlp_api/v1/classify/getClassify`, data)
  },
  // 情感分析
  EmotionAnalysisList (data) {
    return this.send('POST', `/nlp_api/v1/sentiment/getSentiment`, data)
  },
  // 依存文法
  dependencyGrammarList (data) {
    return this.send('POST', `/nlp_api/v1/dependency/getDependency`, data)
  },
  // 主体提取
  SubjectExtractList (data) {
    return this.send('POST', `/nlp_api/v1/subject/getSubject`, data)
  },
  // 主题提取
  extractThemeList (data) {
    return this.send('POST', `/nlp_api/v1/topic/getTopic`, data)
  },
  // 对象层面
  objectLevelList (data) {
    return this.send('POST', `/nlp_api/v1/level/getLevels`, data)
  },
  // 获取数据
  LayoutList (data) {
    return this.send('POST', `/nlp_api/v1/data/getOneData`, data)
  },
  // 对象层面情感
  ObjectLevelEmotionList (data) {
    return this.send('POST', `/nlp_api/v1/sentiment/getTargetsRelationSentiment`, data)
  },
}