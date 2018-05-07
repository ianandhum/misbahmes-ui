import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import $ from 'jquery'
import './callforpaper.css'
import Header from "./Header"
class CallForPaper extends React.Component{
    componentDidMount(){
        $("#preload").children().fadeOut("slow",function(){
            $("#preload").fadeOut("slow")
            $('body').css({"overflow-y":"scroll"})
        })
    }
    render(){
        return (
            <React.Fragment>
                <Header className="light"/>
            <Row style={{margin:0}} className="call-for-paper">
                <Col xs={12} md={12} className="head_box">
                    <h1>We'd love your contribution</h1>
                </Col>
                <Col xs={12} md={12} className="main_box">
                    <h3 className="head">Research Papers Invited</h3>
                    <p>
                        Genuine Research Papers are invited to be published in&nbsp;
                        <b>Misbah - niche of knowledge</b><br/>
                        Please read the instructions carefully
                    </p>
                </Col>
                <Col xs={12} md={12} className="cont_box">
                    <ol>
                        <li>The Papers should not have been published elsewhere</li>
                        <li>The matter should be typed and saved preferably as Adobe PageMaker file <b>.pmd</b> or, MS.Word file <b>.docx/.doc</b></li>
                        <li>Accepted font faces are Times New Roman / ML-TT Karthika / ML-TT Revathi / DV-TT- Yogesh , with font size 12</li>
                        <li>Bibliography / References must be given per <b>M.L.A Handbook</b> latest edition. </li>
                        <li><b>.pdf</b> files are <b>not</b> accepted</li>
                        <li>There should be given an Abstract of not more than 250 words and a few Key-words before the introduction</li>
                        <li>Complete address with Mobile No. and e-mail ID is mandatory</li>
                        
                    </ol>
                </Col>
                <Col xs={12} md={12} className="cont_box" >
                    <p>The soft copy shall be sent to the following e-mail id of the Research Forum<br/> <a  className="mail_to" href="mailto:misbahmes@gmail.com">misbahmes@gmail.com</a></p>
                </Col>
                <Col xs={12} md={12} className="main_box">
                    <h3 className="head">Subscription</h3>
                    <p>
                        Misbah - niche of knowledge is also available in print format<br/>
                    </p>
                </Col>
                <Col xs={12} md={12} className="cont_box subscribe">
                    <Col xs={12} md={8} className="first">
                        <ul>
                            <li>Payment shall be credited to the Joint Account of the Principal & Coordinator, Research Committee, MES College Nedumkandam in the Union Bank of India, Nedumkandam branch.</li>
                            <li><b>A/C No.455102010025494</b></li>
                            <li><b>IFSC Code UBIN0545511</b></li>
                            <li>The Journal will be posted to the address concerned</li>
                        </ul> 
                    </Col>
                    <Col xs={12} md={4}>
                        <Col xs={12} md={12} className="price_box">

                            <div className="duration">single copy</div>
                            <div className="price">&#8377;&nbsp;750/-</div>
                        </Col>
                        <Col xs={12} md={12} className="price_box">
                            <div className="duration">annual Subscription</div>
                            <div className="price">&#8377;&nbsp;1500/-</div>
                        </Col>
                    </Col>
                </Col>
                
                <Col xs={12} md={12} className="foot_crumb page_callfor" key="foot_crumb"  style={{color:"#333"}}>
                  <div className="txt">Copyright  <b> &copy; 2018 MES College Nedumkandam </b>
                            <span className="foot_link"><a  style={{color:"#000",fontWeight:"bold"}} href="http://mesnedumkandam.in/show_page.php?m_id=802">mesnedumkandam.in</a></span>
                       
                  </div>
                </Col>
            </Row>
            
            </React.Fragment>
        )
    }
}
export default CallForPaper