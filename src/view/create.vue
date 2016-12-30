<template>
    <div id="create">
        <input :value="header" class="h2" v-model="header">
        <hr>
        <!--显示和编辑题目-->
        <div class="detail" >
           <!--<radio :title="item.title" :options="item.options" :index="index"></radio>-->
           <!-- <radio v-for="item in proInfo" :item="item" ></radio>-->
           <div  v-for="(item, index) in proInfo" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)">
                <div class="radio" v-if="item.type=='radio'" >
                    {{index+1}}. <input  :value="item.title" class="text textArea" v-model="proInfo[index].title">
                    <br>
                    <template v-for="(option, opt) in item.options">
                        <div class="block">
                            <input type="radio"   :value="option"><input type="text" class="text textArea" :value="option" v-model="proInfo[index].options[opt]">
                        </div>
                    </template>
                    <button class="text notation small" @click="addOption(index)">添加选项</button>

                </div>
                <div class="checkbox" v-if="item.type=='checkbox'"  >
                    {{index+1}}. <input  :value="item.title" class="text textArea" v-model="proInfo[index].title">
                    <br>
                    <template v-for="(option, opt) in item.options">
                        <div class="block">
                            <input type="checkbox"   :value="option"><input type="text" class="text textArea" :value="option" v-model="proInfo[index].options[opt]">
                        </div>
                    </template>
                    <button class="text notation small" @click="addOption(index)">添加选项</button>

                </div>
                <div class="textType" v-if="item.type=='text'" >
                    {{index+1}}. <input  :value="item.title" class="text textArea" v-model="proInfo[index].title" >
                    <br>
                    <textarea class="muti-rows"></textarea>

                </div>
                <div class="right" v-show="item.change">
                    <button @click="reuse(index)">复用</button>
                    <button @click="delTitle(index)">删除</button>
                    <button @click="upOne(index)">上移</button>
                    <button @click="downOne(index)">下移</button>
                </div>

            </div>
            <!--<radio  v-for="item in proInfo" :item="item"  ></radio>-->
        </div>
        <div class="addQuestion">
            <div class="row-show" v-show="addShow">
                <button @click="createRadio" class="btn">单选</button>
                <button @click="createCheckbox" class="btn" >多选</button>
                <button @click="createText" class="btn">文本题</button>
            </div>
            <button class="text" @click="showType">+ 添加问题</button>
        </div>
        <hr>
        <div class="option">
            <div class="inline_block">
                <label for="dead_time">问卷截止日期</label>
                <input id="dead_time" type="date">
            </div>
            <div class="inline_block">
                <button  type="button" @click="savePaper('draft')">保存问卷</button>
                <button  type="button" @click="savePaper('published')">发布问卷</button>
            </div>

        </div>
    </div>
</template>

<script>
//    import Vue from 'vue'
    import radio from  '../components/radio.vue';
    import $ from 'expose?$!jquery'
    import bootstrap from 'bootstrap';
    import store from '../store.js';

