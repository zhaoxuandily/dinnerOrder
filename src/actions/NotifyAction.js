import { push } from 'react-router-redux';
import Config  from 'config';
import { showToast } from  './CommonAction';
import $ from 'jquery';
//import Enum from '../addons/Enum';
import ErrorCode from '../addons/ErrorCode';

/*
 * action 类型
 */
export const NAV_NOTIFY_PAGE = 'NAV_NOTIFY_PAGE';

/*
 * 其它的常量
 */

/*
 * action 创建函数
 */


/**
 * [navPage 分页]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
export function navPage(info) {
    return {
        type: NAV_NOTIFY_PAGE,
        info
    };
}

export const REQUEST_SEDN_NOTIFY = 'REQUEST_SEDN_NOTIFY';

function requestSendNotify() {
    return {
        type: REQUEST_SEDN_NOTIFY,
        info:{
            isRequest:true
        }
    };
}

export const RECEIVE_SEDN_NOTIFY = 'RECEIVE_SEDN_NOTIFY';

function receiveSendNotify() {
    return {
        type: RECEIVE_SEDN_NOTIFY,
        info:{
            isRequest:false
        }
    };
}

/**
 * [sendNotify 发送通知]
 * @param  {[type]} info [通知基本信息]
 * @return {[type]}          [description]
 */
export function sendNotify(userName,userKey,content,callback) {
    return function(dispatch) {
        dispatch(requestSendNotify());
        $.ajax({
            type:'POST',
            url:'/front/essportal/releaseVisitorNotify',
            headers: {
                'UserKey':userKey,
                'Content-type': 'application/json',
                'token': window.localStorage.getItem('token')
            },
            data:JSON.stringify({
                admin_name:userName,
                appkey:Config.appkey,
                content:{
                    text:content,
                    title:''
                }
            }),
            success:(res)=>{
                if(res.http_token){
                    window.localStorage.setItem('token',res.http_token);
                }
                if(res.ret == 0){
                    if(callback){
                        callback();
                    }
                    return dispatch(receiveSendNotify());
                }else{
                    dispatch(showToast({
                        errorText:ErrorCode[res.ret]
                    }));
                    return dispatch(receiveSendNotify({}));
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
                return dispatch(receiveSendNotify({}));
            }
        });
    };
}

export const REQUEST_GET_NOTIFYLIST = 'REQUEST_GET_NOTIFYLIST';

function requestGetNotifyList() {
    return {
        type: REQUEST_GET_NOTIFYLIST,
        info:{
            isRequest:true
        }
    };
}

export const RECEIVE_GET_NOTIFYLIST = 'RECEIVE_GET_NOTIFYLIST';

function receiveGetNotifyList(res) {
    return {
        type: RECEIVE_GET_NOTIFYLIST,
        info:{
            isRequest:false
        },
        res
    };
}

/**
 * [sendNotify 获取通知列表]
 * @param  {[type]} info [通知基本信息]
 * @return {[type]}          [description]
 */
export function getNotifyList(userName,userKey,page,length) {
    return function(dispatch) {
        dispatch(requestGetNotifyList());
        $.ajax({
            type:'POST',
            url:'/front/essportal/queryAllNotify',
            headers: {
                'UserKey':userKey,
                'Content-type': 'application/json',
                'token': window.localStorage.getItem('token')
            },
            data:JSON.stringify({
                admin_name:userName,
                appkey:Config.appkey,
                page:page,
                length:length
            }),
            success:(res)=>{
                if(res.http_token){
                    window.localStorage.setItem('token',res.http_token);
                }
                if(res.ret == 0){
                    dispatch(navPage({
                        page:page,
                        total:res.total,
                        length:length
                    }));
                    return dispatch(receiveGetNotifyList(res));
                }else{
                    dispatch(showToast({
                        errorText:ErrorCode[res.ret]
                    }));
                    return dispatch(receiveGetNotifyList({}));
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
                return dispatch(receiveGetNotifyList({}));
            }
        });
    };
}


export const REQUEST_REMOVE_NOTIFY = 'REQUEST_REMOVE_NOTIFY';

function requestRemoveNotify() {
    return {
        type: REQUEST_REMOVE_NOTIFY,
        info:{
            isRequest:true
        }
    };
}

export const RECEIVE_REMOVE_NOTIFY = 'RECEIVE_REMOVE_NOTIFY';

function receiveRemoveNotify() {
    return {
        type: RECEIVE_REMOVE_NOTIFY,
        info:{
            isRequest:false
        }
    };
}

/**
 * [removeNotify 删除通知]
 * @param  {[type]}   userName [description]
 * @param  {[type]}   userKey  [description]
 * @param  {[type]}   guids    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export function removeNotify(userName,userKey,guids,callback) {
    return function(dispatch) {
        dispatch(requestRemoveNotify());
        $.ajax({
            type:'POST',
            url:'/front/essportal/deleteNotify',
            headers: {
                'UserKey':userKey,
                'Content-type': 'application/json',
                'token': window.localStorage.getItem('token')
            },
            data:JSON.stringify({
                admin_name:userName,
                guid:guids,
                appkey:Config.appkey
            }),
            success:(res)=>{
                if(res.http_token){
                    window.localStorage.setItem('token',res.http_token);
                }
                if(res.ret == 0){
                    if(callback){
                        callback();
                    }
                    return dispatch(receiveRemoveNotify());
                }else{
                    dispatch(showToast({
                        errorText:ErrorCode[res.ret]
                    }));
                    return dispatch(receiveRemoveNotify());
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
                return dispatch(receiveRemoveNotify());
            }
        });
    };
}
