import React, {
    Component
} from 'react';

import {
    connect
} from 'react-redux';
import Config  from 'config';
import {
   getUserInfo,
   userlogout
} from '../../actions/LoginAction';

import {
    handleMenuTip,
    handleDialog,
    dialogs
} from '../../actions/CommonAction';

import {
    menuFirstNav,
    menuSecondNav
} from '../../actions/MenuAction';

import EventUtil from '../../addons/EventUtil';
import { push } from 'react-router-redux';

class Header extends Component {
    componentDidMount(){
        if(!this.props.loginReducer.userName){
            let userKey = window.localStorage.getItem('userkey');
            if(userKey){
                let userName = userKey.split('#')[0];
                this.props.dispatch(getUserInfo(userName,userKey));
            }else{
                this.props.dispatch(push(Config.project+'/login'));
            }
        }
    }
    _userToggle(e){
        this.props.dispatch(handleMenuTip({user:!this.props.commonReducer.menuTipState.user}));
        e.nativeEvent.stopImmediatePropagation();
        EventUtil.preventDefault();
    }
    _notifyToggle(e){
        this.props.dispatch(handleMenuTip({notify:!this.props.commonReducer.menuTipState.notify}));
        e.nativeEvent.stopImmediatePropagation();
        EventUtil.preventDefault();
    }
    _goProfile(){
        if(!this.props.menuReducer[3].active){
            this.props.dispatch(menuFirstNav({id:'10'}));
        }
       this.props.dispatch(menuSecondNav({id:'10'},{id:'10.1'}));
       this.props.dispatch(push(Config.project+'/main/setting/profile'));
    }
    _goLogin(){
        this.props.dispatch(userlogout(this.props.loginReducer.userName,this.props.loginReducer.userKey));
    }
    _goMessage(){
        if(!this.props.menuReducer[3].active){
            this.props.dispatch(menuFirstNav({id:'10'}));
        }
        this.props.dispatch(menuSecondNav({id:'10'},{id:'10.2'}));
        this.props.dispatch(push(Config.project+'/main/setting/message'));
    }
    _check(item){
        this.props.dispatch(handleDialog( Object.assign({}, item,{type:dialogs.MESSAGE_CHECK_DIALOG})));
    }
    render() {
        const {
            commonReducer,
            messageReducer,
            loginReducer
        } = this.props;

        return <div className="top_nav">
                  <div className="nav_menu">
                    <nav>
                      <ul className="nav navbar-nav navbar-right">
                        <li className={commonReducer.menuTipState.user ? 'open' : ''}>
                          <a onClick={this._userToggle.bind(this)} href="javascript:;" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                            <img src={loginReducer.original_link ? loginReducer.original_link : require("../../source/images/img.jpg")} alt="" />{loginReducer.userName}
                            <span className=" fa fa-angle-down"></span>
                          </a>
                          <ul className="dropdown-menu dropdown-usermenu pull-right">
                            <li onClick={this._goProfile.bind(this)}><a href="javascript:;"> 个人信息</a></li>
                            <li onClick={this._goLogin.bind(this)}><a href="javascript:;"><i className="fa fa-sign-out pull-right"></i> 退出</a></li>
                          </ul>
                        </li>

                        <li onClick={this._notifyToggle.bind(this)} role="presentation" className={commonReducer.menuTipState.notify ? 'dropdown open' : 'dropdown'}>
                          <a href="javascript:;" className="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="true">
                            <i className="fa fa-envelope-o"></i>
                            <span className="badge bg-green">6</span>
                          </a>
                          <ul className="dropdown-menu list-unstyled msg_list" role="menu">
                            {
                                messageReducer.lastlist.map((item,index)=>{
                                    return <li key={index} onClick={this._check.bind(this,item)}>
                                              <a>
                                                <span className="image"><img src={require("../../source/images/img.jpg")} alt="Profile Image" /></span>
                                                <span>
                                                  <span>John Smith</span>
                                                  <span className="time">{item.time}</span>
                                                </span>
                                                <span className="message">
                                                    {item.content}
                                                </span>
                                              </a>
                                        </li>;
                                })
                            }
                            <li onClick={this._goMessage.bind(this)}>
                              <div className="text-center">
                                <a>
                                  <strong>更多消息</strong>
                                  <i className="fa fa-angle-right"></i>
                                </a>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>;
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(Header);

