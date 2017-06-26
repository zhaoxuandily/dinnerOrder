import ErrorCode from './ErrorCode';

let CommonUtil={
    /**
     * [emptyFn description]
     * @return {[type]} [description]
     */
    emptyFn:function(){
        return;
    },
     /**
     * 文件上传
     * @param (options)
     * (object)options.fileInfo：文件基本信息对象
     * (string)options.url:服务器地址
     * (func)options.onFileUploadProgress:文件上传进度回调
     * (func)options.onFileUploadComplete：文件上传完成回调
     * (func)options.onFileUploadError:文件上传失败回调
     * (func)options.onFileUploadCanceled:文件上传取消回调
     *  Returns:void
     */
    uploadFn:function(options) {
        options = options || {};
        options.onFileUploadProgress = options.onFileUploadProgress || CommonUtil.emptyFn;
        options.onFileUploadComplete = options.onFileUploadComplete || CommonUtil.emptyFn;
        options.onFileUploadError = options.onFileUploadError || CommonUtil.emptyFn;
        options.onFileUploadCanceled = options.onFileUploadCanceled || CommonUtil.emptyFn;
        //文件服务器地址
        let uploadUrl = options.url;

        let xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            //xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            //xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        if (!xhr) {
            options.onFileUploadError({
                ret: "50003",
                msg: ErrorCode["50003"]
            });
            return;
        }
        //判断是否支持异步上传文件
        let isCanUploadFile = xhr.setRequestHeader && typeof FormData != 'undefined';

        if (!isCanUploadFile) {
            options.onFileUploadError({
                ret: "50004",
                msg: ErrorCode["50004"]
            });
            return;
        }

        let onError = function(e) {
            options.onFileUploadError({
                ret: "50005",
                msg: ErrorCode["50005"] + e.message
            });
        };
        if (xhr.upload) {
            xhr.upload.addEventListener("progress", options.onFileUploadProgress, false);
        }
        if (xhr.addEventListener) {
            xhr.addEventListener("abort", options.onFileUploadCanceled, false);
            xhr.addEventListener("load", function() {
                try {
                    let json = JSON.parse(xhr.responseText);
                    options.onFileUploadComplete(json);
                } catch (e) {
                    options.onFileUploadError({
                        ret: "50005",
                        msg: ErrorCode["50005"] + e.message
                    });
                }
            }, false);
            xhr.addEventListener("error", onError, false);
        } else if (xhr.onreadystatechange) {
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (ajax.status == 200) {
                        try {
                            let json = JSON.parse(xhr.responseText);
                            options.onFileUploadComplete(json);
                        } catch (e) {
                            options.onFileUploadError({
                                ret: "50005",
                                msg: ErrorCode["50005"] + e.message
                            });
                        }
                    } else {
                        options.onFileUploadError({
                            ret: "50005",
                            msg: ErrorCode["50005"] + "服务端返回异常"
                        });
                    }
                } else {
                    xhr.abort();
                    options.onFileUploadCanceled();
                }
            };
        }

        xhr.open("POST", uploadUrl);

        var formData = new FormData();
        formData.append("file", options.fileInfo.file);
        formData.append("param", options.fileInfo.param);
        xhr.send(formData);
    },
    /**
     * [getCookie 获取cookie]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    getCookie: function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)){
            return unescape(arr[2]);
        }else{
            return null;
        }
    },
    /**
     * [delCookie 删除cookie]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    delCookie: function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null){
            document.cookie = name + "=" + escape(cval) + ";expires=" + exp.toGMTString() + ";path=/";
        }
    },
    /**
     * [setCookie 写cookie]
     * @param {[type]} c_name     [description]
     * @param {[type]} value      [description]
     * @param {[type]} expiredays [description]
     */
    setCookie: function(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
    },
    /**
     * [formatDate description]
     * @param  {[type]} now [description]
     * @return {[type]}     [description]
     */
    formatDate:function(now){
        now = new Date(now);
        var year=now.getFullYear();
        var month=now.getMonth()+1;
        var date=now.getDate();
        var hour=now.getHours();
        var minute=now.getMinutes();
        var second=now.getSeconds();
        if(parseInt(second)<10){
            second = '0'+second;
        }
        if(parseInt(hour)<10){
            hour = '0'+hour;
        }
        if(parseInt(minute)<10){
            minute = '0'+minute;
        }
        return year+'-'+month+'-'+date+'   '+hour+':'+minute+':'+second;
    }
};

export default CommonUtil;
