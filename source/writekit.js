import React from 'react'; 
import ReactDOM from 'react-dom'; 

export default class WriteKitApp extends React.Component {
  render() {
    return (
      <div>
        <p>Text goes here</p>
      </div>
    )
  }
}

ReactDOM.render(<WriteKitApp />, document.getElementById('window')); 