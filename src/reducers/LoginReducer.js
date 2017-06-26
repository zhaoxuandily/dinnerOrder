import {
    REQUEST_LOGIN_SYS,
    RECEIVE_LOGIN_SYS,
    REQUEST_LOGIN_GET_CHECKCODE,
    RECEIVE_LOGIN_GET_CHECKCODE,
    SHOW_LOGIN_ERROR,
    CHANGE_COUNT_DOWN
} from '../actions/LoginAction';

/**
 * [loginReducer 用户信息]
 * @param  {Object} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export const loginReducer = (state = [], action) => {
    switch (action.type) {
        case REQUEST_LOGIN_SYS:
        case RECEIVE_LOGIN_SYS:
        case REQUEST_LOGIN_GET_CHECKCODE:
        case RECEIVE_LOGIN_GET_CHECKCODE:
        case SHOW_LOGIN_ERROR:
        case CHANGE_COUNT_DOWN:
            return Object.assign({}, state, action.info);
        default:
            return state;
    }
};

