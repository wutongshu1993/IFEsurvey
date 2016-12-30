<template>
    <div id="show">
        <h2>{{header}}</h2>
        <hr/>
        <div class="item" v-for="(item, index) in proInfo">
            <figure class="info">
                <p>{{item.title}}</p>
                <ul>
                    <li v-for="opt in item.options">
                        <p>{{opt}}</p>
                    </li>
                </ul>

            </figure>
            <div class="charts">

            </div>
        </div>
    </div>
</template>

<script>
import store from '../store';
import echarts from 'echarts';
   module.exports = {
       data : function () {
          var index;
           var proInfo = [];
           var formList = store.fetch().formList;
           var header = "请输入标题";
           if(this.$route.query.index == null){

           }
           else{
               index = this.$route.query.index;
               proInfo = formList[index].content;
               header = formList[index].header;
           }

           return {
               proInfo : [],
               formList : formList,
               header : header,
               proInfo : proInfo
           }
       },
        mounted : function () {
            var charts = document.getElementsByClassName("charts");
            var len = charts.length;
            var i = 0;
            for (i=0; i<len; i++){
//                let infoOptions = [];
                let j = 0;
                let options = this.proInfo[i].options;
                let opts = options.length;
                let info = [];
                for(j=0; j < opts; j++){
//                    infoOptions.push(options[j]);
                    info.push(Math.floor(Math.random()*50));
                }
                echarts.init(charts[i])
                .setOption({
                    title : {/*text : this.proInfo[i].title*/},
                    tooltip : {},
                    xAxis: {
                        data: options
                    },
                    yAxis: {},
                    series: [{
                        name: '',
                        type: 'bar',
                        data: info
                    }]
                })
            }
        }
   }

</script>

<style>
    h2{
        width: 80%;
        text-align: center;
    }
    #show{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        border: 1px solid #cccccc;
        border-radius: 4px;
        -webkit-box-shadow: 5px;
        -moz-box-shadow: 5px;
        box-shadow: 5px 5px 5px #888888 ;
        padding-bottom: 15px;
    }
    .item{
        width: 90%;
        border: 1px solid #cccccc;
        padding: 5px 10px;
        margin-top: 15px;
        border-radius: 2px;
    }
    .info{
        width: 60%;
        float: left;
    }
    .charts{
        width: 36%;
        float: right;
        height: 80px;
    }
    ul{
        list-style: none;
    }
    hr{
        border-top: 1px solid #cccccc;
    }
</style>