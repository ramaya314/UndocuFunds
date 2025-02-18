import React, { Component } from 'react'
//import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'

import userActions from '../actions/user-actions'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import FundApplyConfirmation from './FundApplyConfirmation'

import ProfilePage from '../pages/ProfilePage'
import FundsPage from '../pages/FundsPage'

import Dashboard from './protected/Dashboard'
import MainFooter from './MainFooter'
import MainNavBar from './MainNavBar'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MainTheme from '../themes/MainTheme'


import { Grid, Col, Row, Nav, NavItem} from 'react-bootstrap';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

function AmbigousRoute ({component: Component, authed, ...rest}) {
  return (
    <Route {...rest}
      render={(props) => <Component {...props} authed={authed}/> }
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        userActions.setUser(user.uid);
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>

          <MuiThemeProvider muiTheme={getMuiTheme(MainTheme)}>
            <div>
                <MainNavBar authed={this.state.authed}/>

                  <Grid className="mainPageContentGrid">
                    <Row>
                      <Col xs={12}>

                        <Switch>
                          <AmbigousRoute path='/' authed={this.state.authed} exact component={FundsPage} />
                          <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                          <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                          <PrivateRoute authed={this.state.authed} path='/profile' component={ProfilePage} />
                          <AmbigousRoute path='/funds' authed={this.state.authed} component={FundsPage} />

                          <PrivateRoute authed={this.state.authed} path='/applyconfirmation' component={FundApplyConfirmation} />
                          <Route render={() => <h3>No Match</h3>} />
                        </Switch>

                      </Col>
                    </Row>
                  </Grid>

                <MainFooter />
            </div>
          </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}
