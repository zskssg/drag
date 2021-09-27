/* 路由配置文件 */
import React from 'react'
import { Route,Switch,withRouter,BrowserRouter } from 'react-router-dom'

import App from '../App'
import PageMain from '../components/pageMain'

class Router extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={withRouter(App)} />
          <Route exact path="/task" component={withRouter(PageMain)} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router