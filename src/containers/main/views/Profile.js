import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import PageTitleBarUI from '../../../components/common/PageTitleBarUI';
import PagePanelUI from '../../../components/common/PagePanelUI';
/**
 * [generalFormInfo 当前页配置信息]
 * @type {Object}
 */
const profileInfo = {
    pageTitleBar:{
        style:'',
        className:'',
        leftInfo:{
            className:'',
            text:'个人信息'
        }
    },
    panel:{
        style:'',
        className:'',
        titleInfo:{
            style:'',
            text:'基本信息',
            smallText:''
        },
        toolInfo:{
            settings:[],
            showClose:false
        }
    }
};

class Profile extends Component {

    render() {
         const {
            loginReducer
        } = this.props;
        return <div>
                <PageTitleBarUI 
                    style={profileInfo.pageTitleBar.style} 
                    className={profileInfo.pageTitleBar.className} 
                    leftInfo={profileInfo.pageTitleBar.leftInfo} 
                    rightInfo={profileInfo.pageTitleBar.rightInfo} />
                <PagePanelUI
                    style={profileInfo.panel.style} 
                    className={profileInfo.panel.className}
                    titleInfo={profileInfo.panel.titleInfo}
                    toolInfo={profileInfo.panel.toolInfo}>
                    <div className="col-md-3 col-sm-3 col-xs-12 profile_left">
                      <div className="profile_img">
                        <div id="crop-avatar">
                          <img className="img-responsive avatar-view" src={loginReducer.original_link ? loginReducer.original_link : require("../../../source/images/img.jpg")} />
                        </div>
                      </div>
                      <h3>{loginReducer.userName}</h3>
                    </div>
                </PagePanelUI>
            </div>;
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(Profile);

 // <ul className="list-unstyled user_data">
 //                        <li><i className="fa fa-user user-profile-icon"></i> 超级管理员
 //                        </li>
 //                      </ul>

 //                      <a className="btn btn-success"><i className="fa fa-edit m-right-xs"></i>编辑</a>
