require('../../../../styles/preview.css');

import React from 'react';
import AllBack from './AllBack.js';
import LeftBack from './LeftBack.js';
import TopBack from './TopBack.js';

class PreviewMain extends React.Component {

    render() {
        if(this.props.mode == 0){
            return (<AllBack
                img={this.props.img}
                mode={this.props.mode}/>);
        }else if(this.props.mode == 1){
            return (<LeftBack
                img={this.props.img}
                mode={this.props.mode}/>);
        }else if(this.props.mode == 2){
            return (<TopBack
            img={this.props.img}
            mode={this.props.mode}/>);
        }
        return (<div>正在获取配置</div>);
        
    }
}

PreviewMain.defaultProps = {
};

export default PreviewMain;
