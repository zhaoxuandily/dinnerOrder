import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import NotifyListComponent from '../../containers/main/views/NotifyList';

class NotifyList extends Component {

    render() {
        return <NotifyListComponent />;
    }
}

export default connect()(NotifyList);

