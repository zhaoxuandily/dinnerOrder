import React, {
    Component
} from 'react';

class PaginationUI extends Component {
    _navPage(page){
        this.props.navPage(page);
    }
    _prePage(isFirst){
        if(!isFirst){
            this.props.navPage(this.props.pages[this.index-1]);
        }
    }
    _nextPage(isLast){
        if(!isLast){
            this.props.navPage(this.props.pages[this.index+1]);
        }
    }
    render() {
        let isFirst = false, isLast = false;
        let that = this;
        let pages = this.props.pages.map((page, index)=>{
                let style = 'paginate_button';
                if(page.active){
                    style = 'paginate_button active';
                    if(index == that.props.pages.length-1){
                        isLast = true;
                    }else if(index == 0){
                        isFirst = true;
                    }
                    this.index = index;
                }
                return <li onClick={that.props.navPage.bind(that,page)} key={page.index} className={style}><a>{page.index}</a></li>;
            });
        if(this.props.pages.length == 1){
            isFirst = true;
            isLast = true;
        }
        return <div className="dataTables_paginate paging_simple_numbers">
                <ul className="pagination">
                    <li onClick={this._prePage.bind(this,isFirst)} className={isFirst ? "paginate_button previous disabled" : "paginate_button previous"}><a>上一页</a></li>
                    {pages}
                    <li onClick={this._nextPage.bind(this,isLast)} className={isLast ? "paginate_button next disabled" : "paginate_button next"}><a>下一页</a></li>
                </ul>
            </div>;
    }
}

export default PaginationUI;
