import React, {
    Component
} from 'react';

class SearchUI extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value: ''
        };
     }
    componentDidMount(){
        if(this.props.defaultVaule){
            this.setState({
                value:this.props.defaultVaule
            });
        }
    }
    _doSearch(){
        if(this.props.doSearch){
            this.props.doSearch(this.inputValue.value);
        }
    }
    _inputChange(){
        if(this.props.inputChange){
            this.props.inputChange(this.inputValue.value);
        }
        this.setState({
            value:this.inputValue.value
        });
    }
    render() {
        const {
            style,
            className,
            placeholder,
            btText
        } = this.props;

        let rootClassName = className ? className : 'col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search';
        let buttonText = btText ? btText : 'Go!';
        return  <div className={rootClassName} style={style ? style : {}}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.value}
                            ref={node => {this.inputValue = node;}}
                            placeholder={placeholder}
                            onChange={this._inputChange.bind(this)}/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={this._doSearch.bind(this)}>{buttonText}</button>
                        </span>
                    </div>
                </div>;
    }
}
export default SearchUI;
