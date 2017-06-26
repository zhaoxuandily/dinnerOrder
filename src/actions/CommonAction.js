import Config  from 'config';
import $ from 'jquery';
/*
 * action 类型
 */
export const INIT_SERVER_CONFIG = 'INIT_SERVER_CONFIG';
export const DIALOG_PART = 'DIALOG_PART';
export const SHOW_TOAST ='SHOW_TOAST';
export const HANDLE_MENU_TIP = 'HANDLE_MENU_TIP';


/*
 * 其它的常量
 */

export const dialogs = {
    CONFIRM_DIALOG:'CONFIRM_DIALOG',
    MESSAGE_CHECK_DIALOG:'MESSAGE_CHECK_DIALOG'
};

/*
 * action 创建函数
 */

/**
 * [showToast 显示错误提示框]
 * @param  {[type]} part [description]
 * @return {[type]}      [description]
 */
export function showToast(info) {
    return function(dispatch) {
        dispatch({
            type: SHOW_TOAST,
            info
        });
        window.setTimeout(()=>{
            dispatch({
                type: SHOW_TOAST,
                info:{
                    errorText:''
                }
            });
        },2000);
    };
}
/**
 * [initServerConfig description]
 * @return {[type]} [description]
 */
export function initServerConfig(){
    return function(dispatch){
        $.ajax({
            type:'get',
            url:Config.adapterUrl + '?appkey=' + Config.appkey,
            success:(res)=>{
                if(res.errcode){
                    return dispatch(showToast({
                        errorText:res.msg
                    }));
                }
                return dispatch({
                    type:INIT_SERVER_CONFIG,
                    info:res
                });
            },
            error:(error)=>{
                return dispatch(showToast({
                    errorText:error.msg
                }));
            }
        });
    };
}
/**
 * [handleDialog 显示弹窗]
 * @param  {[type]} info [description]
 * @return {[type]}      [description]
 */
export function handleDialog(info) {
    return {
        type: DIALOG_PART,
        info
    };
}

/**
 * [handleMenuTip 处理下拉菜单显示隐藏]
 * @param  {[type]} tip [description]
 * @return {[type]}     [description]
 */
export function handleMenuTip(tip){
    return {
        type: HANDLE_MENU_TIP,
        tip
    };
}



