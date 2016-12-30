<template>
    <div id="test">
        <form id="form1">
            <input :value="header" class="h2" v-model="header" readonly="readonly">
            <hr>
            <!--显示和编辑题目-->
            <div class="detail" >
               <div  v-for="(item, index) in proInfo">
                    <div class="radio" v-if="item.type=='radio'" >
                        {{index+1}}. <input  :value="item.title" class="text textArea" v-model="proInfo[index].title" readonly="readonly">
                        <br>
                        <template v-for="(option, opt) in item.options">
                            <div class="block">
                                <input type="radio"   :value="option" :name="index"><input type="text" class="text textArea" :value="option" v-model="proInfo[index].options[opt]" readonly="readonly">
                            </div>
                        </template>


                    </div>
                    <div class="checkbox" v-if="item.type=='checkbox'"  >
                        {{index+1}}. <input  :value="item.title" class="text textArea" v-model="proInfo[index].title" readonly="readonly">
                        <br>
                        <template v-for="(option, opt) in item.options">
                            <div class="block">
                                <input type="checkbox"   :value="option" :name="index"><input type="text" class="text textArea" :value="option" v-model="proInfo[index].options[opt]" readonly="readonly">
                            </div>
                        </template>

                    </div>
                    <div class="textType" v-if="item.type=='text'" >
                        {{index+1}}. <input  :value="item.title" class="text textArea" v-model="proInfo[index].title" readonly="readonly" >
                        <br>
                        <textarea class="muti-rows"></textarea>

                    </div>


                </div>
                <!--<radio  v-for="item in proInfo" :item="item"  ></radio>-->
            </div>

            <hr>
            <button type="button" class="btn btn-success btn-block" id="submit">提交问卷</button>
        </form>
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
                if(this.$route.query.index == null){
//                    console.log(111)
                   //没有输入的index的话，应该直接退回去，但是正常来说，不存在这样的情况。
                }
                else {
                    index = this.$route.query.index;
                    proInfo = formList[index].content;
                    header = formList[index].header;

                }

                return{
                    proInfo : proInfo,
                    header : header,
                    serverData : store.fetch(),
                    formList : formList,
                    uuid : store.fetch().uuid,
                }
            },
            methods:{


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
$(document).ready(function () {
    var submitBtn = $("#submit");
    var form = $("#form1")[0];
    submitBtn.click(function () {
        console.log(serialize(form));
    })
})
//表单序列化
function serialize(form) {
    var parts = [],
            feild = null,
            i,
            len,
            j,
            opLen,
            option,
            optvalue;
    for (i=0,len=form.elements.length; i < len; i++){
        feild = form.elements[i];
        switch(feild.type){
            case 'select-one':
            case 'select-multiple':
                if(feild.name.length){
                    for(j=0, opLen=feild.options.length; j < opLen; j++){
                        option = feild.options[j];
                        if(option.selected){
                            optvalue = "";
                            if(option.hasAttribute){
                                optvalue = (option.hasAttribute("value")) ? option.value : option.text;
                            }
                            else {
                                optvalue = (option.attributes["value"]).specified ? option.value : option.text;
                            }
//                            parts.push(encodeURIComponent(feild.name) + "=" +encodeURIComponent(optvalue));
                            parts.push(encodeURIComponent(feild.name) + "=" +encodeURIComponent(optvalue));
                        }
                    }
                }
                break;
            case "undefined":
            case "file":
            case "submit":
            case "reset":
            case "button":
                break;
            case "radio":
            case "checkbox":
                if(!feild.checked){
                    break;
                }
            default:
                console.log(feild.name);
                if(feild.name.length){
                    parts.push(feild.name+"="+feild.value);
                }
        }
    }
    return parts.join("&");

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