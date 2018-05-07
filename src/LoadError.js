import React from "react"
import Col from "react-bootstrap/lib/Col"
import Row from "react-bootstrap/lib/Row"
import $ from 'jquery'
import "./override.css"
class NotFound extends React.Component{
    componentDidMount(){
        $("#preload").children().fadeOut("slow",function(){
            $("#preload").fadeOut("slow")
            $('body').css({"overflow-y":"scroll"})
        })
    }
    reloadPage(){
        window.location.reload()
    }
    render(){
        $('body').css({background:"#f7f7f7"})
        const linkStyle={
            
                margin:"50px 0px",
                textAlign:"center",
                display:"block",
                width:"150px",
                padding:"5px 10px",
                backgroundColor:"#27a3a8",
                borderRadius:"0px",
                fontSize:"1.1em",
                fontFamily:"Lato,sans-serif",
                color:"#fff",
                cursor:"pointer"
        }
        var msg="check your internet connection"
        if(this.props.msg!==undefined){
            msg=this.props.msg    
        }
        
        return (
            <Row>
                
                <Col xs={12} md={12} className="main_box_error" style={{marginTop:"12%"}}>
                    <h3 className="head" style={{fontSize:"3em"}}>We're Sorry </h3>
                    <p>
                        We've trouble fetching some resources <br/>
                        <b>{msg}</b><br/>
                        
                         
                    </p>
                    <span onClick={this.reloadPage} style={linkStyle}>retry</span>
                    
                </Col>
                
            </Row>
        )   
    }
}
export default NotFound