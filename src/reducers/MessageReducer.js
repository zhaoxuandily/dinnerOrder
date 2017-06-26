import {
    NAV_PAGE,
} from '../actions/MessageAction';


/*---start----*/

/**
 * [navPage 分页导航]
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function navPage(state, action){
      return state.map((target) => {
            if (target.index === action.page.index) {
                target.active = true;
            }else{
                target.active = false;
            }
            return {...target};
        });
}


/**
 * [messageReducer 消息信息]
 * @param  {Object} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export const  messageReducer = (state = [], action) => {
    switch (action.type) {
        case NAV_PAGE:
            return Object.assign({},state,{pages:navPage(state.pages,action)});
        default:
            return state;
    }
};

/*---end----*/
