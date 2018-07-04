import React ,{Component} from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import $ from 'jquery'
import Modal from 'react-modal'
import "./about.css"
import Header from "./Header"
class About extends Component{
    constructor(props){
        super(props)
        this.credits={
            
                editorial_board:[
                    {   
                        image:"Dr_Anvar.jpg",
                        name:"Dr. K.Anvar",
                        pos:"Principal, Mahatma Gandhi University College of Teacher Education, Nedumkandam"
                        ,ph:9947150100,
                        mail:"anvaructe@yahoo.com"
                    },
                    {  

                        image:"Dr_Nisam.jpg",
                        name:"Dr. K.M. Nissamudeen", 
                        pos:"Assistant Professor, Department of Physics, Kannur University"
                        ,ph:9387838499,
                        mail:"nisamkm@gmail.com"
                    },
                    {   
                        image:"dr_Lalu_s_kurup.jpg",
                        name:"Dr. Lalu S. Kurup",
                        pos:" Assistant Professor, Department of Malayalam, N.S.S. College, Nilamel, Thiruvananthapuram"
                        ,ph:9497671721,
                        mail:"lalusmudra@gmail.com"
                    },
                    {   
                        image:"Lovely_tr.jpg",
                        name:"Dr. Lovelymol Sebastian",
                        pos:"Associate Professor [HoD],Dept. of Mathematics, M.E.S. College, Nedumkandam"
                        ,ph:9497790165,
                        mail:"lovelymaths95@gmail.com"
                    },
                    {   
                        image:"Thavamani.jpg",
                        name:"Dr. J.P. Thavamany",
                        pos:"Associate Professor, Dept. of Mathematics, M.E.S. College, Nedumkandam"
                        ,ph:9495468930,
                        mail:"jpthavamani@gmail.com"
                    },
                    {   
                        image:"Shamlal.jpg",
                        name:"Prof. Shamlal A.Latheef",
                        pos:"Assistant Professor [HoD], Department of English, M.E.S. College Nedumkandam"
                        ,ph:9447327990,
                        mail:"shamlateef@gmail.com"
                    },
                    {
                        image:"Jabir.jpg",
                        name:"Dr. T.K. Jabir",
                        pos:"[HoD], Dept. of Political Science, M.E.S. College, Nedumkandam"
                        ,ph:9544145564,
                        mail:"tkjabir@gmail.com"
                    }


                ],
                advisory_board:[
                    {   
                        image:"Dr_Umar_Tharamel.jpg",
                        name:"Prof. Dr. Umar Tharamel",
                        pos:"Head of the Department of Malayalam & Kerala Studies, University of Calicut"
                        ,ph:9447675916,
                        mail:"umertharamel@gmail.com"
                    },
                    {
                        image:"Dr_Sunny_Kuriakose.jpg",
                        name:"Dr. Sunny Kuriakose",
                        pos:"Professor and Dean, FISAT, Angamali"
                        ,ph:9495677688,
                        mail:"asunnyk@gmail.com"
                    },
                    {
                        image:"Dr_Abdul_Rasak.jpg",
                        name:"Dr. E. Abdul Razac",
                        pos:"Former Principal, T.K.M. Arts & Science College, Kollam"
                        ,ph:9447150460,
                        mail:"dreabdulrazac@gmail.com"
                    },
                    {
                        image:"Dr_Babu_joseph.jpg",
                        name:"Dr. Babu Joseph",
                        pos:"Associate Professor, Dept. of Hindi, K.E. College, Mannanam"
                        ,ph:9447868474,
                        mail:"drbabuvadakkan@gmail.com"
                    },
                    {
                        image:"Dr_Sabu_MK.jpg",
                        name:"Dr. Sabu M.K.",
                        pos:"Associate Professor, Department of Computer Applications, CUSAT, Kochi"
                        ,ph:9446128197,
                        mail:"sabumk@cusat.ac.in"
                    },
                    {
                        image:"Prof_Abdul_Kalam.jpg",
                        name:"Prof. K.A. Abdul Kalam",
                        pos:"Associate Professor, Dept. of Commerce, M.E.S. Asmabi College, Kodungaloor"
                        ,ph:9847078428,
                        mail:"kalam2307@gmail.com"
                    },
                    {
                        image:"Dr_Nagendra_Shreeniwas.jpg",
                        name:"Dr. Nagendra Sreenivas",
                        pos:"Assistant Professor, Department of Russian and Comparative Literature,JNU, New Delhi"
                        ,ph:9495704516,
                        mail:"nshreenivas@gmail.com"
                    }

                ]
            
        }
        this.state={
            modal:{
                show:false,
                person:{}
            }
        }
    }
    componentWillMount(){
        $("#preload").children().fadeOut("slow",function(){
            $("#preload").fadeOut("slow")
            $('body').css({"overflow-y":"scroll"})
        })
    }
    personLightBox(index,type){
        let data
        if(type==="eb"){
            data=this.credits.editorial_board
        }
        else if(type==="ab"){
            data=this.credits.advisory_board
        }
        var prevState=this.state
        prevState.modal.show=true
        prevState.modal.person=data[index]
        var img={},imgPrefix="credits/"
        if(data[index].image!==undefined){
           img.style={
               backgroundImage:"url('"+imgPrefix+ data[index].image +"')",
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
        
        return (
            <div style={{width:"100%",overflow:"hidden",position:"absolute"}} className="about_container">
                <Header className="light"/>
                <Row className="about-head">
                    <h1 className="head_text"><span> Our Team</span></h1>
                    <h4 className="head_desc">We admire these great souls who put their hearts into it</h4>
                </Row>

                   
                <Row style={{margin:0}} >
                    <Col  xs={12} md={12} className="col_main eb">
                        <h2 className="heading head_abt" id="editorial_board">
                            editorial board
                        </h2>
                        <Col  xs={12} md={12} className="credit_box">
                        
                        {
                            this.credits.editorial_board.map((item,index)=>(
                                <Person {...item} key={index+"_item"} index={index} type="eb" onClick={this.personLightBox.bind(this)}/>
                            ))
                        }
                        </Col> 
                    </Col>
                </Row>
                <Row style={{margin:0}}>
                    
                    <Col  xs={12} md={12} className="col_main ab">
                        <h2 className="heading head_abt" id="advisory_board" >
                            advisory board
                        </h2>
                        <Col  xs={12} md={12} className="credit_box">
                        {
                            this.credits.advisory_board.map((item,index)=>(
                                <Person {...item} key={index+"_item"} index={index} type="ab" onClick={this.personLightBox.bind(this)}/>
                            ))
                        }  
                        </Col> 
                    </Col>
                </Row>
                <Col xs={12} md={12} className="foot_crumb" key="foot_crumb"  style={{backgroundColor:'transparent',color:"#333"}}>
                  <div className="txt">Copyright  <b> &copy; 2018 MES College Nedumkandam </b>
                            <span className="foot_link"><a  style={{color:"#000",fontWeight:"bold"}} href="http://mesnedumkandam.in/show_page.php?m_id=802">mesnedumkandam.in</a></span>
                       
                  </div>
                </Col>
                
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
            </div>
        )
    }
}
let Person=function(props){
    var img={},imgPrefix="credits/"
    if(props.image!==undefined){
       img.style={
           backgroundImage:"url('"+imgPrefix+ props.image +"')",
           backgroundSize:"100%",
           backgroundPositionY:"top"
       } 
    }
    return (
        <React.Fragment>
            <Col xs={12} md={4} className={"person_box "+props.type} onClick={()=>props.onClick(props.index,props.type)}>
                   <div className="image" {...img}></div>
                   <div className="name">{props.name}</div>
                   <div className="pos">{props.pos}</div>
                   <div className="moreLink"></div>
                   
            </Col>

        </React.Fragment>
    )
}




export default About