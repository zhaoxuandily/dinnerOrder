import React, {
    Component
} from 'react';

import {
    connect
} from 'react-redux';

import {
    handleDialog,
    dialogs
} from '../../actions/CommonAction';

import ConfirmDlg from './ConfirmDlg';
import MessageCheckDlg from './MessageCheckDlg';
import EventUtil from '../../addons/EventUtil';

const {
    CONFIRM_DIALOG,
    MESSAGE_CHECK_DIALOG
} = dialogs;


class DialogUI extends Component {
    _closeDialog(){
        this.props.dispatch(handleDialog(""));
    }
    _ok(){
        this.props.dispatch(handleDialog(""));
    }
    _stopEvent(e){
        e.stopPropagation();
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        EventUtil.preventDefault();
        EventUtil.stopPropagation();
    }
    render() {
        const {
            commonReducer
        } = this.props;

        if(commonReducer.dialog.type){
            let content = null;
            let sizeClass = 'modal-dialog';
            if(commonReducer.dialog.type == CONFIRM_DIALOG){
                content = <ConfirmDlg 
                    dialog = {commonReducer.dialog}
                    closeDialog={this._closeDialog.bind(this)}
                    okClick={this._ok.bind(this)}/>;
                sizeClass += ' modal-sm';
            }else if(commonReducer.dialog.type == MESSAGE_CHECK_DIALOG){
                content = <MessageCheckDlg
                    dialog = {commonReducer.dialog}
                    closeDialog={this._closeDialog.bind(this)}/>;
            }
            return <div className="modal fade in" style={{display:'block'}} onClick={this._closeDialog.bind(this)}>
                        <div className={sizeClass} onClick={this._stopEvent.bind(this)}>
                            {content}
                        </div>
                    </div>;
        }else{
            return null;
        }
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(DialogUI);
