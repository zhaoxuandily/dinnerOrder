import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';


class TemplateItemUI extends Component {

    render() {
        const {
            itemInfo,
            handleClick
        } = this.props;
        return  <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="temp-item">
                            <img src={itemInfo.img} className="temp-icon" />
                            <div className="temp-desc">
                                <p>{itemInfo.desc}</p>
                            </div>
                            <div className="temp-tool">
                                <button className="btn btn-mine btn-tmp-edit" onClick={handleClick}>{itemInfo.edit ? '编辑' : '使用'}</button>
                            </div>
                        </div>
                    </div>
                </div>;
    }
}
export default connect()(TemplateItemUI);

