import {
    NAV_NOTIFY_PAGE,
    REQUEST_GET_NOTIFYLIST,
    RECEIVE_GET_NOTIFYLIST,
    REQUEST_REMOVE_NOTIFY,
    RECEIVE_REMOVE_NOTIFY,
    RECEIVE_SEDN_NOTIFY,
    REQUEST_SEDN_NOTIFY
} from '../actions/NotifyAction';


/*---start----*/

/**
 * [navPage 分页导航]
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function navPage(action){
    let info = action.info;
    let count = Math.ceil(info.total/info.length);
    let pages = [];
    for(let i=0; i<count; i++){
        pages.push({
            index:i+1,
            active:false
        });
    }
    if(pages[info.page-1]){
        pages[info.page-1].active = true;
    }
    return pages;
}


/**
 * [deviceReducer 设备信息]
 * @param  {Object} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export const  notifyReducer = (state = [], action) => {
    switch (action.type) {
        case NAV_NOTIFY_PAGE:
            return Object.assign({},state,{pages:navPage(action)});
        case REQUEST_SEDN_NOTIFY:
        case RECEIVE_SEDN_NOTIFY:
            return Object.assign({},state,{cmdSendNotify:action.info});
        case REQUEST_GET_NOTIFYLIST:
            return Object.assign({},state,{cmd:action.info});
        case RECEIVE_GET_NOTIFYLIST:
            return Object.assign({},state,{
                cmd:action.info,
                list:action.res.notify ? action.res.notify : [],
                total:action.res.total ? action.res.total : ''});
        case REQUEST_REMOVE_NOTIFY:
        case RECEIVE_REMOVE_NOTIFY:
            return Object.assign({},state,{cmd:action.info});
        default:
            return state;
    }
};

/*---end----*/
