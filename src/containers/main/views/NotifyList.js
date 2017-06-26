import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import _ from 'underscore';
import PageTitleBarUI from '../../../components/common/PageTitleBarUI';
import PagePanelUI from '../../../components/common/PagePanelUI';
import PaginationUI from '../../../components/common/PaginationUI';
import LoadingUI from '../../../components/common/LoadingUI';

import {
    handleDialog,
    dialogs
} from '../../../actions/CommonAction';

import {
    getNotifyList,
    removeNotify
} from '../../../actions/NotifyAction';

import CommonUtil from '../../../addons/CommonUtil';
/**
 * [DeviceListInfo 当前页配置信息]
 * @type {Object}
 */
const NotifyListInfo = {
    pageTitleBar:{
        style:'',
        className:'',
        leftInfo:{
            className:'',
            text:'通知记录'
        }
    },
    panel:{
        style:'',
        className:'',
        titleInfo:{
            style:'',
            text:'通知列表',
            smallText:''
        },
        toolInfo:{
            settings:[],
            showClose:false
        }
    },
    range:10
};

class NotifyList extends Component {
    componentDidMount(){
        let userName,userKey;
        if(!this.props.loginReducer.userName){
            userKey = window.localStorage.getItem('userkey');
            userName = userKey.split('#')[0];
        }else{
            userKey = this.props.loginReducer.userKey;
            userName = this.props.loginReducer.userName;
        }
        this.props.dispatch(getNotifyList(userName,userKey,1,NotifyListInfo.range));
    }
    _navPage(page){
        let userKey = this.props.loginReducer.userKey;
        let userName = this.props.loginReducer.userName;
        this.props.dispatch(getNotifyList(userName,userKey,page.index,NotifyListInfo.range));
    }
    _remove(notify){
        let that = this;
        let userKey = this.props.loginReducer.userKey;
        let userName = this.props.loginReducer.userName;

        this.props.dispatch(handleDialog({
            type:dialogs.CONFIRM_DIALOG,
            text:'您确定要进行删除操作吗？',
            callback:()=>{
                that.props.dispatch(removeNotify(
                    userName,
                    userKey,
                    [notify.guid],
                    ()=>{
                        let page = _.find(that.props.notifyReducer.pages,(item)=>{
                            return item.active;
                        });
                        if(page){
                            if(that.props.notifyReducer.list.length == 1 && that.props.notifyReducer.pages.length >1 ){
                                page = that.props.notifyReducer.pages[that.props.notifyReducer.pages.length - 2];
                            }
                            that.props.dispatch(getNotifyList(userName,userKey,page.index,NotifyListInfo.range));
                        }
                    }));
            }
        }));
    }
    render() {
        const {
            notifyReducer
        } = this.props;
        let that = this;
        let list = notifyReducer.list;
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
                    <div className="row">
                        <div className="col-sm-12">
                            <table style={{display:list.length ? 'table':'none'}} id="datatable" className="table jambo_table table-striped table-bordered">
                                <thead>
                                    <tr role="row">
                                        <th style={{width:'50px'}}>序号</th>
                                        <th className="col-md-8 col-sm-8 col-xs-8">通知内容</th>
                                        <th >时间</th>
                                        <th >操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    list.map((item,index)=>{
                                        return <tr key={index} role="row" className={index/2 ? "even" : "old"}>
                                                <td>{index+1}</td>
                                                <td>{item.text} </td>
                                                <td>{CommonUtil.formatDate(parseInt(item.time))}</td>
                                                <td><button onClick={that._remove.bind(this,item)} type="button" className="btn btn-round btn-primary btn-xs btn-unbind">删除</button></td>
                                            </tr>;
                                    })
                                }
                                </tbody>
                            </table>
                            <div className="no-record" style={{display:list.length ? 'none':'block'}}>未查到记录</div>
                        </div>
                    </div>
                    <div className="row" style={{display:list.length ? 'block':'none'}}>
                        <div className="col-sm-5">
                            <div className="dataTables_info">显示 1-{list.length}/{notifyReducer.total} 条</div>
                        </div>
                        <div className="col-sm-7">
                            <PaginationUI navPage={this._navPage.bind(this)} pages={notifyReducer.pages}/>
                        </div>
                    </div>
                </PagePanelUI>
                <LoadingUI
                    style={{background:'rgba(255, 255, 255, .1)',display:notifyReducer.cmd.isRequest ? 'block':'none'}}/>
            </div>;
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(NotifyList);
