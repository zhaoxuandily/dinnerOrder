import {
    INIT_SERVER_CONFIG,
    HANDLE_MENU_TIP,
    DIALOG_PART,
    SHOW_TOAST
} from '../actions/CommonAction';

/**
 * [handleMeunTip description]
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function handleMeunTip (state,action){
    let menuTipState = state.menuTipState;
    if(!action.tip){
        for(let i in menuTipState){
            menuTipState[i] = false;
        }
    }else{
        for(let i in menuTipState){
            menuTipState[i] = false;
        }
        menuTipState = Object.assign({}, menuTipState,action.tip);
    }
    return Object.assign({}, state,{menuTipState:menuTipState});
}
/**
 * [commonReducer 公共信息]
 * @param  {Object} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export const commonReducer = (state = [], action) => {
    switch (action.type) {
        case HANDLE_MENU_TIP:
            return handleMeunTip(state,action);
        case DIALOG_PART:
            return Object.assign({}, state,{dialog:action.info});
        case SHOW_TOAST:
            return Object.assign({}, state, {toast:action.info});
        case INIT_SERVER_CONFIG:
            return Object.assign({}, state, {serverConfig:action.info});
        default:  
            return state;
    }
};

