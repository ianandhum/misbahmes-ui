import React,{Component} from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import {AutoAffix} from 'react-overlays'
import Document from 'react-pdf/dist/Document'
import Page from 'react-pdf/dist/Page'
import $ from 'jquery'
import './viewer.css'
import LoadError from "./LoadError"
import Header from './Header';

let ContainerFluid=(props)=>(
  <div className="container-fluid" style={{margin:0,padding:0}}>{props.children}</div>
)
class HeadBox extends Component{

    host="https://api.misbahmes.com/v1"
    url= "/post/"
    constructor(props){
        super(props);
        fetch(this.host+this.url+this.props.id,{method:"GET",redirect:"follow"}).then(
            this.onJsonResult.bind(this),
            this.onJsonError.bind(this)
        )
        this.state={
            status:false
        }
        this.contentShouldDisplay=false
        
    }
    
    onJsonResult(result){
        if(result.ok){
            result.json().then(this.onJsonFetch.bind(this),this.onJsonError.bind(this))
        }

    }
    onJsonError(result){
        console.log('Could not load data')
        this.setState({status:false})
        if(typeof this.props.onError==="function"){
          this.props.onError()
          this.props.onContentLoad(false);
        }
    }
    onJsonFetch(json){
        if(!json.status){
            
            this.onJsonError()
            return
        }
        let state=json.data
        state.status=true
        this.props.onContentLoad(true);
        this.setState(state)
    } 
    getDate(str){
      if( str==="" || str===undefined) return
      var year = str.substring(0, 4);
      var month = str.substring(4, 6);
      var day = str.substring(6, 8);
      var hour = str.substring(8, 10);
      var minute = str.substring(10, 12);
      var second = str.substring(12, 14);
      var date = new Date(year, month-1, day, hour, minute, second);
      return date.toLocaleString()
    }
  render(){
    var content={}
    content.head=this.state.post_head+" "+this.state.post_year
    content.desc=this.state.post_desc
    this.state.status && $('title').text(content.head)
    content.pdfURL="https://api.misbahmes.com/v1/download/"+this.props.id+".pdf"
    return(
      <Row style={{margin:0}}>
        <Header className="light" />
        <Col xs={12} md={12} className={"v_header "+this.props.className} key={this.state.post_id}>
            {
              this.state.status &&([
              <Col xs={12} md={9} key="col_head">
                <h1>{content.head}</h1>
                <div className="posted">
                                  Uploaded on <b>{this.getDate(this.state.timestamp)}</b>
                </div>
                
                {
                this.contentShouldDisplay &&
                (<Col xs={12} md={12}>
                    {content.desc}
                </Col>)
                
                }
              </Col>,
              <Col xs={12} md={3} key="col_btn" className="dl_btn">
                <a href={content.pdfURL} className="launch-btn" style={{width:"80%"}}>DOWNLOAD AS PDF</a>
              </Col> 
            ])
            }
        </Col>
        
      </Row>
    )
  }
}

