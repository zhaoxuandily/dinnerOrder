import {
    createStore,
    applyMiddleware
} from 'redux';

import thunkMiddleware from 'redux-thunk';
import Reducer from '../reducers/Reducer';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import InitData from './InitData';

const rMiddleware = routerMiddleware(browserHistory);



/**
 * [开发日志]
 * @param  {[type]} store [description]
 * @return {[type]}       [description]
 */
const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};

/**
 * [获得loacalstorage中的数值]
 * @param  {[type]} store [description]
 * @return {[type]}       [description]
 */
// const getStore = () => {
//     if (localStorage.user) {
//         return window.STATE_FROM_SERVER;
//     } else {
//         return window.STATE_FROM_SERVER;
//     }
// }

/**
 * [崩溃日志]
 * @param  {[type]} store [description]
 * @return {[type]}       [description]
 */
const crashReporter = store => next => action => {
    try {
        return next(action);
    } catch (err) {
        console.error('Caught an exception!', err);
        Raven.captureException(err, {
            extra: {
            action,
            state: store.getState()
            }
        });
        throw err;
    }
};

/*
 *初始值
 */
window.STATE_FROM_SERVER = {

};
let store = createStore(
        Reducer,
        InitData,
        applyMiddleware(thunkMiddleware,rMiddleware,logger,crashReporter));



export default store;
