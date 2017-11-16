import React from 'react'; 
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'; 

// Components
import SideBar from './js/sidebar'; 
import Display from './js/display'; 

const appstyle = {
  'display': 'flex',
  'flexDirection': 'row',
  'height': 'inherit'
}

export default class WriteKitApp extends React.Component {
  render() {
    return (
      <div style={appstyle}>
        <SideBar />
        <Display />
      </div>
    )
  }
}

render( (
  <Router><WriteKitApp /></Router>
), document.getElementById('window')); 