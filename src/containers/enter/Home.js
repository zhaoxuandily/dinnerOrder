import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {
            homeReducer
        } = this.props;
        return <div className="dining-home">
                <div className="item menu">
                    本周菜谱
                </div>
                <div className="banner"></div>
                <div className="line"></div>
                <div className="item leave">
                    盒饭预留
                    <div className="right"></div>
                </div>
                <div className="line"></div>
                <div className="item order">
                    预定包点
                    <div className="right"></div>
                    <div className="record">预订记录</div>                 
                </div> 
                <div className="coming"></div>               
        </div>;
    }
}
function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(Home);

