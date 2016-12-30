/**
 * Created by lh on 2016/12/23.
 */
const key = 'IFESurvey';

if(!localStorage.getItem(key)){//第一次进来是没有数据的，需要初始化
    let data = {
        uuid : 0,//第一份问卷是从编号0开始
        formList : [],//调查问卷列表
    }
    localStorage.setItem(key, JSON.stringify(data));
}

module.exports = {

    fetch : function() {
        console.log("前"+localStorage.getItem(key));
        return JSON.parse(localStorage.getItem(key));//获取试卷列表对象
    },

    save : function (store) {
        localStorage.setItem(key, JSON.stringify(store));
        // console.log("后"+localStorage.getItem(key));
    }


}
