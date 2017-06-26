import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import ProfileComponent from '../../containers/main/views/Profile';

class Profile extends Component {

    render() {
        return <ProfileComponent />;
    }
}

export default connect()(Profile);

