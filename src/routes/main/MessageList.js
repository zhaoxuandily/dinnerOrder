import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import MessageListComponent from '../../containers/main/views/MessageList';

class MessageList extends Component {

    render() {
        return <MessageListComponent />;
    }
}

export default connect()(MessageList);

