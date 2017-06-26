import React from 'react';
import LoginUI from './LoginUI.js';

class LeftBack extends React.Component {
    render() {
      return (
        <div id="left-back">
            <div id="left-back-container">
                <div id='left-back-left' style={{background: 'url('+this.props.img.backUrl+') no-repeat center'}}></div>
                <div id='left-back-right'>
                    <LoginUI title={this.props.img.text} mode={this.props.mode}/>
                </div>
            </div>
        </div>
      );
    }
}


export default LeftBack;
