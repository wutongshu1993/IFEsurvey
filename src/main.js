/**
 * Created by lh on 2016/12/18.
 */

import Vue from 'vue';
import Router from 'vue-router';

import List from './view/list.vue';
import Create from './view/create.vue';
import Test from './view/test.vue';
import App from './components/app.vue';
import Show from './view/show.vue';
/*var mongodb = require('mongodb');*/
import $ from 'expose?$!jquery'

//因为用的是组件式导入，所以一定要有这个
Vue.use(Router);
const routes = [
    {path:'/' ,component:List},
    {path:'/create' ,component:Create},
    {path:'/update', component:Create},
    {path:'/test', component:Test},//填写问卷
    {path:'/show', component:Show},//查看问卷
]

const router = new Router({
    routes
})

//router2的渲染应该这样
const app = new Vue({
    el:"#app",
    router,
    render: h=>h(App)
})



