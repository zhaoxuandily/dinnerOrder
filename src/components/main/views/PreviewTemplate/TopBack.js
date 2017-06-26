import React from 'react';
import LoginUI from './LoginUI.js';

class TopBack extends React.Component {
    render() {
      return (
        <div id="top-back">
            <div id="top-back-container">
                <div id='top-back-top' style={{background: 'url('+this.props.img.backUrl+') no-repeat center'}}>
                    <div id="login-back"></div>
                    <LoginUI style={this.props.style} title={this.props.img.text} mode={this.props.mode}/>
                </div>
                <div id='top-back-bottom'>
                    <div className="top-back-bottom-item">
                        <img src="" src={this.props.img.img1}/>
                        <div>{this.props.img.text1}</div>
                    </div>
                    <div className="top-back-bottom-item">
                        <img src="" src={this.props.img.img2}/>
                        <div>{this.props.img.text2}</div>
                    </div>
                    <div className="top-back-bottom-item">
                        <img src="" src={this.props.img.img3}/>
                        <div>{this.props.img.text3}</div>
                    </div>
                </div>
            </div>
        </div>
      );
    }
}


export default TopBack;
