import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import Config  from 'config';
import CommonUtil from '../../../addons/CommonUtil';
import PageTitleBarUI from '../../../components/common/PageTitleBarUI';
import PagePanelUI from '../../../components/common/PagePanelUI';

// import {
//     handleDialog,
//     dialogs
// } from '../../../actions/CommonAction';

import {
    editTemplate,
    returnTemplate,
    updateCurrentTemplate,
    receiveTempEdit,
    requestTempEdit,
    getMyTemplate,
    sendTemplate
} from '../../../actions/TemplateAction';

import LoadingUI from '../../../components/common/LoadingUI';
import TemplateItemUI from '../../../components/main/views/EditTemplate/TemplateItemUI';

/**
 * [NotifyListInfo 当前页配置信息]
 * @type {Object}
 */
const TemplateInfo = {
    pageTitleBar:{
        style:'',
        className:'',
        leftInfo:{
            className:'',
            text:'模板'
        }
    },
    panel:{
        style:'',
        className:'',
        titleInfo:{
            style:'',
            text:'模板列表',
            smallText:''
        },
        toolInfo:{
            settings:[],
            showClose:false
        }
    },
    templates:[
        {
            id:0,
            desc:'沉浸型模板',
            img:require('../../../source/images/chenjin.jpg'),
        },
        {
            id:1,
            desc:'左右型模板',
            img:require('../../../source/images/zuoyou.jpg')
        },
        {
            id:2,
            desc:'上下型模板',
            img:require('../../../source/images/shangxia.jpg')
        }
    ]
};

let initState = {
    title1:'',
    title1Valid:true,
    titleSmall1:'',
    titleSmall1Valid:true,
    titleSmall2:'',
    titleSmall2Valid:true,
    titleSmall3:'',
    titleSmall3Valid:true,
    img1Upload:false,
    img1UploadValid:true,
    img1ErrorText:'',
    imgSmallUpload:false,
    imgSmallUploadValid:true,
    imgSmallErrorText:'',
    imgSmallUpload:false,
    imgSmal2UploadValid:true,
    imgSmal2ErrorText:'',
    imgSmallUpload:false,
    imgSmal3UploadValid:true,
    imgSmal3ErrorText:''
};

class EditTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }
    componentDidMount(){
        let userName,userKey;
        if(!this.props.loginReducer.userName){
            userKey = window.localStorage.getItem('userkey');
            userName = userKey.split('#')[0];
        }else{
            userKey = this.props.loginReducer.userKey;
            userName = this.props.loginReducer.userName;
        }
        let that = this;
        this.props.dispatch(getMyTemplate(userName,userKey,function(jsonObg){
            if(jsonObg.id == 2){
                that.setState({
                    title1:jsonObg.text,
                    titleSmall1:jsonObg.text1,
                    titleSmall2:jsonObg.text2,
                    titleSmall3:jsonObg.text3,
                });
            }else{
                that.setState({
                    title1:jsonObg.text
                });
            }
        }));
    }
    _templateClick(item){
        if(item.id == this.props.templateReducer.myTemplate.id){
            this.props.dispatch(editTemplate(item.id));
            this.props.dispatch(updateCurrentTemplate(this.props.templateReducer.myTemplate));
            initState.title1 = this.props.templateReducer.myTemplate.text;
            initState.titleSmall1 = this.props.templateReducer.myTemplate.text1;
            initState.titleSmall2 = this.props.templateReducer.myTemplate.text2;
            initState.titleSmall3 = this.props.templateReducer.myTemplate.text3;
        }else{
            this.props.dispatch(editTemplate(item.id));
            initState.title1 = '';
            initState.titleSmall1 = '';
            initState.titleSmall2 = '';
            initState.titleSmall3 = '';
        }
        this.setState(initState);
    }
    _navClick(){
        this.props.dispatch(returnTemplate());
    }
    _title1Update(){
        if(this.title1.value.length > 10){
            return;
        }
        this.setState({
            title1:this.title1.value,
            title1Valid:true
        });
    }
    _addPic(id){
        if(id == 'big-pic-file'){
            this.setState({
                img1UploadValid:true,
                img1ErrorText:''
            });
        }else if(id == 'small-pic-file1'){
            this.setState({
                imgSmallUploadValid:true,
                imgSmallErrorText:''
            });
        }else if(id == 'small-pic-file2'){
            this.setState({
                imgSmal2UploadValid:true,
                imgSmal2ErrorText:''
            });

        }else if(id == 'small-pic-file3'){
            this.setState({
                imgSmal3UploadValid:true,
                imgSmal3ErrorText:''
            });
        }
       
        document.getElementById(id).click();
    }
    _picUpdate(url,e){
        let that = this;
        if(e.target.files && e.target.files[0]){
            let file = e.target.files[0];
           
            let image = new Image();
            image.onload=function(){
                let tsizeStr = image.width+'*'+image.height;
                let sizeStr = '';
                if(that.props.templateReducer.currentTemplate.id == '2'){
                    if(url == 'backUrl' && tsizeStr != '1000*349'){
                        that.setState({
                            img1UploadValid:false,
                            img1ErrorText:'图片尺寸不合法'
                        });
                    }else if(url == 'img1' && tsizeStr != '100*100'){
                        that.setState({
                            imgSmallUploadValid:false,
                            imgSmallErrorText:'图片尺寸不合法'
                        });
                    }else if(url == 'img2' && tsizeStr != '100*100'){
                        that.setState({
                            imgSmal2UploadValid:false,
                            imgSmal2ErrorText:'图片尺寸不合法'
                        });
                    }else if(url == 'img3' && tsizeStr != '100*100'){
                        that.setState({
                            imgSmal3UploadValid:false,
                            imgSmal3ErrorText:'图片尺寸不合法'
                        });
                    }
                        //return;
                }else if(that.props.templateReducer.currentTemplate.id == '1'){
                    if(tsizeStr != '350*450'){
                        that.setState({
                            img1UploadValid:false,
                            img1ErrorText:'图片尺寸不合法'
                        });
                        //return;
                    }
                    sizeStr = '350*450';
                }else if(that.props.templateReducer.currentTemplate.id == '0'){
                    sizeStr = '1000*524';
                    if(tsizeStr != '350*450'){
                        that.setState({
                            img1UploadValid:false,
                            img1ErrorText:'图片尺寸不合法'
                        });
                        //return;
                    }
                }

                that.props.dispatch(requestTempEdit());
                CommonUtil.uploadFn({
                    fileInfo:{
                        file:file,
                        param:JSON.stringify({
                            type: 'image',
                            fileName: file.name
                        })
                    },
                    url:that.props.commonReducer.serverConfig.pafsDomain + '/file/rest/uploadservices/uploadfile',
                    onFileUploadComplete:function(res){
                        that.props.dispatch(receiveTempEdit());
                        let info = {};
                        info[url] = that.props.commonReducer.serverConfig.pafsDomain + res.large_link;
                        that.props.dispatch(updateCurrentTemplate(info));
                    },
                    onFileUploadError:function(res){
                        that.props.dispatch(receiveTempEdit());
                    }

                })
            };
            image.src = window.URL.createObjectURL(file);
        }
    }
    _uploadImgbg(){

    }
    _titleSmallUpdate(title){
       if(this[title].value.length > 30){
            return;
        }
        let state = {};
        state[title] = this[title].value;
        this.setState(state); 
    }
    _checkTitle1(){
        let reg = /^[\s\S]{1,10}$/;
        if(reg.test(this.title1.value.trim())){
            return true;
        }else{
            this.setState({
                title1Valid:false
            });
            return false;
        }
    }
    _checkTitleSmall1(){
        let reg = /^[\s\S]{1,30}$/;
        if(reg.test(this.titleSmall1.value.trim())){
            return true;
        }else{
            this.setState({
                titleSmall1Valid:false
            });
            return false;
        }
    }
     _checkTitleSmall2(){
        let reg = /^[\s\S]{1,30}$/;
        if(reg.test(this.titleSmall2.value.trim())){
            return true;
        }else{
            this.setState({
                titleSmall2Valid:false
            });
            return false;
        }
    }
     _checkTitleSmall3(){
        let reg = /^[\s\S]{1,30}$/;
        if(reg.test(this.titleSmall3.value.trim())){
            return true;
        }else{
            this.setState({
                titleSmall3Valid:false
            });
            return false;
        }
    }
    _checkImg(){
        if(this.props.templateReducer.currentTemplate.backUrl){
            return true;
        }else{
            this.setState({
                img1UploadValid:false,
                img1ErrorText:'请添加图片'
            });
            return false;
        }
    }
    _checkImgSmall1(){
        if(this.props.templateReducer.currentTemplate.img1){
            return true;
        }else{
            this.setState({
                imgSmallUploadValid:false,
                imgSmallErrorText:'请添加图片'
            });
            return false;
        }
    }
    _checkImgSmall2(){
        if(this.props.templateReducer.currentTemplate.img2){
            return true;
        }else{
            this.setState({
                imgSmal2UploadValid:false,
                imgSmal2ErrorText:'请添加图片'
            });
            return false;
        }
    }
    _checkImgSmall3(){
        if(this.props.templateReducer.currentTemplate.img3){
            return true;
        }else{
            this.setState({
                imgSmal3UploadValid:false,
                imgSmal3ErrorText:'请添加图片'
            });
            return false;
        }
    }
    _ok(){
         let flag = true;
         /*if(this.props.templateReducer.currentTemplate.id == '0' || this.props.templateReducer.currentTemplate.id == '1'){
            flag = this._checkTitle1() && this._checkImg();
        }else{
            flag = this._checkTitle1()&& 
                    this._checkImg()&& 
                    this._checkImgSmall1()&& 
                    this._checkImgSmall2()&&
                    this._checkImgSmall3()&&
                    this._checkTitleSmall1()&&
                    this._checkTitleSmall2()&&
                    this._checkTitleSmall3();
        }*/
        if(flag){
            let templateinfo = {
                id:this.props.templateReducer.currentTemplate.id,
                backUrl:this.props.templateReducer.currentTemplate.backUrl,
                text:this.title1.value.trim()
            };
            if(this.props.templateReducer.currentTemplate.id == '2'){
                templateinfo.img1 = this.props.templateReducer.currentTemplate.img1;
                templateinfo.img2 = this.props.templateReducer.currentTemplate.img2;
                templateinfo.img3 = this.props.templateReducer.currentTemplate.img3;
                templateinfo.text1 = this.state.titleSmall1;
                templateinfo.text2 = this.state.titleSmall2;
                templateinfo.text3 = this.state.titleSmall3;
            }
            this.props.dispatch(sendTemplate(
                this.props.loginReducer.userName,
                this.props.loginReducer.userKey,
                templateinfo));            
        }
    }
    _preview(){
        let flag = true;
        /*if(this.props.templateReducer.currentTemplate.id == '0' || this.props.templateReducer.currentTemplate.id == '1'){
            flag = this._checkTitle1() && this._checkImg();
        }else{
            flag = this._checkTitle1()&& 
                    this._checkImg()&& 
                    this._checkImgSmall1()&& 
                    this._checkImgSmall2()&&
                    this._checkImgSmall3()&&
                    this._checkTitleSmall1()&&
                    this._checkTitleSmall2()&&
                    this._checkTitleSmall3();
        }*/

        if(flag){
            let templateinfo = {
                id:this.props.templateReducer.currentTemplate.id,
                backUrl:this.props.templateReducer.currentTemplate.backUrl,
                text:this.title1.value.trim()
            };
            if(this.props.templateReducer.currentTemplate.id == '2'){
                templateinfo.img1 = this.props.templateReducer.currentTemplate.img1;
                templateinfo.img2 = this.props.templateReducer.currentTemplate.img2;
                templateinfo.img3 = this.props.templateReducer.currentTemplate.img3;
                templateinfo.text1 = this.state.titleSmall1;
                templateinfo.text2 = this.state.titleSmall2;
                templateinfo.text3 = this.state.titleSmall3;
            }
            this.props.dispatch(updateCurrentTemplate({
                img:templateinfo
            }));
            
            CommonUtil.setCookie('templateinfo',JSON.stringify(templateinfo));
            window.open(window.location.protocol+"//"+window.location.host+Config.project+'/preview');
        }
    }
    render() {
        const {
            templateReducer
        } = this.props;
        let that = this;
        let content;
        if(templateReducer.currentTemplate.state == 'edit'){
            TemplateInfo.panel.titleInfo.smallText = '/ 编辑';
            let templateName,size,picStyle;
            if(templateReducer.currentTemplate.id == '2'){
                templateName = '上下型模板';
                size='图片类型（png,jpg） 尺寸（1000*349）';
                picStyle = {
                    width:'300px',
                    height:'120px',
                    lineHeight:'120px'
                };
            }else if(templateReducer.currentTemplate.id == '1'){
                templateName = '左右型模板';
                size='图片类型（png,jpg） 尺寸（350*450）';
                 picStyle = {
                    width:'210px',
                    height:'270px',
                    lineHeight:'270px'
                };
            }else if(templateReducer.currentTemplate.id == '0'){
                templateName = '沉浸型模板';
                size='图片类型（png,jpg） 尺寸（1000*524）';
                 picStyle = {
                    width:'300px',
                    height:'150px',
                    lineHeight:'150px'
                };
            }
            content = <form className="form-horizontal form-label-left">
                <span className="section">{templateName}</span>
                <div className={this.state.title1Valid ? "item form-group" : "item form-group bad"} >
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" >认证标题 <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <input 
                        ref={node => {this.title1 = node;}}
                        onChange={this._title1Update.bind(this)}
                        value={this.state.title1}
                        id="template-name" 
                        className="form-control col-md-7 col-xs-12" 
                        name="template-name" placeholder="限制10字" 
                        type="text" />
                    </div>
                    <div className="alert">标题不能为空</div>
                </div>
                <div className={this.state.img1UploadValid ? "item form-group" : "item form-group bad"}>
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" >图片 <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="temp-big-pic temp-pic" style={picStyle} onClick={this._addPic.bind(this,"big-pic-file")}>
                            <img src={templateReducer.currentTemplate.backUrl ? templateReducer.currentTemplate.backUrl : require('../../../source/images/cropper.jpg')}/>
                            <div className="mask">
                                <a href="#"><i className="fa fa-plus"></i>点击添加图片</a>
                            </div>
                        </div>
                        <div className="temp-big-pic-promt">{size}</div>
                       <input
                            accept=".png,.jpg"
                            onChange={this._picUpdate.bind(this,'backUrl')} 
                            id="big-pic-file" className="hidden" type="file" multiple="" />
                    </div>
                    <div className="alert">{this.state.img1ErrorText}</div>
                </div>
                <div className={this.state.imgSmallUploadValid ? "item form-group" : "item form-group bad"} style={{display:templateReducer.currentTemplate.id == 2 ? 'block' :'none'}}>
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" >图片(下) <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="temp-small-pic temp-pic" onClick={this._addPic.bind(this,"small-pic-file1")}>
                            <img src={templateReducer.currentTemplate.img1 ? templateReducer.currentTemplate.img1 : require('../../../source/images/cropper.jpg')}/>
                            <div className="mask">
                                <a href="#"><i className="fa fa-plus"></i>点击添加图片</a>
                            </div>
                        </div>
                        <div className="temp-big-pic-promt">图片类型（png,jpg） 尺寸（100*100）</div>
                        <input
                            accept=".png,.jpg"
                            onChange={this._picUpdate.bind(this,'img1')} 
                            id="small-pic-file1" className="hidden" type="file" multiple="" />
                    </div>
                    <div className="alert">{this.state.imgSmallErrorText}</div>
                </div>
                <div className={this.state.titleSmall2Valid ? "item form-group" : "item form-group bad"} style={{display:templateReducer.currentTemplate.id == 2 ? 'block' :'none'}}>
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" > </label>
                    <div className="col-md-6 col-sm-6 col-xs-12 pic-item">
                         <textarea
                            ref={node => {this.titleSmall1 = node;}}
                            onChange={this._titleSmallUpdate.bind(this,'titleSmall1')}
                            value={this.state.titleSmall1}
                            className="form-control small-desc" rows="2" placeholder="描述(限制30字)"></textarea>
                    </div>
                </div>

                <div className={this.state.imgSmal2UploadValid ? "item form-group" : "item form-group bad"} style={{display:templateReducer.currentTemplate.id == 2 ? 'block' :'none'}}>
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" > </label>
                    <div className="col-md-6 col-sm-6 col-xs-12 ">
                        <div className="temp-small-pic temp-pic" onClick={this._addPic.bind(this,"small-pic-file2")}>
                            <img src={templateReducer.currentTemplate.img2 ? templateReducer.currentTemplate.img2 : require('../../../source/images/cropper.jpg')}/>
                            <div className="mask">
                                <a href="#"><i className="fa fa-plus"></i>点击添加图片</a>
                            </div>
                        </div>
                        <div className="temp-big-pic-promt">图片类型（png,jpg） 尺寸（100*100）</div>
                        <input
                            accept=".png,.jpg"
                            onChange={this._picUpdate.bind(this,'img2')} 
                            id="small-pic-file2" className="hidden" type="file" multiple="" />
                        
                    </div>
                    <div className="alert">{this.state.imgSmal2ErrorText}</div>
                </div>
                <div className={this.state.titleSmall2Valid ? "item form-group" : "item form-group bad"} style={{display:templateReducer.currentTemplate.id == 2 ? 'block' :'none'}}>
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" > </label>
                    <div className="col-md-6 col-sm-6 col-xs-12 pic-item">
                        <textarea
                                ref={node => {this.titleSmall2 = node;}}
                                onChange={this._titleSmallUpdate.bind(this,'titleSmall2')}
                                value={this.state.titleSmall2}
                                className="form-control small-desc" rows="2" placeholder="描述(限制30字)"></textarea>
                    </div>
                </div>
                <div className={this.state.imgSmal3UploadValid ? "item form-group" : "item form-group bad"} style={{display:templateReducer.currentTemplate.id == 2 ? 'block' :'none'}}>
                    <label className="control-label col-md-3 col-sm-3 col-xs-12"> </label>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="temp-small-pic temp-pic" onClick={this._addPic.bind(this,"small-pic-file3")}>
                            <img src={templateReducer.currentTemplate.img3 ? templateReducer.currentTemplate.img3 : require('../../../source/images/cropper.jpg')}/>
                            <div className="mask">
                                <a href="#"><i className="fa fa-plus"></i>点击添加图片</a>
                            </div>
                        </div>
                        <div className="temp-big-pic-promt">图片类型（png,jpg） 尺寸（100*100）</div>
                        <input
                            accept=".png,.jpg"
                            onChange={this._picUpdate.bind(this,'img3')} 
                            id="small-pic-file3" className="hidden" type="file" multiple="" />
                    </div>
                    <div className="alert">{this.state.imgSmal3ErrorText}</div>
                </div>
                <div className={this.state.titleSmall3Valid ? "item form-group" : "item form-group bad"} style={{display:templateReducer.currentTemplate.id == 2 ? 'block' :'none'}}>
                    <label className="control-label col-md-3 col-sm-3 col-xs-12"> </label>
                    <div className="col-md-6 col-sm-6 col-xs-12 pic-item">
                        <textarea
                                ref={node => {this.titleSmall3 = node;}}
                                onChange={this._titleSmallUpdate.bind(this,'titleSmall3')}
                                value={this.state.titleSmall3}
                                className="form-control small-desc" rows="2" placeholder="描述(限制30字)"></textarea>
                    </div>
                </div>
                <div className="ln_solid"></div>
                <div className="form-group">
                    <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                      <button onClick={this._navClick.bind(this)} type="button" className="btn btn-default" type="button">取消</button>
                      <button onClick={this._ok.bind(this)} type="button" className="btn btn-primary btn-mine">发布</button>
                      <button onClick={this._preview.bind(this)} type="button" className="btn btn-primary">预览</button>
                    </div>
                </div>
            </form>;
        }else{
            TemplateInfo.panel.titleInfo.smallText = '';
            content = TemplateInfo.templates.map((item)=>{
                item.edit = templateReducer.myTemplate.id == item.id;
                return <TemplateItemUI key={item.id} itemInfo={item} handleClick={that._templateClick.bind(that,item)}/>;
            });
        }
        
        return <div>
                <PageTitleBarUI 
                    style={TemplateInfo.pageTitleBar.style} 
                    className={TemplateInfo.pageTitleBar.className} 
                    leftInfo={TemplateInfo.pageTitleBar.leftInfo} 
                    rightInfo={TemplateInfo.pageTitleBar.rightInfo} />
                <PagePanelUI
                    style={TemplateInfo.panel.style}
                    className={TemplateInfo.panel.className}
                    titleInfo={TemplateInfo.panel.titleInfo}
                    toolInfo={TemplateInfo.panel.toolInfo}
                    navClick={this._navClick.bind(this)}>
                    {content}
                </PagePanelUI>
                <LoadingUI
                    style={{background:'rgba(255, 255, 255, .1)',display:templateReducer.cmdEdit.isRequest ? 'block':'none'}}/>
            </div>;
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(EditTemplate);
