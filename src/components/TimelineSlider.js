import React ,{Component} from 'react'
import $ from 'jquery'
import { CSSTransitionGroup } from 'react-transition-group' 
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Label from 'react-bootstrap/lib/Label'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import {findDOMNode} from 'react-dom'
class TimelineSlider extends    Component{
    constructor(props){
        super(props)
        this.handleSelect.bind(this)
        //this.handleNext.bind(this)
        //this.handlePrev.bind(this)
        this.state={
            status:false,
            active:0,
            post:this.props.post
        }

        $(findDOMNode(this.refs.time_line_ul)).css({scrollTop:0})
    }
  
    componentDidUpdate(){
        if(this.props.post && !this.state.status){
            this.setState({
                status:true,
                active:0,
                post:this.props.post
                
            })
        }
    }
    handleSelect(id){
        var prevState=this.state
        prevState.active=(id>=0)?id:0;
        this.props.onSelectItem(prevState.active);
        this.setState(
            prevState
        )
        var top=$(findDOMNode(this.refs.time_line_ul)).scrollTop()
        if(this.state.active<this.state.post.length/4){
            $(findDOMNode(this.refs.time_line_ul)).animate({scrollTop:top-100},300)
        }
        else if(this.state.active>this.state.post.length/2){
            $(findDOMNode(this.refs.time_line_ul)).animate({scrollTop:top+100},300)
        }
        
       
    }
    handleNext(){
        var prevState=this.state
        var active=this.state.active-1
        prevState.active=(active>=0)?active:0;
        this.props.onSelectItem(prevState.active);
        this.setState(
            prevState
        )
        var top=$(findDOMNode(this.refs.time_line_ul)).scrollTop()
        $(findDOMNode(this.refs.time_line_ul)).animate({scrollTop:(this.state.active<this.state.post.length-4)?top-50:top},300);
    }
    handlePrev(){
        var prevState=this.state
        var active=this.state.active+1
        prevState.active=(active<this.state.post.length)?active:active-1;
        this.props.onSelectItem(prevState.active);
        this.setState(
            prevState
        )
        var top=$(findDOMNode(this.refs.time_line_ul)).scrollTop()
        $(findDOMNode(this.refs.time_line_ul)).animate({scrollTop:(this.state.active>=4)?top+50:top},300);
    
    }
    render(){

        
        return(
            <div  className="links">
                <div className="next"  onClick={this.handleNext.bind(this)}>
                   {this.state.status && <Glyphicon glyph="menu-up" className="g" />}
                </div>
                <ul ref="time_line_ul">
                    {
                        this.state.status && this.state.post.map((elem,index)=>(
                            
                            <li className={(this.state.active===index)?"active":""} key={elem.id} onClick={()=>this.handleSelect(index)}>{elem.head} {elem.year}</li>
                        ))
                    }
                    {
                        !this.state.status && <li>No Data...</li>
                    }
                </ul>
                <div className="prev" onClick={this.handlePrev.bind(this)}>
                    {this.state.status && <Glyphicon glyph="menu-down" className="g"/>}
                </div>
            </div>
        )
    }
}
class TimeLinePost extends Component{
    host="http://api.misbahmes.com/v1"
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
                                NO DATA
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
                                {this.props.post.post_desc.substring(0,150)}...
                            </div>
                            <Col xs={12} md={12}>
                                    
                                        <a href={this.props.post.post_id+"/reader"} className="launch-btn dark" style={{float:"left"}}>READ NOW</a>
                                    
                                
                                
                            </Col>
                    </Col>
            ]
        )
    }
}
class TimeLine extends Component{
    host="http://api.misbahmes.com/v1"
    url= "/posts/all";
    thumb="/thumb/"
    constructor(props){
        super(props);
        fetch(this.host+this.url).then(
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
    }
    onJsonFetch(json){
        console.log(json)
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
        console.log(this.state)
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
        
      
        return ([
                
                <Col xs={12} md={3} className="left" key="head_key_3232">
                    <Col xs={12} md={6} className="head">
                        book shelf
                    </Col>
                    <Col xs={12} md={12} >
                        <TimelineSlider post={sliderData} status={this.state.status} onSelectItem={this.handleTimelineItemSelect.bind(this)}/>
                    </Col>
                </Col>,
                <Col xs={12} md={9} className="right" key="box_key_1229">
                    <CSSTransitionGroup
                            transitionName="example"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={1}
                            >
                    <Row className="post_item" key={this.state.active_index+"i_d"}>
                        
                        {
                            (this.state.active_index>=0)?
                                <TimeLinePost key={this.state.active_index} post={this.state.post[this.state.active_index]}/>
                            :   
                                <h1 className="head_no">NO DATA</h1>
                        }  
                    </Row>
                    </CSSTransitionGroup>

                </Col>

        ])
    }
}
