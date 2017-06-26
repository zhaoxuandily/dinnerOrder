import React, {
    Component
} from 'react';

class ConfirmDialog extends Component {
    _ok(){
        if(this.props.dialog.callback){
            this.props.dialog.callback();
            this.props.closeDialog();
        }else{
            this.props.okClick();
        }
    }
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
                <h4 className="modal-title">提示</h4>
              </div>
              <div className="modal-body">
                  <p>{dialog.text}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={closeDialog}>取消</button>
                <button type="button" className="btn btn-primary" onClick={this._ok.bind(this)}>确定</button>
              </div>
            </div>;
    }
}

export default ConfirmDialog;
