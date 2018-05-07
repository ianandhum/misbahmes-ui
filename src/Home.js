import React ,{Component} from 'react'
import { CSSTransitionGroup } from 'react-transition-group' 
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Label from 'react-bootstrap/lib/Label'
import OwlCarousel from 'react-owl-carousel2' 
import Modal from "react-modal"
import $ from 'jquery'
import Header from "./Header"
import LoadError from "./LoadError"
import "./home.css"
import "react-owl-carousel2/lib/styles.css" 
import "react-owl-carousel2/src/owl.theme.green.css"

class LatestRelease extends Component{
    host="https://api.misbahmes.com/v1"
    url= "/posts/1"
    constructor(props){
        super(props);
        fetch(this.host+this.url,{method:"GET",redirect:"follow"}).then(
            this.onJsonResult.bind(this),
            this.onJsonError.bind(this)
        )
        this.state={
            status:false
        }
    }
    

    
    onJsonResult(result){
        if(result.ok){
            result.json().then(this.onJsonFetch.bind(this),this.onJsonError.bind(this))
        }

    }
    onJsonError(result){
        console.log('could not load data')
        this.setState({status:false})
        if(typeof this.props.onLoadError==='function')
            this.props.onLoadError()
    }
    onJsonFetch(json){
        if(!json.status){
            
            this.onJsonError()
            return
        }
        var state=json.data[0]
        state['status']=true
        this.setState(state)



    }
    
    render(){
        var renderer=null
        if(this.state.status){
            renderer=(
                <Col xs={12} md={8} className="round-box">
                    <div className="thumb_img"></div>
                    <div className="text">
                        <h3>{this.state.post_head.substring(0,20)} {this.state.post_year}</h3>
                        <h5>{this.state.post_desc.substring(0,200)}...</h5>
                        <a href={"/"+ this.state.post_id +"/reader"} className="launch-btn" style={{width:"200px",display:"block",margin:"auto"}}>READ NOW</a>
                    </div>
            </Col>
            )
        }
        else{

           renderer=(   <Col xs={12} md={8} className="round-box">
                            <h4 style={{textAlign:"center",paddingTop:'100px'}}>NO DATA</h4>
                        </Col>
                    )
        }
        return (
            <Row>
                {renderer}
            </Row>
        )
    }
}
class ContentHead extends Component{
    render(){
        return (
            <Row>
                <Col xs={12} md={12} className="text-content">
                   <h2><span><span className="red">M</span>edium of <span className="red">I</span>ntellectual <span className="red">S</span>earch and <span className="red">B</span>eacon of <span className="red">A</span>cademic <span className="red">H</span>armony</span></h2>
                   <h5><b> A peer refereed multi disciplinary research journal</b> published as bi-annual with more than four hundred subscribers and more than five hundred Research Papers published to its credit</h5>
                   <h4 style={{textAlign:"left",paddingLeft:"20px"}}>ISSN: 0976­-2523</h4>
                </Col>
            </Row>
        )
    }
}
class TimeLinePost extends Component{
    host="https://api.misbahmes.com/v1"
    url= "/posts/all";
    thumb="/thumb/"
    getThumb(){
        return "url('"+this.host+this.thumb+this.props.post.post_id+"')";
    }
    getDate(){
        var str=this.props.post.timestamp
        if(str==="") return
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
        if(!this.props.post){
            return(
                <Col xs={12} md={6} className="cont_box" key="cont-box_2_2">
                            <div className="head">
                                Sorry , We're Having trouble getting data
                            </div>
                </Col>
            )
        }
        return(
            [
                    <Col xs={12} md={6} className="img_box_2" key="img-box_2_2">
                            <div className="img" style={{backgroundImage:this.getThumb()}}>
                            </div>
                            
                           
                        </Col>,
                        
                        <Col xs={12} md={6} className="cont_box" key="cont-box_2_2">
                            <div className="head">
                                {this.props.post.post_head +" "+ this.props.post.post_year}
                            </div>
                            <div className="posted">
                                Uploaded on <Label bsSize="medium" bsStyle='default'>{this.getDate()}</Label>
                            </div>
                            <div className="cont">
                                {this.props.post.post_desc.substring(0,300)}...
                            </div>
                            <Col xs={12} md={12}>
                                    
                                        <a href={this.props.post.post_id+"/reader"} className="launch-btn dark" style={{float:"left"}}>READ NOW</a>
                                    
                                
                                
                            </Col>
                    </Col>
            ]
        )
    }
}
class Posts extends Component{
    host="https://api.misbahmes.com/v1"
    url= "/posts/all";
    thumb="/thumb/"
    constructor(props){
        super(props);
        fetch(this.host+this.url,{method:"GET",redirect:"follow"}).then(
            this.onJsonResult.bind(this),
            this.onJsonError.bind(this)
        )
        this.state={
            status:false,
            active_index:-1
        }
    }
    
