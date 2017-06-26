import { push } from 'react-router-redux';
import Config  from 'config';
import { showToast } from  './CommonAction';
import $ from 'jquery';
import Enum from '../addons/Enum';
import ErrorCode from '../addons/ErrorCode';

/*
 * action 类型
 */
export const EDIT_TEMPLATE = 'EDIT_TEMPLATE';
export const RETURN_TEMPLATE = 'RETURN_TEMPLATE';
export const UPDATECURRENT_TEMPLATE = 'UPDATECURRENT_TEMPLATE';
/*
 * 其它的常量
 */

/*
 * action 创建函数
 */



/**
 * [editTemplate 进入编辑]
 * @param  {[type]} id [模板id]
 * @return {[type]}          [description]
 */
export function editTemplate(id) {
    return {
        type:EDIT_TEMPLATE,
        id:id
    };
}

/**
 * [editTemplate 返回模板列表]
 * @return {[type]}          [description]
 */
export function returnTemplate() {
    return {
        type:RETURN_TEMPLATE
    };
}
/**
 * [updateCurrentTemplate 修改当前编辑模板]
 * @param  {[type]} info [description]
 * @return {[type]}      [description]
 */
export function updateCurrentTemplate(info){
    return {
        type:UPDATECURRENT_TEMPLATE,
        info
    };
}

export const REQUEST_TEMP_EDIT = 'REQUEST_TEMP_EDIT';
/**
 * [requestTempEdit description]
 * @return {[type]} [description]
 */
export function requestTempEdit() {
    return {
        type: REQUEST_TEMP_EDIT,
        info:{
            isRequest:true
        }
    };
}

export const RECEIVE_TEMP_EDIT = 'RECEIVE_TEMP_EDIT';
/**
 * [receiveTempEdit description]
 * @return {[type]} [description]
 */
export function receiveTempEdit() {
    return {
        type: RECEIVE_TEMP_EDIT,
        info:{
            isRequest:false
        }
    };
}

export const REQUEST_GET_MYTEMP = 'REQUEST_GET_MYTEMP';
/**
 * [requestGetMyTemp description]
 * @return {[type]} [description]
 */
function requestGetMyTemp() {
    return {
        type: REQUEST_GET_MYTEMP,
        info:{
            isRequest:true
        }
    };
}

export const RECEIVE_GET_MYTEMP = 'RECEIVE_GET_MYTEMP';
/**
 * [receiveGetMyTemp description]
 * @return {[type]} [description]
 */
function receiveGetMyTemp(res) {
    return {
        type: RECEIVE_GET_MYTEMP,
        info:{
            isRequest:false
        },
        res
    };
}

/**
 * [getMyTemplate description]
 * @param  {[type]} userKey [description]
 * @return {[type]}         [description]
 */
export function getMyTemplate(userName,userKey,callback){
    return function(dispatch) {
        dispatch(requestGetMyTemp());
        $.ajax({
            type:'POST',
            url:'/front/essportal/queryLastPortalModule',
            headers: {
                'UserKey':userKey,
                'Content-type': 'application/json',
                'token': window.localStorage.getItem('token')
            },
            data:JSON.stringify({
                admin_name:userName,
                appkey:Config.appkey
            }),
            success:(res)=>{
                if(res.http_token){
                    window.localStorage.setItem('token',res.http_token);
                }
                if(res.ret == 0){
                    let jsonObg = JSON.parse(res.json_data);
                    jsonObg.id = res.module_id;
                    if(callback){
                        callback(jsonObg);
                    }
                    return dispatch(receiveGetMyTemp(jsonObg));
                }else{
                    dispatch(showToast({
                        errorText:ErrorCode[res.ret]
                    }));
                    return dispatch(receiveGetMyTemp({}));
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
                return dispatch(receiveGetMyTemp({}));
            }
        });
    };
}

export const REQUEST_SEND_TEMP = 'REQUEST_SEND_TEMP';
/**
 * [requestSendTemp description]
 * @return {[type]} [description]
 */
function requestSendTemp() {
    return {
        type: REQUEST_SEND_TEMP,
        info:{
            isRequest:true
        }
    };
}

export const RECEIVE_SEND_TEMP = 'RECEIVE_SEND_TEMP';
/**
 * [receiveSendTemp description]
 * @return {[type]} [description]
 */
function receiveSendTemp(res) {
    return {
        type: RECEIVE_SEND_TEMP,
        info:{
            isRequest:false
        },
        res
    };
}

/**
 * [sendTemplate description]
 * @param  {[type]} userKey [description]
 * @return {[type]}         [description]
 */
export function sendTemplate(userName,userKey,info){
    return function(dispatch) {
        dispatch(requestSendTemp());
        $.ajax({
            type:'POST',
            url:'/front/essportal/publishPortalModule',
            headers: {
                'UserKey':userKey,
                'Content-type': 'application/json',
                'token': window.localStorage.getItem('token')
            },
            data:JSON.stringify({
                admin_name:userName,
                appkey:Config.appkey,
                json_data:JSON.stringify(info),
                module_id:info.id,
                setting_mode:Enum.EGatewaySettingMode.SET_ALL,
                gw_mac:''
            }),
            success:(res)=>{
                if(res.http_token){
                    window.localStorage.setItem('token',res.http_token);
                }
                if(res.ret == 0){
                    dispatch(showToast({
                        errorText:'发布成功！'
                    }));
                    return dispatch(receiveSendTemp(info));
                }else{
                    dispatch(showToast({
                        errorText:ErrorCode[res.ret]
                    }));
                    return dispatch(receiveSendTemp({}));
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
                return dispatch(receiveSendTemp({}));
            }
        });
    };
}
