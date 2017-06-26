import React from 'react';

let phone = null;
let securityCode = null;
let interval = null;

let style={
    show:{
        display:'block'
    },
    hide:{
        visibility:'hidden'
    }
};

class LoginUI extends React.Component {
    render() {
        if(this.props.mode==2){
            return(
                <div id="login_mode2">

                    <div id="login_title">{this.props.title}</div>

                    <div className="input_line">
                        <div className="verify_title">手机号</div>
                        <input className={"verify_input_error"} placeholder="请输入手机号码" ref={node => {phone = node;}} maxLength="11"/>
                    </div>

                    <div id="phone_tip" style={style.hide}>{"phoneTip"}</div>
                    

                    <div id={"verify_tip"}>{"获取"}</div>
                    
                    <div className="input_line" id="verify_line">
                        <div className="verify_title">验证码</div>
                        <input className={"verify_input"} placeholder="请输入验证码" maxLength="4" ref={node => {securityCode = node;}}/>
                    </div>
                    <div id="verifyCode_tip" style={style.hide}>{'verifyTip'}</div>
                    
                    <div id="connectButton">登录</div>
                </div>
                );
        }
      else{
        return (
            <div id="login" style={this.props.style}>

                <div id="login_title">{this.props.title}</div>

                <div className="verify_title">手机号码</div>
                <input className={"verify_input"} placeholder="请输入手机号码" ref={node => {phone = node;}} maxLength="11"/>
                <div id="phone_tip" style={style.hide}>{"phoneTip"}</div>
                <div id={"verify_tip"}>{"获取"}</div>
                
                <div className="verify_title">验证码</div>
                <input className={"verify_input"} placeholder="请输入验证码" maxLength="4" ref={node => {securityCode = node;}}/>
                <div id="verifyCode_tip" style={style.hide}>{'verifyTip'}</div>
                
                <div id="connectButton">登录</div>
            </div>
          );
      } 
    }
}


export default LoginUI;
