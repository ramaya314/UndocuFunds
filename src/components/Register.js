import React, { Component } from 'react'
import { auth } from '../helpers/auth'
import Spacer from './Spacer'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    const user = {
      firstName: this.firstName.value,
      lastName: this.lastName.value
    };
    auth(this.email.value, this.pw.value, user)
      .catch(e => this.setState(setErrorMsg(e)))
  }
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input className="form-control" ref={(firstName) => this.firstName = firstName} placeholder="firstName"/>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input className="form-control" ref={(lastName) => this.lastName = lastName} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <button type="submit" className="btn btn-primary">Register</button>

          <Spacer space={30} />
        </form>
      </div>
    )
  }
}
