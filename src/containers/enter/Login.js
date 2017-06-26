import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import {
    userlogin,
    getCheckCode,
    handleLoginError
} from '../../actions/LoginAction';

import LoadingUI from '../../components/common/LoadingUI';
import ToastUI from '../../components/common/ToastUI';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            checkCode:''
        };
    }
    _getCheckCode(){
        if(this._verifyPhone()){
            this.props.dispatch(getCheckCode(this.userName.value.trim()));
        }
    }
    _verifyPhone(){
        let userName = this.userName.value.trim();
        if (!userName||!(/^\d+$/.test(userName))||userName.length != 11) {
            this.props.dispatch(handleLoginError('请输入正确的手机号'));
            return false;
        }else{
            this.props.dispatch(handleLoginError(''));
            return true;
        }
    }
    _verifyCode(){
        let code = this.checkCode.value.trim();
        if(!(/^\d+$/.test(code))||(code.length!=4)){
            this.props.dispatch(handleLoginError('验证码错误'));
            return false;
        }else{
            this.props.dispatch(handleLoginError(''));
            return true;
        }
    }
    _userNameUpdate(){
        if(this.userName.value.length > 11){
            return;
        }
        this.props.dispatch(handleLoginError(''));
        this.setState({
            userName:this.userName.value
        });
    }
    _checkCodeUpdate(){
        if(this.checkCode.value.length > 4){
            return;
        }
        this.props.dispatch(handleLoginError(''));
        this.setState({
            checkCode:this.checkCode.value
        });
    }
    _login(){
        if(this._verifyPhone() && this._verifyCode()){
            this.props.dispatch(userlogin(this.userName.value.trim(),this.checkCode.value.trim()));
        }
    }
    _handleKeyPress(e){
        if(e.charCode == 13){
            this._login();
        }
    }
    render() {
        const {
            loginReducer
        } = this.props;
        return <div className="login">
                <div className="login_wrapper">
                    <div className="animate form login_form">
                      <section className="login_content">
                        <form>
                          <h1>企业自服务</h1>
                          <div className="input-group login-row">
                            <input 
                                readOnly={loginReducer.count ? 'readonly' : ''}
                                ref={node => {this.userName = node;}}
                                value={this.state.userName}
                                type="text"
                                className="form-control"
                                placeholder="用户名"
                                onChange={this._userNameUpdate.bind(this)}
                                onKeyPress={this._handleKeyPress.bind(this)}/>
                            <span className="input-group-btn">
                              <button
                                disabled={loginReducer.count ? 'disabled' : ''}
                                style={{color:loginReducer.count ? 'red' : '#999'}}
                                className="btn btn-default btn-code"
                                type="button"
                                onClick={this._getCheckCode.bind(this)}>
                                {loginReducer.count ? loginReducer.count+'S' : '获取验证码'}
                               </button>
                            </span>
                          </div>
                          <div>
                            <input
                                ref={node => {this.checkCode = node;}} 
                                type="text" className="form-control" 
                                placeholder="验证码"
                                value={this.state.checkCode}
                                onChange={this._checkCodeUpdate.bind(this)}
                                onKeyPress={this._handleKeyPress.bind(this)}/>
                          </div>
                          <div className="login-error">
                            {loginReducer.errorText ? loginReducer.errorText : ''}
                          </div>
                          <div>
                            <button type="button" className="btn btn-login btn-mine" href="#" onClick={this._login.bind(this)}>登&nbsp;&nbsp;录</button>
                          </div>
                          <div className="clearfix"></div>
                          <div className="separator">
                            <div>
                              <p>©2017中移(杭州)信息技术有限公司</p>
                            </div>
                          </div>
                        </form>
                      </section>
                    </div>
                    <LoadingUI 
                        size='small' 
                        style={{'background':'rgba(255, 255, 255, 0)','display':loginReducer.isRequest ? 'block':'none'}}/>
                </div>
                 <ToastUI />
            </div>;
    }
}
function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(Login);

