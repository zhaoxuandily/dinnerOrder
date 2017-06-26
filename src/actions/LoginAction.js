import { push } from 'react-router-redux';
import $ from 'jquery';
import Config  from 'config';
import Enum from '../addons/Enum';
import ErrorCode from '../addons/ErrorCode';
import { showToast } from  './CommonAction';
/*
 * action 类型
 */
export const LOGIN_SYS = 'LOGIN_SYS';
export const LOGIN_GET_CHECKCODE= 'LOGIN_GET_CHECKCODE';
export const SHOW_LOGIN_ERROR= 'SHOW_LOGIN_ERROR';
/*
 * 其它的常量
 */

/*
 * action 创建函数
 */

let timerCheckCodeInterval = null;

export const CHANGE_COUNT_DOWN = 'CHANGE_COUNT_DOWN';

/**
 * [changeCountDown 改变倒计时]
 * @param  {[type]} count [description]
 * @return {[type]}       [description]
 */
function changeCountDown(count) {
    return {
        type: CHANGE_COUNT_DOWN,
        info:{
            count:count
        }
    };
}

/**
 * [deleteTimer 删除定时器]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export function deleteTimer(dispatch,callback) {
    window.clearInterval(timerCheckCodeInterval);
    timerCheckCodeInterval = null;
    if(callback){
        return dispatch(callback(0));
    }
}
/**
 * [startTimer 开始定时器]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export function startTimer(dispatch,callback) {
    if(timerCheckCodeInterval){
        window.clearInterval(timerCheckCodeInterval);
        timerCheckCodeInterval = null;
    }
    let _count = 60;
    let countDown = function() {
        if (_count == 0) {
            _count == null;
            deleteTimer(dispatch,callback);
        } else {
            _count--;
            if(callback){
                return dispatch(callback(_count));
            }
        }
    };
    timerCheckCodeInterval = setInterval(countDown, 1000);
    return callback(_count);
}

export const REQUEST_LOGIN_SYS = 'REQUEST_USER_LOGIN';

function requestUserLogin(userName, checkCode) {
    return {
        type: REQUEST_LOGIN_SYS,
        info:{
            isRequest:true,
            userName:userName,
            checkCode:checkCode,
            errorText:''
        }
    };
}

export const RECEIVE_LOGIN_SYS = 'RECEIVE_LOGIN_SYS';

function receiveUserLogin(userName,res) {
    return {
        type: RECEIVE_LOGIN_SYS,
        info:{
            isRequest:false,
            userName:userName,
            userKey:res.userKey,
            original_link:res.original_link,
            thumbnail_link:res.thumbnail_link,
            errorText:res.errorText
        }
    };
}

/**
 * [login 账号登录]
 * @param  {[type]} userName  [用户名]
 * @param  {[type]} checkCode [验证码]
 * @return {[type]}           [description]
 */
export function userlogin(userName, checkCode) {
    return function(dispatch) {
        dispatch(requestUserLogin(userName, checkCode));
         $.ajax({
            type:'POST',
            url:'/front/esscontrol/loginEss',
            headers: {
                'UserKey': userName + '#'+ Config.appkey,
                'Token':'',
                'Content-type': 'application/json'
            },
            data:JSON.stringify({
                user_name:userName,
                appkey:Config.appkey,
                check_code:checkCode,
                //login_type:Enum.ELoginType.LOGIN_WITH_PWD,
                login_type:Enum.ELoginType.LOGIN_WITH_SMS,
                client_access_type:Enum.EAccessType.CUSTOMERWEB,
                from_client_type:Enum.EClientType.WEB,
                sha256:true,
                appkey:Config.appkey,
                appkey_password:Config.appkey_password,
                //password:'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'
            }),
            success:(res)=>{
                if(res.ret == 0){
                    if(res.http_token){
                        window.localStorage.setItem('token',res.http_token);
                    }
                    window.localStorage.setItem('userkey',(userName +'#'+Config.appkey));
                    dispatch(deleteTimer(dispatch,changeCountDown));
                    dispatch(push('main/setting/profile'));
                    return dispatch(receiveUserLogin(userName,{
                        userKey:userName+'#'+Config.appkey,
                        thumbnail_link:res.essUserInfo.thumbnail_link,
                        original_link:res.essUserInfo.original_link
                    }));
                }else{
                    return dispatch(receiveUserLogin(userName,{
                        errorText:ErrorCode[res.ret]
                    }));
                }
            },
            error:(error)=>{
                return dispatch(receiveUserLogin(userName,{errorText:error.statusText}));
            }
        });
    };
}


export const REQUEST_LOGOUT_SYS = 'REQUEST_LOGOUT_SYS';

function requestUserLogout() {
    return {
        type: REQUEST_LOGOUT_SYS,
        info:{
            isRequest:true,
        }
    };
}

export const RECEIVE_LOGOUT_SYS = 'RECEIVE_LOGOUT_SYS';

function receiveUserLogout() {
    return {
        type: RECEIVE_LOGOUT_SYS,
        info:{
            isRequest:false
        }
    };
}

