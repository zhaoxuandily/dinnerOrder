import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import DeviceListComponent from '../../containers/main/views/DeviceList';

class DeviceList extends Component {

    render() {
        return <DeviceListComponent />;
    }
}

export default connect()(DeviceList);
