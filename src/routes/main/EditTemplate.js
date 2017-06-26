import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import EditTemplateComponent from '../../containers/main/views/EditTemplate';

class EditTemplate extends Component {

    render() {
        return <EditTemplateComponent />;
    }
}

export default connect()(EditTemplate);

