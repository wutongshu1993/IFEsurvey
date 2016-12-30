<template>
    <div>
        <div id="content">

            <table class="table .table-hover" v-show="formList.length > 0">
                <thead>
                    <tr>
                        <td>标题</td>
                        <td>时间</td>
                        <td>状态</td>
                        <td>
                            <div class="space-around">
                                <span>操作</span>
                                <router-link to="/create" class="btn btn-success">+ 新建问卷</router-link>
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(paper, index) in formList" >
                        <td><input :value=index type="checkbox" class="checks" :checked="checkVal[index]"  @click="checks(index)" v-model="checkVal[index]">{{paper.header}}</td>
                        <td>时间</td>
                        <td>
                            <span v-if="paper.state=='draft'">未发布</span>
                            <span v-if="paper.state=='published'">已发布</span>
                        </td>
                        <td class="space-around">
                            <router-link :to="{path:'update',query:{index : index}}" class="btn btn-info">编辑</router-link>
                            <button class="btn btn-danger" @click="deleteOne(index)">删除</button>
                            <router-link :to="{path:'test',query:{index : index}}" class="btn btn-success">填写</router-link>
                            <router-link :to="{path:'show',query:{index : index}}" class="btn btn-primary">查看数据</router-link>
                        </td>
                    </tr>
                <tr>
                    <td colspan="4">
                        <input type="checkbox" value="checkAll" id="checkAll"  :checked="checkAllVal" v-model="checkAllVal" @click="checkAll">全选
                        <button class="btn btn-danger" @click="deleteChecked">删除</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div id="newPaper" v-show="formList.length == 0">
            <router-link to="/create" class="btn">+ 新建问卷</router-link>
        </div>
    </div>
</template>

<script>
    import store from '../store.js';
    import $ from 'expose?$!jquery'
    import bootstrap from 'bootstrap';
    import Vue from 'vue';
    require ('bootstrap-loader');
module.exports = {
    data : function () {
//        console.log(store.fetch().formList)
        var len = store.fetch().formList.length;
        var checkVal = [];
        return {
            formList : store.fetch().formList,
            checkVal : initChecked(checkVal, len),
            checkAllVal : false
        }
    },
    methods : {
        checkAll : function () {//为全选/取消全选绑定事件,不能把这个卸载watch中监听，不然当子选项触发的全选又会反作用于子选项
            //使用jquery
           /* var checks = $('.checks');
            checks.prop("checked", $('#checkAll').prop("checked"));*/
            assignAll(this.checkVal, !this.checkAllVal);
        },
        checks : function (index) {
//            console.log('前'+this.checkVal);
           Vue.set(this.checkVal, index, !this.checkVal[index] )
//            console.log('后'+this.checkVal);
            var i = 0;
            for(i = 0; i < this.checkVal.length; i++){
                this.checkAllVal = true;
                if(!this.checkVal[i]){
                    this.checkAllVal = false;
                    return;
                }
            }

        },
        deleteOne : function (i) {//删除一份问卷
            var uuid = this.checkVal.length;
            this.checkVal.splice(i, 1);
            this.formList.splice(i, 1);

            store.save({uuid:uuid-1, formList : this.formList})
        },
        deleteChecked : function () {
            //批量删除应该从末尾删除哦
            var len = this.checkVal.length;
            var i = len - 1;
            var uuid = len;
            for(i = len -1 ; i >= 0; i--){
                if(this.checkVal[i]){
                    this.checkVal.splice(i,1);
                    this.formList.splice(i,1);
                    uuid--;
                }
            }
//            console.log("删除后"+this.checkVal);
//            console.log("删除后"+this.formList);
            //写回到localStorage中,写回的时候uuid也要更新
            store.save({uuid:uuid, formList : this.formList})
        }
    },
    watch : {
        /*checkAllVal : function () {

            assignAll(this.checkVal, this.checkAllVal);
            console.log(this.checkVal);
        },
        checkVal : function () {
            console.log(this.checkAllVal);
            console.log(this.checkVal);
            var i = 0;
            for(i = 0; i < this.checkVal.length; i++){
                this.checkAllVal = true;
                if(!this.checkVal[i]){
                    this.checkAllVal = false;
                    return;
                }
            }
        }*/
    }
}
//为全选/取消全选绑定事件
   /* var checkAll = $("#checkAll");
    var checks = $('.checks');
        checkAll.click(function () {
            alert(122);
            var flag = this.checked;//全选是否选中
            checks.prop("checked", flag);
        })

//单个选中对全选的影响
    checks.click(function () {
        var flag = true;
        checks.each(function () {
            if(!this.checked){
                flag = false;
            }
        })
        checkAll.prop("checked", flag);
    })*/

function initChecked(arr, n) {
    var i = 0;
    for(i = 0; i < n; i++){
        arr[i] = false;
    }
    return arr;
}

function assignAll(arr, flag){
    var i = 0;
    var n = arr.length;
    for(i = 0; i < n; i++){
        arr[i] = flag;
    }
    return arr;
}
</script>

<style>
    .space-around{
        display: flex;
        justify-content: center;
    }
    .space-around > *{
        margin-right: 5px;
    }

</style>