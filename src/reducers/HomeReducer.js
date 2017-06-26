import {
    HOME_DEFALT
} from '../actions/HomeAction';

/**
 * [homeReducer 主页]
 * @param  {Object} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export const homeReducer = (state = [], action) => {
    switch (action.type) {
        case HOME_DEFALT:
            return Object.assign({}, state, action.info);
        default:
            return state;
    }
};

