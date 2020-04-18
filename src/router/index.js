import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

let router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Headers',
            component: () => import('../components/Headers.vue'),
            children: [
                {
                    path: '/',
                    name: 'Layout',
                    component: () => import('../views/Layout/Layout.vue'),
                    redirect: '/partsAnalysis',
                    children: [
                        {
                            path: '/partsAnalysis',
                            name: '词性分析1',
                            component: () => import('../views/Layout/PartsAnalysis.vue'),
                        },
                        {
                            path: '/objectLevelEmotion',
                            name: '对象层面情感',
                            component: () => import('../views/Layout/ObjectLevelEmotion.vue'),
                        },

                        {
                            path: '/entityIdentification',
                            name: '实体识别',
                            component: () => import('../views/Layout/EntityIdentification.vue'),
                        },
                        {
                            path: '/dependencyGrammar',
                            name: '依存文法',
                            component: () => import('../views/Layout/DependencyGrammar.vue'),
                        },
                        {
                            path: '/keyword',
                            name: '关键词',
                            component: () => import('../views/Layout/Keyword.vue'),
                        },
                        {
                            path: '/keyPhrase',
                            name: '关键短语',
                            component: () => import('../views/Layout/KeyPhrase.vue'),
                        },
                        {
                            path: '/headline',
                            name: '新闻摘要',
                            component: () => import('../views/Layout/Headline.vue'),
                        },
                        {
                            path: '/classificationAnalysis',
                            name: '分类分析',
                            component: () => import('../views/Layout/ClassificationAnalysis.vue'),
                        },
                        {
                            path: '/emotionAnalysis',
                            name: '情感分析',
                            component: () => import('../views/Layout/EmotionAnalysis.vue'),
                        },
                        {
                            path: '/subjectExtract',
                            name: '主体提取',
                            component: () => import('../views/Layout/SubjectExtract.vue'),
                        },
                        {
                            path: '/extractTheme',
                            name: '主题提取',
                            component: () => import('../views/Layout/ExtractTheme.vue'),
                        },
                        {
                            path: '/objectLevel',
                            name: '对象层面',
                            component: () => import('../views/Layout/ObjectLevel.vue'),
                        },
                    ]
                },
                {
                    path: '/',
                    name: 'LayoutTest',
                    component: () => import('../views/LayoutTest/Layout.vue'),
                    redirect: '/partsAnalysisTest',
                    children: [
                        {
                            path: '/partsAnalysisTest',
                            name: '词性分析Test',
                            component: () => import('../views/LayoutTest/PartsAnalysis.vue'),
                        },
                        {
                            path: '/objectLevelEmotionTest',
                            name: '对象层面情感Test',
                            component: () => import('../views/LayoutTest/ObjectLevelEmotion.vue'),
                        },

                        {
                            path: '/entityIdentificationTest',
                            name: '实体识别Test',
                            component: () => import('../views/LayoutTest/EntityIdentification.vue'),
                        },
                        {
                            path: '/dependencyGrammarTest',
                            name: '依存文法Test',
                            component: () => import('../views/LayoutTest/DependencyGrammar.vue'),
                        },
                        {
                            path: '/keywordTest',
                            name: '关键词Test',
                            component: () => import('../views/LayoutTest/Keyword.vue'),
                        },
                        {
                            path: '/keyPhraseTest',
                            name: '关键短语Test',
                            component: () => import('../views/LayoutTest/KeyPhrase.vue'),
                        },
                        {
                            path: '/headlineTest',
                            name: '新闻摘要Test',
                            component: () => import('../views/LayoutTest/Headline.vue'),
                        },
                        {
                            path: '/classificationAnalysisTest',
                            name: '分类分析Test',
                            component: () => import('../views/LayoutTest/ClassificationAnalysis.vue'),
                        },
                        {
                            path: '/emotionAnalysisTest',
                            name: '情感分析Test',
                            component: () => import('../views/LayoutTest/EmotionAnalysis.vue'),
                        },
                        {
                            path: '/subjectExtractTest',
                            name: '主体提取Test',
                            component: () => import('../views/LayoutTest/SubjectExtract.vue'),
                        },
                        {
                            path: '/extractThemeTest',
                            name: '主题提取Test',
                            component: () => import('../views/LayoutTest/ExtractTheme.vue'),
                        },
                        {
                            path: '/objectLevelTest',
                            name: '对象层面Test',
                            component: () => import('../views/LayoutTest/ObjectLevel.vue'),
                        },
                    ]
                },

                {
                    path: '/aIRecognition',
                    name: 'AI图像识别',
                    component: () => import('../views/aIRecognition/AIRecognition.vue'),
                },
                {
                    path: '/cleaning',
                    name: '自动清洗',
                    component: () => import('../views/cleaning/cleaning.vue'),
                },
            ]
        },
        {
            path: '/index',
            name: 'indexs',
            component: () => import('../views/Children/Headers.vue'),
            children: [
                {
                    path: '/index/objectLevelEmotion',
                    name: '对象层面情感',
                    component: () => import('../views/Children/ObjectLevelEmotion.vue'),
                },
                {
                    path: '/index/entityIdentification',
                    name: '实体识别',
                    component: () => import('../views/Layout/EntityIdentification.vue'),
                },
                {
                    path: '/index/keyPhrase',
                    name: '关键短语',
                    component: () => import('../views/Layout/KeyPhrase.vue'),
                },
                {
                    path: '/index/extractTheme',
                    name: '主题提取',
                    component: () => import('../views/Layout/ExtractTheme.vue'),
                },

            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Login/Login.vue'),
        },

    ]
})
let token = Cookies.get('token') // 获取用户登录token
// router.beforeEach((to, from, next) => {
//     if (token) {
//         if (to.path.indexOf('/login&state=') !== -1) {
//             next({path: '/partsAnalysis'})
//         } else {
//             next()
//         }
//     } else {
//         console.log('222222', to)
//         if (to.path == '/login') {
//             next({path: '/partsAnalysis'})
//         } else {
//             console.log(33333, to)
//             next()
//         }
//         // next({path: '/login'})
//         // next({ path: '/login', query: { redirect: '111' } })
//     }
// })
export default router
