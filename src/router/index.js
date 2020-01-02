import Vue from 'vue'
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "about" */ '../views/Layout.vue'),
    children: [
      {
        path: '/',
        name: '词性分析',
        component: () => import(/* webpackChunkName: "about" */ '../views/PartsAnalysis.vue'),
      },
      {
        path: '/partsAnalysis',
        name: '词性分析1',
        component: () => import(/* webpackChunkName: "about" */ '../views/PartsAnalysis.vue'),
      },
      {
        path: '/entityIdentification',
        name: '实体识别',
        component: () => import(/* webpackChunkName: "about" */ '../views/EntityIdentification.vue'),
      },
      {
        path: '/dependencyGrammar',
        name: '依存文法',
        component: () => import(/* webpackChunkName: "about" */ '../views/DependencyGrammar.vue'),
      },
      {
        path: '/keyword',
        name: '关键词',
        component: () => import(/* webpackChunkName: "about" */ '../views/Keyword.vue'),
      },
      {
        path: '/keyPhrase',
        name: '关键短语',
        component: () => import(/* webpackChunkName: "about" */ '../views/KeyPhrase.vue'),
      },
      {
        path: '/headline',
        name: '新闻摘要',
        component: () => import(/* webpackChunkName: "about" */ '../views/Headline.vue'),
      },
      {
        path: '/classificationAnalysis',
        name: '分类分析',
        component: () => import(/* webpackChunkName: "about" */ '../views/ClassificationAnalysis.vue'),
      },
      {
        path: '/emotionAnalysis',
        name: '情感分析',
        component: () => import(/* webpackChunkName: "about" */ '../views/EmotionAnalysis.vue'),
      },
      {
        path: '/subjectExtract',
        name: '主体提取',
        component: () => import(/* webpackChunkName: "about" */ '../views/SubjectExtract.vue'),
      },
      {
        path: '/extractTheme',
        name: '主题提取',
        component: () => import(/* webpackChunkName: "about" */ '../views/ExtractTheme.vue'),
      },
      {
        path: '/objectLevel',
        name: '对象层面',
        component: () => import(/* webpackChunkName: "about" */ '../views/ObjectLevel.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