class DocViewer extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      scale:1,
      pageNumber:1,
      totalPages:1
    }
  }
  onDocumentLoadSuccess(doc){
    var prevState=this.state
    prevState.totalPages=doc.pdfInfo.numPages
    $("#preload").children().fadeOut("slow",function(){
      $("#preload").fadeOut("slow")
      $('body').css({"overflow-y":"scroll"})
    })
    this.setState(prevState)
  }
  onDocumentLoadError(){
    
    if(typeof this.props.onError==="function"){
      this.props.onError()
    }
  }
  onPageLoadSuccess(page){
    var scale=$('.react-pdf__Page').width()/page.originalWidth
    var prevState=this.state
    prevState.scale=scale
    prevState.loaded="loaded"
    $('.react-pdf__Page').css({height:page.height})
    this.setState(prevState)
  }
  pageSelect(event){
    var prevState=this.state
    var pageNo=event.target.value | 0
    if((0<=pageNo) && pageNo<=this.state.totalPages){
      prevState.pageNumber=parseInt(pageNo,10)
      this.setState(prevState)
    }
    
    
  }
  movePrevious(){
    var prevState=this.state
    if(this.state.pageNumber>1){
      --prevState.pageNumber;
      $(window).scrollTop($('.v_header').height()+80)
      this.setState(prevState)
    } 
  }
  moveNext(){
    var prevState=this.state
    if(this.state.pageNumber<this.state.totalPages){
      ++prevState.pageNumber;
      $(window).scrollTop($('.v_header').height()+80)
      this.setState(prevState)
    }
  }
  render(){
    const propsToPdfDoc={
      onDocumentLoadSuccess:this.onDocumentLoadSuccess.bind(this),
      onDocumentLoadError:this.onDocumentLoadError,
      onPageLoadSuccess:this.onPageLoadSuccess.bind(this),
      pageNumber:this.state.pageNumber,
      scale:this.state.scale,
      file:"https://api.misbahmes.com/v1/file/"+this.props.postId,
      className:"pdf_cont",
      loaded:this.state.loaded

    }
    let AffixProps={
     
    }
    if($(window).width()<800){
      AffixProps.OffsetBottom=340
    }
    else{
      AffixProps.OffsetTop=340
    }
    
    return([
            <AutoAffix  key="pdf_affix" {...AffixProps}>
                <Col xs={12} md={12} className="pdf-nav">
                  <div className="cont">
                     <Col xs={3} md={2} style={{margin:0,padding:0}}>
                     <span className="nav_btn prev"  onClick={this.movePrevious.bind(this)}>
                       previous page
                     </span>
                     </Col>
                     
                     <Col xs={6} md={8} className="center_box" style={{margin:0,padding:0}}>
                        page 
                        <b>
                          <input type="text" value={this.state.pageNumber} onChange={this.pageSelect.bind(this)} className="page_input"/>
                        
                        </b> of <b>{this.state.totalPages}</b>
                     </Col>
                     <Col xs={3} md={2} style={{margin:0,padding:0}}>
                     <span className="nav_btn next" onClick={this.moveNext.bind(this)}>
                       next page
                     </span>
                     </Col>
                    </div>
                </Col>
            </AutoAffix>,
            <Col xs={12} md={11} className="pdf_cont_box" key="pdf_cont_block">
                  
                  <PdfContent  
                   {...propsToPdfDoc}/>
            </Col>
    ])
  }
}
class PdfContent extends React.Component {
  render() {
    const propsDocument={
      onLoadSuccess:(page)=>this.props.onDocumentLoadSuccess(page),
      onLoadError:this.props.onDocumentLoadError,
      file:(this.props.file),
      className:(this.props.className),
      error:(<LoadingBox info='EDOC'/>),
      loading:(<LoadingBox info='LOAD'/>),
      noData:<LoadingBox info='NODOC'/>
    }
    const propsPage={
      renderTextLayer:true,
      onLoadSuccess:(page)=>this.props.onPageLoadSuccess(page),
      scale:this.props.scale,
      pageNumber:this.props.pageNumber,
      className:"cont_page_pdf",
      error:("Error Loading Page"),
      loading:("Loading Page..."),
      noData:<LoadingBox info='EPAGE'/>,
      key:"page_id_"+this.props.loaded
    }
    return (
        <Document  {...propsDocument}>
            <Page  {...propsPage}/>
        </Document>
        
    )
  }
}

class LoadingBox extends Component{

  render(){
    const error={
      'EDOC':"ERROR LOADING DOCUMENT",
      'EPAGE':"ERROR LOADING PAGE",
      'NOPAGE':"PAGE NOT FOUND",
      'NODOC':"DOCUMENT NOT FOUND",
      'LOAD':(<div class="loader-img dark"></div>),
      'LOADDOC':"LOADING DOCUMENT...",
      
    }
    return (
      <div className="fill_box" style={{minHeight:"200px"}}>{ error[this.props.info]}</div>
    )
  }
}

class Viewer extends Component{  
    constructor(props){
      super(props)
      this.state={
        loadError:false,
        loading:true
      }
    }  
    onLoadError(){
      var prevState=this.state
      prevState.loadError=true
      this.setState(prevState)
    }
    showUI(status){
      this.setState({
        loadError:!status,
        loading:false
      })
    }
    render(){
        return(
          <React.Fragment>

              {
                
               this.state.loadError|| 
                  <ContainerFluid className="v_viewer">
                      <HeadBox onContentLoad  = {this.showUI.bind(this)} id={this.props.match.params.postId} onError={this.onLoadError.bind(this)}/>
                      {
                      this.state.loading ?
                        <div style={{minHeight:"400px"}}>
                        </div>
                      :
                      <DocViewer postId={this.props.match.params.postId}  onError={this.onLoadError.bind(this)}/>
                      }
                      <Col xs={12} md={12} className="foot_crumb" key="foot_crumb" style={{backgroundColor:'transparent',color:"#333"}}>
                        <div className="txt">Copyright  <b> &copy; 2018 MES College Nedumkandam </b>
                                  <span className="foot_link"><a  style={{color:"#000",fontWeight:"bold"}} href="http://mesnedumkandam.in/show_page.php?m_id=802">mesnedumkandam.in</a></span>
                        </div>
                      </Col>
                  </ContainerFluid>
              
              }
              {
                this.state.loadError &&
                <LoadError msg="external source not loaded"/>
              }

            </React.Fragment>
            );
    }
}
export default Viewer
