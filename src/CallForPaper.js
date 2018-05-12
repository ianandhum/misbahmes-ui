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
                    <h1>Call for Papers</h1>
                </Col>
                <Col xs={12} md={12} className="cont_box" style={{marginTop:"30px"}}>
                    <h3 className="head">Ethical Policy</h3>
                    <span className="cont">
                        We publish only genuine and unpublished research papers of multi-
                        disciplinary variance viz., Arts, Science, Humanities and Engineering which can
                        enhance and enrich the diverse fields of the Indian research scenario. The
                        contributor should ensure that the paper is neither accepted nor considered for
                        publication elsewhere and will fully be responsible for the content of the paper,
                        which in no way shall breach any line of conduct concerned with the existing law
                        and order system and public life of the country.
                    </span>
                </Col>
                <Col xs={12} md={12} className="main_box">
                    <h3 className="head">Research Papers Invited</h3>
                    <p>
                        Genuine and unpublished Research Papers of the sort mentioned above are
                        invited to be published in <b>Misbah - niche of knowledge</b><br/>
                        You are requested to read the guidelines kindly and carefully before submission
                        of the Papers
                    </p>
                </Col>
                <Col xs={12} md={12} className="cont_box">
                    <ol>
                        <li>The first page should contain the Title of the Paper, Name of author/authors, affiliation details and complete address with Mobile No. and e-mail ID</li>
                        <li>There should be an abstract of not more than 250 words and five Key-words given before the introduction.</li>
                        <li>The matter should be typed in English, Malayalam or Hindi using the font, Times New Roman / ML-TT Karthika / ML-TT Revathi / DV-TT- Yogesh</li>
                        <li>The font size should be 12, justified with 1.5 line spacing, and saved more preferably as Adobe PageMaker file <b>.pmd</b> or, MS.Word file <b>.docx/.doc.</b></li>
                        <li>The respective authors/co-authors should be very careful that no grammatical or spelling errors occur in the papers concerned</li>
                        <li>Bibliography / Reference must be prepared strictly as per <b>M.L.A style format</b> 8th edition.</li>
                        <li><b>.pdf</b> files are <b>not</b> accepted</li>
                        <li>All the Papers will be blindly reviewed by our team and the accepted papers will be intimated in due course.</li>
                        <li>The Research Papers in the prescribed format will only be accepted which will be checked against plagiarism using suitable software concerned</li>
                        
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