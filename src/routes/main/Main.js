import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import EventUtil from '../../addons/EventUtil';
import Menu from '../../containers/main/Header';
import Header from '../../containers/main/Menu';
import DialogUI from '../../components/dialog/DialogUI';
import ToastUI from '../../components/common/ToastUI';
import {
    handleMenuTip
} from '../../actions/CommonAction';

class Main extends Component {
    componentDidMount(){
       EventUtil.addHandler(document,'click',()=>{
            //点击其他区域隐藏下拉菜单
            this.props.dispatch(handleMenuTip(''));
       });
    }
    render() {
        return <div className="main">
                <Header />
                <Menu />
                <div className="right_col">
                    {this.props.children}
                </div>
                <DialogUI />
                <ToastUI />
            </div>;
    }
}

export default connect()(Main);