    onJsonResult(result){
        $("#preload").children().fadeOut("slow",function(){
            $("#preload").fadeOut("slow")
            $('body').css({"overflow-y":"scroll"})
        })
        if(result.ok){

            result.json().then(this.onJsonFetch.bind(this),this.onJsonError.bind(this))
        }

    }
    onJsonError(result){
        console.log('could not load data')
        if(typeof this.props.onLoadError==='function')
            this.props.onLoadError()
    }
    onJsonFetch(json){
        if(!json.status){
            
            this.onJsonError()
            return
        }
        this.setState({
            status:true,
            post : json.data,
            active_index:0
        })



    }
    
    handleTimelineItemSelect(id){
        if(id>=0){
            var prevState=this.state
            prevState.active_index=id
            this.setState(prevState);
        }
    }
    
    render(){
        var sliderData=[]
        if(this.state.status){
            
            for(var i=0;i<(this.state.post.length);i++){
                sliderData[i]={
                    id:this.state.post[i].post_id,
                    year:this.state.post[i].post_year,
                    head:this.state.post[i].post_head 
                }
            }
        }
        const options = {
            items: 1,
            infinite:true,
            nav: false,
            rewind: true,
            autoplay: true,
            autoplayTimeout:10000

        };
         
        return (

            (this.state.status)?
            <OwlCarousel ref="posts" options={options}>
                    
                        
                        {
                                
                                (this.state.post.map((postItem,i)=>  
                                    <Row className="post_item" key={i+"_post_item"}>
                                        <TimeLinePost post={postItem}/>
                                    </Row>
                                )
                                )
                                
                            
                        }  
                    
            </OwlCarousel>  
            :
            null 
        )
    }
}
//includes 
class Footer extends    Component{
    loadLogin(){
        window.location.replace("/login")
    }
    render(){
        return([
            <Col xs={12} md={12} className="band" key="band_foot"   id="about"> 
                
                <Col xs={12} md={3}>
                    <div className="img" onDoubleClick={this.loadLogin}></div>
                </Col>
                <Col xs={12} md={9}>
                    <h2 className="heading">Misbah <small>Niche of Knowledge</small></h2>
                    <h4 style={{fontFamily:"Lato"}}>An initiative of the Research Committee, MES College Nedumkandam</h4>
                    <Col xs={12} md={12}  className="f_text">
                        Realising the importance of research in the higher education scenario, the Research Committee of MES College Nedumkandam initiated publishing the peer-refereed research journal ‘Misbah - niche of knowledge’ in 2009. The journal got recognized with ISSN in 2010. The biannual research journal received more than four hundred subscriptions and had published five hundred research papers of varied disciplines in 17 volumes, so far. The Research Committee is proud that ‘Misbah’ published Research Papers of scholars from the institutions of academic excellence across the nation, viz, IITs, Central and State Universities and Colleges.
                    </Col>
                </Col>
            </Col>

           
        ])
    }
}
let PersonMain=function(props){
    let image={}
    if(props.image){
        image.style=(props.imgStyle)?props.imgStyle:{}
        image.style.backgroundImage="url('"+ props.image +"')"
            
    }
    return (
        <React.Fragment>
            <Col xs={12} md={4} className={"person_box_main"} onClick={()=>props.onClick(props.index,props.person)}>
                   <div className="image" {...image}  ></div>
                   <div className="head name">{props.head}</div>
                   <div className="name">{props.name}</div>
                   <div className="pos">{props.pos}</div>
            </Col>

        </React.Fragment>
    )
}
class EditorBox extends Component{
    constructor(props){
        super(props)
        this.editor=[
            {
                image:"editor.jpg",
                head:"Chief Editor",
                name:"Prof. A.M. Rasheed",
                pos:"Principal, MES College  Nedumkandam"
                ,ph:"9446409795",
                mail:"amrasheed20@gmail.com"
            },
            {
                image:"sub_editor.jpg",
                head:"Associate Editor",
                name:"Dr. D.Rejikumar" ,
                pos:"[HoD], Dept. of Malayalam,MES College Nedumkandam",
                ph:"8893424207",
                mail:"dr.drejikumar@gmail.com" 
            },
            {
                image:"sub_editor_2.jpg",
                head:"Associate Editor",
                name:" Dr. A.S. Sumesh",
                pos:"[HoD], Dept. of Hindi, MES College  Nedumkandam"
                ,ph:"9744168522",
                mail:"drassumesh@gmail.com"
            }

        ]
        this.state={
            modal:{
                show:false,
                person:{}
            }
        }
    }

