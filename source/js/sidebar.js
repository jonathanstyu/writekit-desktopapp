import React from 'react';
import {Link} from 'react-router-dom'; 

const styles = {
  'flexBasis': '200px',
  'overflowY': 'scroll'
}

class SideBar extends React.Component {
  render() {
    return(
      <ul style={styles}>
        <li>Stuff</li>
        <li>Stuff</li>
        <li>Stuff2</li>
        <li>Stuff3</li>
      </ul>
    )
  }
}

export default SideBar; 