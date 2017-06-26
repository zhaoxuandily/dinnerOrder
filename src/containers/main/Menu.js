import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import Config  from 'config';
import { push } from 'react-router-redux';

import MenuItemUI from '../../components/main/menu/MenuItemUI';

import {
    menuFirstNav,
    menuSecondNav
} from '../../actions/MenuAction';


class Menu extends Component {
    _nav(item){
        alert(item.title);
    }
    _menuFirstNav(itemInfo){
        this.props.dispatch(menuFirstNav(itemInfo));
    }
    _menuSecondNav(itemInfo,item){
        this.props.dispatch(menuSecondNav(itemInfo,item));
        this.props.dispatch(push(Config.project+item.path));
    }
    render() {
         const {
            menuReducer,
            loginReducer
        } = this.props;
        return <div className="col-md-3 left_col">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title">
                        <a href="index.html" className="site_title">
                            <span>企业自服务平台</span>
                        </a>
                    </div>
                    <div className="clearfix"></div>
                    <div className="profile clearfix">
                        <div className="profile_pic">
                            <img src={loginReducer.original_link ? loginReducer.original_link :require("../../source/images/img.jpg")} alt="..." className="img-circle profile_img" />
                        </div>
                        <div className="profile_info">
                            <span>欢迎,</span>
                            <h2>{loginReducer.userName}</h2>
                        </div>
                    </div>
                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                      <div className="menu_section active">
                        <ul className="nav side-menu">
                            {
                                menuReducer.map((item)=>{
                                    return <MenuItemUI key={item.id} itemInfo={item} menuFirstNav={this._menuFirstNav.bind(this)}  menuSecondNav={this._menuSecondNav.bind(this)}/>;
                                })
                            }
                        </ul>
                      </div>
                    </div>
                </div>
            </div>;
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(Menu);
