import {
    combineReducers
} from 'redux';
import { routerReducer } from 'react-router-redux';

import {
    homeReducer
} from './HomeReducer';

import {
    commonReducer
} from './CommonReducer';

import {
    loginReducer
} from './LoginReducer';

import {
    menuReducer
} from './MenuReducer';

import{
    deviceReducer
} from './DeviceReducer';

import{
    notifyReducer
} from './NotifyReducer';

import{
    templateReducer
} from './TemplateReducer';

import{
    messageReducer
} from './MessageReducer';

//组合所有的reducers
const Reducer = combineReducers({
    homeReducer,
    commonReducer,
    loginReducer,
    menuReducer,
    deviceReducer,
    notifyReducer,
    templateReducer,
    messageReducer,
    routing: routerReducer
});

export default Reducer;
