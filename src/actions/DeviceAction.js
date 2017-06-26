import { push } from 'react-router-redux';
import Config  from 'config';
import { showToast } from  './CommonAction';
import $ from 'jquery';
//import Enum from '../addons/Enum';
import ErrorCode from '../addons/ErrorCode';
/*
 * action 类型
 */
export const NAV_DEVICE_PAGE = 'NAV_DEVICE_PAGE';

/*
 * 其它的常量
 */

/*
 * action 创建函数
 */


/**
 * [menuSecondNav 菜单二级导航]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
export function navPage(info) {
    return {
        type: NAV_DEVICE_PAGE,
        info
    };
}

export const REQUEST_GET_DEVICE_LIST = 'REQUEST_GET_DEVICE_LIST';

function requestGetDeviceList() {
    return {
        type: REQUEST_GET_DEVICE_LIST,
        info:{
            isRequest:true
        }
    };
}

export const RECEIVE_GET_DEVICE_LIST = 'RECEIVE_GET_DEVICE_LIST';

function receiveGetDeviceList(res) {
    return {
        type: RECEIVE_GET_DEVICE_LIST,
        info:{
            isRequest:false
        },
        res
    };
}
export function getDeviceList(userName,userKey,page,length){
    return function(dispatch) {
        dispatch(requestGetDeviceList());
        $.ajax({
            type:'POST',
            url:'/front/esscontrol/getBindingGateways',
            headers: {
                'UserKey':userKey,
                'Content-type': 'application/json',
                'token': window.localStorage.getItem('token')
            },
            data:JSON.stringify({
                username:userName,
                appkey:Config.appkey,
                page:page,
                range:length
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
                    return dispatch(receiveGetDeviceList(res));
                }else{
                    dispatch(showToast({
                        errorText:ErrorCode[res.ret]
                    }));
                    return dispatch(receiveGetDeviceList({}));
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
                return dispatch(receiveGetDeviceList({}));
            }
        });
    };
}



export const REQUEST_UNBIND_DEVICE = 'REQUEST_UNBIND_DEVICE';

function requestUnbindDevice() {
    return {
        type: REQUEST_UNBIND_DEVICE,
        info:{
            isRequest:true
        }
    };
}

export const RECEIVE_UNBIND_DEVICE = 'RECEIVE_UNBIND_DEVICE';

function receiveUnbindDevice() {
    return {
        type: RECEIVE_UNBIND_DEVICE,
        info:{
            isRequest:false,
        }
    };
}
/**
 * [unbindDevice 解绑设备]
 * @param  {[type]}   userName [description]
 * @param  {[type]}   userKey  [description]
 * @param  {[type]}   gw_mac   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export function unbindDevice(userName,userKey,gw_mac,callback){
    return function(dispatch) {
        dispatch(requestUnbindDevice());
        $.ajax({
            type:'POST',
            url:'/front/esscontrol/unbindDevice',
            headers: {
                'UserKey':userKey,
                'Content-type': 'application/json',
                'token': window.localStorage.getItem('token')
            },
            data:JSON.stringify({
                from_username:userName,
                from_appkey:Config.appkey,
                gw_mac:gw_mac,
                unbind_username:userName,
                unbind_appkey:Config.appkey
            }),
            success:(res)=>{
                if(res.http_token){
                    window.localStorage.setItem('token',res.http_token);
                }
                if(res.ret == 0){
                    if(callback){
                        callback();
                    }
                    return dispatch(receiveUnbindDevice());
                }else{
                    dispatch(showToast({
                        errorText:ErrorCode[res.ret]
                    }));
                    return dispatch(receiveUnbindDevice({}));
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
                return dispatch(receiveUnbindDevice({}));
            }
        });
    };
}
