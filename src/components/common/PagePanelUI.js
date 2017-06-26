import React, {
    Component
} from 'react';

import IconUI from './IconUI';

class PagePanelUI extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            expanded: true
        };
    }
    _expand(){
        this.setState({
            expanded: !this.state.expanded
        });
    }
    _return(){
        if(this.props.navClick){
            this.props.navClick();
        }
    }
    render() {
        const {
            style,
            className,
            titleInfo,
            toolInfo
        } = this.props;
        let rootClassName = className ? className : "x_panel";
 
        return  <div className={rootClassName} style={style ? style : {}}>
                    <div className="x_title" style={titleInfo.style ? titleInfo.style : {}}>
                        <h2><span style={{'cursor':'pointer'}} onClick={this._return.bind(this)}>{titleInfo.text}</span><small>{titleInfo.smallText}</small></h2>
                        <ul className="nav navbar-right panel_toolbox">
                            <li onClick={this._expand.bind(this)}><a className="collapse-link"><IconUI className={this.state.expanded ? "fa fa-chevron-up" : "fa fa-chevron-down"}/></a></li>
                            <li className="dropdown" style={{display:toolInfo.settings && toolInfo.settings.length ? "block":"none"}}>
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><IconUI className="fa fa-wrench"/></a>
                                <ul className="dropdown-menu" role="menu">
                                    {
                                        toolInfo.settings.map((item)=>{
                                            return <li key={item}><a href="#">{item}</a></li>;
                                        })
                                    }
                                </ul>
                            </li>
                            <li style={{display:toolInfo.showClose ? "block":"none"}}><a className="close-link"><IconUI className="fa fa-close"/> </a></li>
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content" style={{display:this.state.expanded ? "block" : "none"}}>
                        {this.props.children}
                    </div>
                </div>;
    }
}
export default PagePanelUI;