    personLightBox(index,type){
        let data=this.editor
        var prevState=this.state
        prevState.modal.show=true
        prevState.modal.person=data[index]
        var img={}
        if(data[index].image!==undefined){
           img.style={
               backgroundImage:"url('"+ data[index].image +"')",
               backgroundSize:"100%",
               backgroundPositionY:"top"
           } 
        }
        prevState.modal.person.imageProps=img
        this.setState(prevState)
    }
    closeLightBox(){
        var prevState=this.state
        prevState.modal.show=false
        this.setState(prevState)
    }
    render(){
        return(
            <React.Fragment>
                    {
                            this.editor.map((item,index)=>(
                                <PersonMain {...item} key={index+"_item"} index={index}  onClick={this.personLightBox.bind(this)}/>
                            ))
                    }
                <Modal
                 isOpen={this.state.modal.show}
                 className="modal_box"
                 shouldCloseOnOverlayClick={true}
                 ariaHideApp={false}
                 onRequestClose={this.closeLightBox.bind(this)}
                 overlayClassName="modal_overlay"
                 >
                    
                    <div className="close_btn" onClick={this.closeLightBox.bind(this)}>&#10799;</div>
                    <Col xs={12} md={5} className="col1">
                        <div className="image" {...this.state.modal.person.imageProps}></div>
                        

                    </Col>
                    <Col xs={12} md={7} className="col2" >
                        <h3 className="name" >{this.state.modal.person.name}</h3>
                        <h5 className="post" >{this.state.modal.person.pos}</h5>
                        <h3 className="big_txt">Contact Via</h3>
                        <h5 className="phone">Phone Number : <a href={"tel:"+this.state.modal.person.ph}>{this.state.modal.person.ph}</a></h5>
                        <h5 className="mail">E-mail : <a href={"mailto:"+this.state.modal.person.mail}>{this.state.modal.person.mail}</a></h5>
                    </Col>

                </Modal>
            </React.Fragment>
        )
    }
}
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            loadError:false
        }
    }
    statChanged(){
        var prevState=this.state
        prevState.loadError=true
        this.setState(prevState)
    }
    render(){
        const   transOpts={
            transitionEnterTimeout:500,
            transitionLeaveTimeout:300,
            transitionAppear:true,
            transitionAppearTimeout:500
        }
        var transAppear=false
        if($("#preload").css('display')==='none'){
            transAppear=true
            
        }
        $('title').text("Misbah - niche of knowledge")
        $('body').attr({class:""}).addClass('home')
        return ( 
            

                
                    <React.Fragment>
                    {
                        this.state.loadError ||

                        <main className="main-slide">

                            <Header className="light"/>
                            <Row className="main-cont" style={{margin:"0px"}} ref="rowMain">
                                <Col xs={12} md={7} className="col-left" >
                                <CSSTransitionGroup 
                                        transitionName="round_box_text"
                                        {...transOpts}>

                                        <ContentHead key={transAppear}/>
                                </CSSTransitionGroup>
                                </Col>
                                <Col xs={12} md={5} className="col-right" >
                                   <CSSTransitionGroup 
                                        {...transOpts}
                                        transitionName="round_box"
                                        >
                                        <LatestRelease key={transAppear} onLoadError={this.statChanged.bind(this)}/>
                        
                                   </CSSTransitionGroup>
                                </Col>
                            </Row>

                            <Row  className="cont-features" style={{margin:0}}>
                               <EditorBox />
                            </Row>
                        
                            <div className="trap-top trap-left"></div>
                            <Row className="cont-journal" style={{margin:"0px"}}>
                                 <Posts  onLoadError={this.statChanged.bind(this)}/>
                            </Row>
                            <div className="trap-bottom trap-right" style={{backgroundColor:"#263238"}}></div>
                            <Row className="cont-foot" style={{margin:"0px"}}>
                                <Footer/>
                                <Col xs={12} md={12} className="foot_crumb" key="foot_crumb">
                        
                                 <div className="txt">Copyright  <b> &copy; 2018 MES College Nedumkandam, Chembalam PO Idukki , kerala, PIN:685553</b>
                                        <span className="foot_link"><a  style={{color:"#ccc",fontWeight:"bold"}} href="http://mesnedumkandam.in/show_page.php?m_id=802">mesnedumkandam.in</a></span>
                                    </div>

                                </Col>
                            </Row>
                        
                        </main>
                    }
                    {
                        this.state.loadError &&
                        
                        <LoadError/>
                    }
                    </React.Fragment>
            
        
                
            
        )
    }
}
export {Footer};
export default Home;
