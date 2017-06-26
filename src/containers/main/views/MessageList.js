import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import PageTitleBarUI from '../../../components/common/PageTitleBarUI';
import PagePanelUI from '../../../components/common/PagePanelUI';
import PaginationUI from '../../../components/common/PaginationUI';

import {
    handleDialog,
    dialogs
} from '../../../actions/CommonAction';

import {
    navPage
} from '../../../actions/MessageAction';
/**
 * [ListInfo 当前页配置信息]
 * @type {Object}
 */
const MessageListInfo = {
    pageTitleBar:{
        style:'',
        className:'',
        leftInfo:{
            className:'',
            text:'我的消息'
        }
    },
    panel:{
        style:'',
        className:'',
        titleInfo:{
            style:'',
            text:'消息列表',
            smallText:''
        },
        toolInfo:{
            settings:[],
            showClose:false
        }
    }
};

class MessageList extends Component {
    _navPage(page){
        this.props.dispatch(navPage(page));
    }
    _check(item){
        this.props.dispatch(handleDialog( Object.assign({}, item,{type:dialogs.MESSAGE_CHECK_DIALOG})));
    }
    render() {
        const {
            messageReducer
        } = this.props;

        let that = this;
        return <div>
                <PageTitleBarUI 
                    style={MessageListInfo.pageTitleBar.style} 
                    className={MessageListInfo.pageTitleBar.className} 
                    leftInfo={MessageListInfo.pageTitleBar.leftInfo} 
                    rightInfo={MessageListInfo.pageTitleBar.rightInfo} />
                <PagePanelUI
                    style={MessageListInfo.panel.style} 
                    className={MessageListInfo.panel.className}
                    titleInfo={MessageListInfo.panel.titleInfo}
                    toolInfo={MessageListInfo.panel.toolInfo}>
                    <div className="row">
                        <div className="col-sm-12">
                            <table id="datatable" className="table jambo_table table-striped table-bordered">
                                <thead>
                                    <tr role="row">
                                        <th className="col-md-8 col-sm-8 col-xs-8">内容</th>
                                        <th >时间</th>
                                        <th >状态</th>
                                        <th >操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    messageReducer.list.map((item,index)=>{
                                        return <tr key={index} role="row" className={index/2 ? "even" : "old"}>
                                                <td>{item.content}</td>
                                                <td>{item.time} </td>
                                                <td>{item.state}</td>
                                                <td>
                                                    <button 
                                                        onClick={that._check.bind(this,item)} type="button" 
                                                        className="btn btn-round btn-primary btn-xs btn-unbind">查看</button>
                                                </td>
                                            </tr>;
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="dataTables_info">显示 1-3/50 条</div>
                        </div>
                        <div className="col-sm-7">
                            <PaginationUI navPage={this._navPage.bind(this)} pages={messageReducer.pages}/>
                        </div>
                    </div>
                </PagePanelUI>
            </div>;
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(MessageList);
