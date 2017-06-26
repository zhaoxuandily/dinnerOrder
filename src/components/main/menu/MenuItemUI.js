import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';


class MenuItemUI extends Component {

    render() {
        const {
            itemInfo,
            menuFirstNav,
            menuSecondNav
        } = this.props;
        let that = this;
        return  <li className={itemInfo.active ? 'active' : ''}>
                    <a onClick={menuFirstNav.bind(that,itemInfo)}><i className={itemInfo.iclass}></i> {itemInfo.title} <span className={itemInfo.child.length ? "fa fa-chevron-down" : ""}></span></a>
                    <ul className="nav child_menu" style={{display:itemInfo.active ? 'block' : 'none'}}>
                        {
                          itemInfo.child.map((item)=>{
                            return  <li key={item.id} className={item.active ? 'current-page':''}><a onClick={menuSecondNav.bind(that,itemInfo,item)}>{item.title}</a></li>;
                          })
                        }
                    </ul>
      </li>;
    }
}
export default connect()(MenuItemUI);

