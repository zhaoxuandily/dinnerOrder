import React from 'react';
import LoginUI from './LoginUI.js';

// let style={
//     display:'block'
// };

class AllBack extends React.Component {
    render() {
      return (
        <div id="all-back" style={{background: 'url('+this.props.img.backUrl+') no-repeat center'}}>
            <div id="login-back"></div>
            <LoginUI title={this.props.img.text} mode={this.props.mode}/>
        </div>
      );
    }
}


export default AllBack;
