import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import Main from '../../components/main/views/PreviewTemplate/Main';
import CommonUtil from '../../addons/CommonUtil';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
           id:'',
           templateinfo:{}
        };
    }
    componentDidMount(){
        let templateinfo = JSON.parse(CommonUtil.getCookie('templateinfo'));
        this.setState({
            id:templateinfo.id,
            templateinfo:templateinfo
        });
    }
    render() {
        return <Main mode={this.state.id} img={this.state.templateinfo}/>;
    }
}
function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(Preview);

