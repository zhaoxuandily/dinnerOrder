import React, { Component } from 'react';
import {
    connect
} from 'react-redux';

class ToastUI extends Component {

  render(){
    const {
        commonReducer
    } = this.props;
    
    return (
        <div className="toast" style={{display:commonReducer.toast.errorText ? 'block' :'none'}}>
            <div className='toast-tip'>{commonReducer.toast.errorText}</div>
        </div>
    );
  }
}
function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(ToastUI);
