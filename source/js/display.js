import React from 'react';
import {Route} from 'react-router-dom'; 

// Components
import StartPage from './sidebar';

class Display extends React.Component {
  render() {
    return(
      <div>
        <Route path='/' component={StartPage} />
      </div>
    )
  }
}

export default Display; 