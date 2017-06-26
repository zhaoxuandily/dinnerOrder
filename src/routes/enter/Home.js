import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import HomeComponent from '../../containers/enter/Home';

class Home extends Component {
    render() {
        return <HomeComponent />;
    }
}
export default connect()(Home);

