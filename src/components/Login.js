import React from "react"
import "./login.css"
import Col from "react-bootstrap/lib/Col"
import Link from "react-router-dom/Link";
class Login extends React.Component{
    render(){
        return (
            <div className="login_page--main">
                <div className="login_page">
                    <Col xs={12} md={12} style={{textAlign:"center",marginBottom:"30px",color:"#333"}}>
                                    <Link to="/" className="brand_link">
                                    <h2 className="brand"><span >MISBAH</span>
                                    <span className="tag_line">niche of knowledge</span>
                                    </h2>
                                    </Link>
                    </Col>
                    <InputController />
                </div>
            </div>
        )   
    }
}
class InputController extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:"",
            password:""
        }
    }
    change(type,e){
        if(e){
            var prevState=this.state
            if(type==="uname"){

                prevState.username=e.target.value
            }
            else if(type==="upass"){

                prevState.password=e.target.value
            }
            else{
                throw new  Error("Input Controller Error")
            }
            this.setState(prevState)
        }
    }
    loginClick(e){
        e.preventDefault();
        console.log(this.state)
    }
    render(){
       return (
           <React.Fragment>
                <form>
                    <Col xs={12} md={12}>
                          <InputBox onChange={this.change.bind(this)} value={this.state.username} labelText="Username" typeID="uname" tabIndex="0" placeholder="Enter user name"/>
                          <InputBox onChange={this.change.bind(this)} value={this.state.password} labelText="Password" type="password" typeID="upass" placeholder="Enter password"/>
                          <button className="btn btn-primary" onClick={this.loginClick.bind(this)}>login</button>
                    </Col>
                </form>                       
           </React.Fragment>
       ) 
    }
}
const InputBox=(props)=>(
    <div className="form-group">
        <label className="control-label" >{props.labelText}</label>
        <input  type={(props.type)?props.type:"text"} placeholder={props.placeholder} value={props.value} tabIndex={props.tabIndex} className="form-control" onChange={(e)=>props.onChange(props.typeID,e)} />
    </div>
)

export default Login
