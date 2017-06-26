import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import PreviewComponent from '../../containers/preview/Preview';

class Preview extends Component {
    render() {
        return <PreviewComponent />;
    }
}
export default connect()(Preview);

