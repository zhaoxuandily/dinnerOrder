import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import Login from './routes/enter/Login';
import Main from './routes/main/Main';
import Home from './routes/enter/Home';
import Menu from './routes/main/Menu';

import SendNotify from './routes/main/SendNotify';
import NotifyList from './routes/main/NotifyList';

import EditTemplate from './routes/main/EditTemplate';
import DeviceList from './routes/main/DeviceList';
import Profile from './routes/main/Profile';
import MessageList from './routes/main/MessageList';

import Preview from './routes/preview/Preview';

import store from './stores/store';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, store);
let appElement = document.getElementById('app');
render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="menu" component={Menu}/>
                <Route path="login" component={Login}/>
                <Route path="main/" component={Main}>
                    <Route path="notify/send" component={SendNotify}/>
                    <Route path="notify/list" component={NotifyList}/>
                    <Route path="temps/edit" component={EditTemplate}/>
                    <Route path="device/mine" component={DeviceList}/>
                    <Route path="setting/profile" component={Profile}/>
                    <Route path="setting/message" component={MessageList}/>
                </Route>
                <Route path="preview" component={Preview}/>
            </Route>
        </Router>
    </Provider>,
    appElement
);
