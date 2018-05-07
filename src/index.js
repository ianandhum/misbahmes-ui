import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter , Route  , Switch} from 'react-router-dom';
import './index.css';
import Home from  './Home';
import Viewer from "./Viewer";
import About from "./About"
import CallForPaper from "./CallForPaper"
import Login from "./Login"
import NotFound from "./NotFound"
class App extends React.Component{
   render(){
       return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/:postId/reader" exact component={Viewer} />
                    <Route path="/about"  component={About}/>
                    <Route path="/callforPaper" exact component={CallForPaper}/>
                    <Route path="/admin/login" exact component={Login}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </BrowserRouter>
        );
   }     
}
ReactDOM.render(<App/>,document.getElementById('root'));
