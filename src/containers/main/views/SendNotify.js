import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import Config  from 'config';
import PageTitleBarUI from '../../../components/common/PageTitleBarUI';
import PagePanelUI from '../../../components/common/PagePanelUI';

import {
    handleDialog,
    dialogs
} from '../../../actions/CommonAction';

import {
    sendNotify
} from '../../../actions/NotifyAction';

import LoadingUI from '../../../components/common/LoadingUI';
import { push } from 'react-router-redux';
import {
    //menuFirstNav,
    menuSecondNav
} from '../../../actions/MenuAction';

/**
 * [NotifyListInfo 当前页配置信息]
 * @type {Object}
 */
const NotifyListInfo = {
    pageTitleBar:{
        style:'',
        className:'',
        leftInfo:{
            className:'',
            text:'发布通知'
        }
    },
    panel:{
        style:'',
        className:'',
        titleInfo:{
            style:'',
            text:'通知',
            smallText:''
        },
        toolInfo:{
            settings:[],
            showClose:false
        }
    }
};

class SendNotify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }
    _contentUpdate(){
        if(this.content.value.length > 99){
            this.setState({
                content:this.content.value.substring(0,99)
            });
            return;
        }
        this.setState({
            content:this.content.value
        });
    }
    _sendNotify(){
        let that = this;
        let content = this.content.value;
        this.props.dispatch(handleDialog({
            type:dialogs.CONFIRM_DIALOG,
            text:'您确定要进行发布操作吗？',
            callback:()=>{
                that.props.dispatch(sendNotify(
                    this.props.loginReducer.userName,
                    this.props.loginReducer.userKey,
                    content,
                    ()=>{
                        that.props.dispatch(menuSecondNav({id:'1'},{id:'1.2'}));
                        that.props.dispatch(push(Config.project+'/main/notify/list'));
                }));
            }
        }));
    }
    render() {
        const {
            notifyReducer
        } = this.props;

        return <div>
                <PageTitleBarUI 
                    style={NotifyListInfo.pageTitleBar.style} 
                    className={NotifyListInfo.pageTitleBar.className} 
                    leftInfo={NotifyListInfo.pageTitleBar.leftInfo} 
                    rightInfo={NotifyListInfo.pageTitleBar.rightInfo} />
                <PagePanelUI
                    style={NotifyListInfo.panel.style}
                    className={NotifyListInfo.panel.className}
                    titleInfo={NotifyListInfo.panel.titleInfo}
                    toolInfo={NotifyListInfo.panel.toolInfo}>
                    <div className="col-md-9 col-sm-9 col-xs-12">
                        <textarea
                            ref={node => {this.content = node;}}
                            onChange={this._contentUpdate.bind(this)}
                            className="form-control"
                            rows="5"
                            value={this.state.content}
                            placeholder="请输入内容……(限制99字)"></textarea>
                        <div className="text-remain pull-right">剩余{this.state.content ? 99-this.state.content.length : 99}字</div>
                        <div className="clear"></div>
                        <button type="button"
                            onClick={this._sendNotify.bind(this)}
                            className="btn btn-mine pull-right btn-send"
                            disabled={this.state.content.length ? '' :'disabled'}>发&nbsp;&nbsp;布</button>
                    </div>
                </PagePanelUI>
                <LoadingUI
                    style={{background:'rgba(255, 255, 255, .1)',display:notifyReducer.cmdSendNotify.isRequest ? 'block':'none'}}/>
            </div>;
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(SendNotify);
