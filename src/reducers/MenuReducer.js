import {
    MENU_FIRST_NAV,
    MENU_SECOND_NAV,
} from '../actions/MenuAction';


/*---start----*/

/**
 * [menuFirstNav description]
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function menuFirstNav(state, action){
      return state.map((target) => {
            if (target.id === action.firstItem.id) {
                target.active = !target.active;
            }else{
                target.active = false;
            }
            return {...target};
        });
}

/**
 * [menuSecondNav description]
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function menuSecondNav(state, action){
      return state.map((target) => {
            target.child.map((item)=>{
                if (item.id === action.secondItem.id) {
                    item.active = true;
                }else{
                    item.active = false;
                }
                return {...item};
            });
            return {...target};
        });
}

/**
 * [menuReducer 菜单信息]
 * @param  {Object} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export const  menuReducer = (state = [], action) => {
    switch (action.type) {
        case MENU_FIRST_NAV:
            return menuFirstNav(state,action);
        case MENU_SECOND_NAV:
            return menuSecondNav(state,action);
        default:
            return state;
    }
};

/*---end----*/
