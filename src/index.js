//compact libs and polyfills

import "raf/polyfill";
import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter , Route  , Switch} from 'react-router-dom';
import './index.css';
import Home from  './components/Home';
import Viewer from "./components/Viewer";
import About from "./components/About"
import CallForPaper from "./components/CallForPaper"
import Login from "./components/Login"
import NotFound from "./components/NotFound"

import registerSW from './registerServiceWorker'

class App extends React.Component{
   render(){
       return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/:postId/reader" exact component={Viewer} />
                    <Route path="/about/:page"  component={About}/>
                    <Route path="/callforPaper" exact component={CallForPaper}/>
                    <Route path="/admin/login" exact component={Login}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </BrowserRouter>
        )
   }     
}

registerSW();

ReactDOM.render(<App/>,document.getElementById('root'));
