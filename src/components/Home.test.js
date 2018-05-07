import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Viewer from './Viewer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Viewer/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
