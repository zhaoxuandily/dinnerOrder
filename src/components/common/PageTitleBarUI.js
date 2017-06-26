import React, {
    Component
} from 'react';

import SearchUI from './SearchUI';

class PageTitleBarUI extends Component {

    render() {
        const {
            style,
            className,
            leftInfo,
            rightInfo
        } = this.props;

        let rootClassName = className ? className : "page-title";
        let leftClassName = leftInfo && leftInfo.className ? leftInfo.className : "title_left";
        let rightClassName = rightInfo && rightInfo.className ? rightInfo.className : "title_right";
        let search = null;
        if(rightInfo){
            search = <SearchUI 
                            defaultVaule={rightInfo.defaultVaule}
                            placeholder={rightInfo.placeholder} 
                            btText={rightInfo.btText}
                            inputChange={rightInfo.inputChange}
                            doSearch={rightInfo.doSearch}
                            />;
        } 
        return  <div className={rootClassName} style={style ? style : {}}>
                    <div className={leftClassName}>
                        <h3>{leftInfo.text}</h3>
                    </div>
                    <div className={rightClassName}>
                        {search}
                    </div>
                </div>;
    }
}
export default PageTitleBarUI;
