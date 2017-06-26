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
    getDeviceList,
    unbindDevice
} from '../../../actions/DeviceAction';
/**
 * [DeviceListInfo 当前页配置信息]
 * @type {Object}
 */
const DeviceListInfo = {
    pageTitleBar:{
        style:'',
        className:'',
        leftInfo:{
            className:'',
            text:'我的设备'
        }
    },
    panel:{
        style:'',
        className:'',
        titleInfo:{
            style:'',
            text:'设备列表',
            smallText:''
        },
        toolInfo:{
            settings:[],
            showClose:false
        }
    },
    roles:{
        1:'超级管理员',
        2:'普通管理员'
    },
    range:10
};

class DeviceList extends Component {
    componentDidMount(){
        let userName,userKey;
        if(!this.props.loginReducer.userName){
            userKey = window.localStorage.getItem('userkey');
            userName = userKey.split('#')[0];
        }else{
            userKey = this.props.loginReducer.userKey;
            userName = this.props.loginReducer.userName;
        }
        this.props.dispatch(getDeviceList(userName,userKey,1,DeviceListInfo.range));
    }
    _navPage(page){
        let userKey = this.props.loginReducer.userKey;
        let userName = this.props.loginReducer.userName;
        this.props.dispatch(getDeviceList(userName,userKey,page.index,DeviceListInfo.range));
    }
    _unbind(device){
        let that = this;
        let userKey = this.props.loginReducer.userKey;
        let userName = this.props.loginReducer.userName;
        this.props.dispatch(handleDialog({
            type:dialogs.CONFIRM_DIALOG,
            text:'您确定要进行解绑操作吗？',
            callback:()=>{
                that.props.dispatch(unbindDevice(
                    userName,
                    userKey,
                    device.mac,
                    ()=>{
                        let page = _.find(that.props.deviceReducer.pages,(item)=>{
                            return item.active;
                        });
                        if(page){
                            if(that.props.deviceReducer.list.length == 1 && that.props.deviceReducer.pages.length >1 ){
                                page = that.props.deviceReducer.pages[that.props.deviceReducer.pages.length - 2];
                            }
                            that.props.dispatch(getDeviceList(userName,userKey,page.index,DeviceListInfo.range));
                        }
                    }
                ));
            }
        }));
    }
    render() {
        const {
            deviceReducer
        } = this.props;
        let that = this;
        return <div>
                <PageTitleBarUI 
                    style={DeviceListInfo.pageTitleBar.style} 
                    className={DeviceListInfo.pageTitleBar.className} 
                    leftInfo={DeviceListInfo.pageTitleBar.leftInfo} 
                    rightInfo={DeviceListInfo.pageTitleBar.rightInfo} />
                <PagePanelUI
                    style={DeviceListInfo.panel.style} 
                    className={DeviceListInfo.panel.className}
                    titleInfo={DeviceListInfo.panel.titleInfo}
                    toolInfo={DeviceListInfo.panel.toolInfo}>
                    <div className="row">
                        <div className="col-sm-12">
                            <table id="datatable" style={{display:deviceReducer.list.length ? 'table':'none'}} className="table jambo_table table-striped table-bordered">
                                <thead>
                                    <tr role="row">
                                        <th >名称</th>
                                        <th >硬件型号</th>
                                        <th >网关厂商</th>
                                        <th >mac地址</th>
                                        <th >角色</th>
                                        <th >操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    deviceReducer.list.map((item,index)=>{
                                        let bind = <button type="button" onClick={that._unbind.bind(this,item)} className="btn btn-round btn-primary btn-xs btn-unbind">解绑</button>;
                                        return <tr key={index} role="row" className={index/2 ? "even" : "old"}>
                                                <td>{item.nickname}</td>
                                                <td>{item.hard_version} </td>
                                                <td>{item.factory}</td>
                                                <td>{item.mac}</td>
                                                <td>{DeviceListInfo.roles[item.admin_type] }</td>
                                                <td>{bind}</td>
                                            </tr>;
                                    })
                                }
                                </tbody>
                            </table>
                            <div className="no-record" style={{display:deviceReducer.list.length ? 'none':'block'}}>未查到设备</div>
                        </div>
                    </div>
                    <div className="row" style={{display:deviceReducer.list.length ? 'block':'none'}}>
                        <div className="col-sm-5">
                            <div className="dataTables_info">显示 1-{deviceReducer.list.length}/{deviceReducer.total} 条</div>
                        </div>
                        <div className="col-sm-7">
                            <PaginationUI navPage={this._navPage.bind(this)} pages={deviceReducer.pages}/>
                        </div>
                    </div>
                </PagePanelUI>
                <LoadingUI
                    style={{background:'rgba(255, 255, 255, .1)',display:deviceReducer.cmd.isRequest ? 'block':'none'}}/>
            </div>;
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(DeviceList);
