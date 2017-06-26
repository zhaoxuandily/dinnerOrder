import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import MenuComponent from '../../containers/enter/Home';

class Home extends Component {
    render() {
        return <MenuComponent />;
    }
}
export default connect()(Home);