//import main from  '../main.js'
    //使用module.exports这样的样式
    module.exports = {
            data : function(){
                var index;
                var proInfo = [];
                var formList = store.fetch().formList;
                var header = '请输入试卷标题'
//                console.log(JSON.stringify(formList));
//                console.log(this);
//                console.log('query:::'+ this.$route.query.index);
//                console.log('query:::'+ this.$router.query.index);
//                console.log(this.$router);
//                console.log(this.$route.query);
                if(this.$route.query.index == null){
//                    console.log(111)
                    proInfo = [{
                        type:'radio',
                        title:'sss',
                        options:['ee','rr'],
                        change : false
                    }]
                }
                else {
                    index = this.$route.query.index;
//                    console.log('index:::'+index );
//                    console.log('formList7:::'+JSON.stringify(formList[index]) );
                    proInfo = formList[index].content;
                    header = formList[index].header;
                    console.log(header);
//                    console.log(JSON.stringify(proInfo));
                }

                return{
                    addShow : false,
                    proInfo : proInfo,
                    header : header,
                    serverData : store.fetch(),
                    formList : formList,
                    uuid : store.fetch().uuid,
                }
            },
            methods:{
                showType : function () {
                    this.addShow = !this.addShow;

                },
                createRadio : function () {
                    var item = {};
                    item.type = 'radio',
                    item.title = '题目',
                    item.options=['选项1'],
                    item.change = false;
                    this.proInfo.push(item);
                },
                createCheckbox : function () {
                    var item = {};
                    item.type = 'checkbox',
                    item.title = '题目',
                    item.options=['选项1'],
                    item.change = false;
                    this.proInfo.push(item);
                },
                createText : function () {
                    var item = {};
                    item.type = 'text',
                    item.title = '题目',
                    item.change = false;
                    this.proInfo.push(item);
                },
                addOption : function (index) {//添加选项
//                    alert(index);
                    this.proInfo[index].options.push("新选项");
                },
                reuse : function (index) {
                    var item = JSON.stringify(this.proInfo[index]);//这里是引用，当然会有问题啦 更新的时候肯定会相互影响的嘛

                    this.proInfo.push(JSON.parse(item));
                    console.log(this.proInfo);

                },
                upOne : function (index) {
                    var item = this.proInfo[index];
                    if(index-1>=0){
                        this.proInfo.splice(index-1,0,item);
                        this.proInfo.splice(index+1, 1);
                    }
                },
                downOne : function (index) {
                    var len = this.proInfo.length;
                    if(index+1<=len-1){
                        this.upOne(index+1)
                    }
                },
                delTitle : function (index) {
                    this.proInfo.splice(index,1);
                },
                mouseenter : function (index) {
                    this.proInfo[index].change = true;
                },
                mouseleave : function (index) {
                    this.proInfo[index].change = false;
                },
                //保存问卷,这里应该要考虑两种情况，第一种：这个问卷还不存在，需要创建；第二种，已经存在了，需要修改。
                savePaper : function (status) {
                    console.log(this);
                    var uuid = this.uuid;
                    var formList = this.formList;
                    var serverData = this.serverData;
                    console.log(uuid);
                    var paper = {
                        header : this.header,
                        content: this.proInfo,
                        state : status
                    }
                    if(formList[uuid]){//存在，更新
                        formList[uuid] = paper;
                    }
                    else {//不存在，插入
                        formList.push(paper);
                        uuid++;
                        this.uuid = uuid;

                    }
                    store.save({uuid:uuid, formList : formList})
                    /*this.$router.go('/')应该能够跳转到主页，待完成！！！*/
                    /*var MongoClient = mongodb.MongoClient;
                    var url = 'mongodb://localhost:27017/ifesurvey'
                    MongoClient.connect(url, function (err, db) {
                        if(err) throw err;
                        console.log('success connected!!!');
                        app.papers = db.collections('users');
                    })*/
                },

            },
        components : {
                'radio' : {
                    template : radio,
                    props : ['item'],
                    }
                }


    }

function clone(obj) {
    if(typeof(obj) != 'object' ){
        return obj;
    }
    if (obj ==  null){
        return obj;
    }
    var newObj = new Object();
    for(var i in obj){
        newObj[i] = clone(obj[i]);
    }
    return newObj;
}

</script>

<style>
.addQuestion{
    width: 80%;
    min-height: 100px;
    line-height: 100px;
    border: 1px solid #cccccc;
    text-align: center;
    font-size: 1.2em;
    margin: 20px auto;
}
.detail{
    width: 80%;
}
hr{
    border-top: 1px solid #cccccc;
}
    .h2{
        width:100%;
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        border: none;
        margin-bottom: 20px;
    }
    .option{
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }
    .inline_block{
        display: inline;
    }
    .block{
        display: block;
    }
    .row-show{
        height:40px ;
    }
    .addQuestion .text{
        height: 35px;
        line-height: 35px;
    }
    .text{
        border: none;
        background-color: #ffffff;
        font-size: 1.0em;
    }
.textArea{
    width: 80%;
    min-height: 30px;
}
    .radio, .checkbox, .textType {
        margin-top: 20px;
    }
    .right {
       overflow: auto;
    }
    .right button{
        float: right;

    }
    .small{
        font-size: 10px;
    }
    .notation{
        color: chocolate;
    }
    .muti-rows{
        width: 60%;
        min-height: 70px;
    }
    .button{
        padding: 5px 10px;
        border: 1px solid #cccccc;
    }
</style>