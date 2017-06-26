import React, {
    Component
} from 'react';

class MessageCheckDialog extends Component {
    render() {
        const {
          dialog,
          closeDialog
        } = this.props;
        return <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={closeDialog}>
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 className="modal-title">查看</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-horizontal form-label-left">
                                <label  className="control-label col-md-3 col-sm-3 col-xs-12">通知内容:</label>
                                <div className="col-md-8 col-sm-8 col-xs-12 control-div">{dialog.content}</div>
                            </div>
                             <div className="form-horizontal form-label-left">
                                <label  className="control-label col-md-3 col-sm-3 col-xs-12">时间:</label>
                                <div className="col-md-8 col-sm-8 col-xs-12 control-div">{dialog.time}</div>
                            </div>
                        </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={closeDialog}>关闭</button>
              </div>
            </div>;
    }
}

export default MessageCheckDialog;
