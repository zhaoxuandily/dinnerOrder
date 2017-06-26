import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import LoginComponent from '../../containers/enter/Login';

class Login extends Component {
    render() {
        return <LoginComponent />;
    }
}
export default connect()(Login);

