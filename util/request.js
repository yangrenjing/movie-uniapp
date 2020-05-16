//公共路径 
const commonUrl = "http://xxxx.xxx.xxx:8080/"; 
import url from './requestUrl.js'

// post请求封装
function postRequest(url, data) {
    var promise = new Promise((resolve, reject) => {
        var that = this;
        var postData = data;
		uni.showNavigationBarLoading();//显示加载动画
        uni.request({
            url: commonUrl + url,
            data: postData,
            method: "POST",
            header: {
                "content-type": "application/json",
                token: uni.getStorageSync("token")
            },
            success: function(res) {
                //返回什么就相应的做调整
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    // 请求服务器成功，但是由于服务器没有数据返回，此时无code。会导致这个空数据
                    //接口后面的then执行
                    // 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
                    //不会被阻断在那里执行不下去！
                    resolve(res.data.msg);
                }
				uni.hideNavigationBarLoading();//关闭加载动画
            },
            error: function(e) {
                reject("网络出错");
				uni.hideNavigationBarLoading();//关闭加载动画
            }
        });
    });
    return promise;
}

// get请求封装
function getRequest(url, data) {
    var promise = new Promise((resolve, reject) => {
        var that = this;
        var postData = data;
        uni.request({
            url: commonUrl + url,
            data: postData,
            method: "GET",
            dataType: "json",
            header: {
                "content-type": "application/json"
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    resolve(res.data);
                }
            },
            error: function(e) {
                reject("网络出错");
            }
        });
    });
    return promise;
}

module.exports = {
    post: postRequest,
    get: getRequest,
	url: url
};