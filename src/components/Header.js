import React ,{Component} from 'react'
import {findDOMNode} from 'react-dom'
import $ from 'jquery'
import Link from 'react-router-dom/Link'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'


class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            scrollTop:false,
            mobile:false

        }
        this.onScroll.bind(this)
        this.dyn=(this.props.dyn) && true;
    }
    
    onScroll(e){
        let pageY=$(window).scrollTop()
        if(this.state.scrollTop===false && pageY>=20 ){
            this.setState({scrollTop:true})
        }
        else if(this.state.scrollTop===true && pageY<20 ){
            this.setState({scrollTop:false})
        }
        
    }
    
    onNav(){
        let navbar=findDOMNode(this.refs.mob_navbar);
        if($(navbar).attr('data-status')==="false"){
            $(navbar).css({width:"1px"}).show().animate({width:"100%"},300).attr('data-status',"true");
        }
        else{
            $(navbar).fadeOut(function(){
                $(this).css({width:"1px"});
            }).attr('data-status',"false")
        }

    }
    linkClick(){
        let navbar=findDOMNode(this.refs.mob_navbar);
        if($(navbar).attr('data-status')==="true"){
            $(navbar).fadeOut()
            $('body').css({overflowY:"scroll"})
        }
    }
    componentWillMount(){
        var prevState=this.state
        prevState.mobile=($(window).width()<768)
        if(prevState.mobile){
            this.dyn=true
        }
        this.setState(prevState)
    }
    componentDidMount(){
        
        this.dyn && $(window).scroll(this.onScroll.bind(this))

    }
    componentWillUnmount(){
        this.dyn && $(window).off('scroll')
    }
    render(){
        let navBar=(
                            <nav className="navbar">
                                <Link to="/" className="item xs-col-12" onClick={this.linkClick.bind(this)}>Home</Link>
                                <Link to="/about/advisory_board" className="item xs-col-12" onClick={this.linkClick.bind(this)}>Advisory board</Link>
                                <Link to="/about/editorial_board" className="item xs-col-12" onClick={this.linkClick.bind(this)}>Editorial board</Link>
                                <Link to="/callforPaper" className="item highlight  xs-col-12" onClick={this.linkClick.bind(this)}>Call for papers</Link>    
                            </nav>
        )
        let equivBtn=(
            <span className="pull-right equiv_btn" onClick={this.onNav.bind(this)}>
                &equiv;
            </span>
        )
        return(
            <React.Fragment>

                    <Row className={"main-head " + (this.state.scrollTop && " scrolling") +" "+(this.props.className)}  style={{margin:"0px",position:(this.dyn)?"fixed":"absolute"}} ref="rowHead">
                        <Col xs={12} md={12}>
                            <Col xs={8} md={4}>
                                <a href="/" className="brand_link">
                                <h2 className="brand"><span >MISBAH</span>
                                <span className="tag_line">niche of knowledge</span>
                                </h2>
                                </a>
                            </Col>
                            <Col xs={4} md={8}>
                                {this.state.mobile || navBar }
                                {this.state.mobile && equivBtn}
                            </Col>
                        </Col>
                    </Row>
                    {
                        this.state.mobile && (
                            <Row className="mob_navbar" ref="mob_navbar" data-status="false">
                                <Col xs={12} md={12}>
                                    {navBar}
                                </Col>
                            </Row>
                        )
                    }
                    
            </React.Fragment>
        )

    }
}
export default Header