/**
 * [login 账号退出]
 * @param  {[type]} userName  [用户名]
 * @param  {[type]} checkCode [验证码]
 * @return {[type]}           [description]
 */
export function userlogout(userName,userKey) {
    return function(dispatch) {
        dispatch(requestUserLogout());
         $.ajax({
            type:'POST',
            url:'/front/esscontrol/logoutEss',
            headers: {
                'UserKey':userKey,
                'Content-type': 'application/json',
                'token': window.localStorage.getItem('token')
            },
            data:JSON.stringify({
                user_name:userName,
                appkey:Config.appkey,
                client_access_type:Enum.EAccessType.CUSTOMERWEB,
                from_client_type:Enum.EClientType.WEB
            }),
            success:(res)=>{
                if(res.ret == 0){
                    window.localStorage.clear();
                    dispatch(push('login'));
                    return dispatch(receiveUserLogout);
                }else{
                    dispatch(showToast({
                        errorText:ErrorCode[res.ret]
                    }));
                    return dispatch(receiveUserLogout);
                }
            },
            error:(error)=>{
                dispatch(showToast({
                    errorText:error.statusText
                }));
                if(error.status == '403'){
                    setTimeout(function(){
                        dispatch(push(Config.project+'/login'));
                    },2000);
                }
                return dispatch(receiveUserLogout({}));
            }
        });
    };
}


export const REQUEST_LOGIN_GET_CHECKCODE = 'REQUEST_LOGIN_GET_CHECKCODE';

function requestGetCheckCode(userName) {
    return {
        type: REQUEST_LOGIN_GET_CHECKCODE,
        info:{
            isRequest:true,
            userName:userName,
            errorText:''
        }
    };
}

export const RECEIVE_LOGIN_GET_CHECKCODE = 'RECEIVE_LOGIN_GET_CHECKCODE';

function receiveGetCheckCode(userName, res) {
    return {
        type: RECEIVE_LOGIN_GET_CHECKCODE,
        info:{
            isRequest:false,
            userName:userName,
            errorText:res.errorText
        }
    };
}

/**
 * [getCheckCode 获取验证码]
 * @param  {[type]} userName [用户名/手机号]
 * @return {[type]}          [description]
 */
export function getCheckCode(userName) {
    return function(dispatch) {
        dispatch(requestGetCheckCode(userName));
        $.ajax({
            type:'POST',
            url:'/front/esscontrol/requireCheckCode',
            headers: {
                'UserKey': userName + '#'+ Config.appkey,
                'Content-type': 'application/json',
                'token':''
            },
            data:JSON.stringify({
                user_name:userName,
                appkey:Config.appkey
            }),
            success:(res)=>{
                if(res.ret == 0){
                    dispatch(startTimer(dispatch,changeCountDown));
                    dispatch(showToast({
                        errorText:'验证码已经发送至您的手机，请注意查收!'
                    }));
                    return dispatch(receiveGetCheckCode(userName,{
                        errorText:''
                    }));

                }else{
                    dispatch(deleteTimer(dispatch,changeCountDown));
                    return dispatch(receiveGetCheckCode(userName,{
                        errorText:ErrorCode[res.ret]
                    }));
                }
            },
            error:(error)=>{
                dispatch(deleteTimer(dispatch,changeCountDown));
                return dispatch(receiveGetCheckCode(userName,{
                    errorText:error.statusText
                }));
            }
        });
    };
}

/**
 * [handleLoginError 处理错误提醒]
 * @param  {[type]} errorText [description]
 * @return {[type]}           [description]
 */
export function handleLoginError(errorText) {
    return {
        type: SHOW_LOGIN_ERROR,
        info:{
            errorText:errorText
        }
    };
}

/**
 * [getUserInfo description]
 * @param  {[type]} userName [description]
 * @param  {[type]} userKey  [description]
 * @return {[type]}          [description]
 */
export function getUserInfo(userName,userKey){
    return function(dispatch) {
        $.ajax({
            type:'POST',
            url:'/front/esscontrol/getUserInfoByName',
            headers: {
                'UserKey':userKey,
                'Content-type': 'application/json',
                'token': window.localStorage.getItem('token')
            },
            data:JSON.stringify({
                user_name:userName,
                appkey:Config.appkey,
                token: ''
            }),
            success:(res)=>{
                if(res.ret == 0){
                    if(res.http_token){
                        window.localStorage.setItem('token',res.http_token);
                    }
                    return dispatch(receiveUserLogin(userName,{
                        userKey:userName+'#'+Config.appkey,
                        thumbnail_link:res.essUserInfo.thumbnail_link,
                        original_link:res.essUserInfo.original_link
                    }));
                }else{
                    dispatch(showToast({
                        errorText:res.reason
                    }));
                    setTimeout(function(){
                        dispatch(push(Config.project+'/login'));
                    },2000);
                }
            },
            error:(error)=>{
                dispatch(showToast({
                    errorText:error.statusText
                }));
                setTimeout(function(){
                    dispatch(push(Config.project+'/login'));
                },2000);
            }
        });
    };
}

