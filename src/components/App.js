import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import 'babel-polyfill';

require('normalize.css/normalize.css');
require('styles/app.css');

import {
    initServerConfig
} from '../actions/CommonAction';


class App extends Component {
    componentDidMount(){
       this.props.dispatch(initServerConfig());
    }
    render() {
        return <div>
                {this.props.children}
            </div>;
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(App);


