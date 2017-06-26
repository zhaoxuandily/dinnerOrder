import React, {
    Component
} from 'react';

let loadIcon = require('../../source/images/load.gif');
class LoadingUI extends Component {

    render() {
        let imgSize = {
            width:'32px'
        };
        if(this.props.size == 'small'){
            imgSize.width = '20px';
        }
        return (
            <div className='load-wrap' style={this.props.style ? this.props.style : {}}>
                <img src={loadIcon} style={imgSize}/>
            </div>
        );
    }
}

export default LoadingUI;
