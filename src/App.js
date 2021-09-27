import {Button} from 'antd'
import 'antd/dist/antd.css'
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Button type="primary" onClick={(e)=>{this.skip(e)}}>Start App</Button>
        </header>
      </div>
    )
  }
  skip(e){
    console.log(this);
    this.props.history.push({pathname:'/task'})
  }
  
}

export default App;
