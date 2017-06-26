import {
    NAV_DEVICE_PAGE,
    REQUEST_GET_DEVICE_LIST,
    RECEIVE_GET_DEVICE_LIST,
    RECEIVE_UNBIND_DEVICE,
    REQUEST_UNBIND_DEVICE
} from '../actions/DeviceAction';


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
export const  deviceReducer = (state = [], action) => {
    switch (action.type) {
        case NAV_DEVICE_PAGE:
            return Object.assign({},state,{pages:navPage(action)});
        case REQUEST_GET_DEVICE_LIST:
            return Object.assign({},state,{cmd:action.info});
        case RECEIVE_GET_DEVICE_LIST:
         return Object.assign({},state,{
                cmd:action.info,
                list:action.res.gateways.length ? action.res.gateways : [],
                total:action.res.total ? action.res.total : ''});
        case REQUEST_UNBIND_DEVICE:
        case RECEIVE_UNBIND_DEVICE:
            return Object.assign({},state,{cmd:action.info});
        default:
            return state;
    }
};

/*---end----*/
