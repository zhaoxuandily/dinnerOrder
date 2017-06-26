import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import SendNotifyComponent from '../../containers/main/views/SendNotify';

class SendNotify extends Component {

    render() {
        return <SendNotifyComponent />;
    }
}

export default connect()(SendNotify);

