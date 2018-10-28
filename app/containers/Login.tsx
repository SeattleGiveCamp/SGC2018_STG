import * as React from "react";
import { observer, inject } from 'mobx-react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { RouterStore } from 'mobx-router';

import "../style.css";
import routes from '../routes';
import * as login_img from '../images/login.jpg';

interface Props {
  store?: RouterStore;
}

interface State {
  email: string;
  password: string;
}

// To use the mobx stores, you have to inject them into the component. It injects it as a prop to
// the component.
@inject('store')
@observer
export default class Login extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    let newState = {};
    newState[event.target.id] = event.target.value;

    this.setState(newState);
  }

  handleSubmit = event => {
    event.preventDefault();
    // This is how you redirect to a new URL using the mobx-router router store.
    this.props.store.router.goTo(routes.home);
  }

  render() {
    return (
      <div className="Login">
        <div className="splash">
          <img className="login_img" src={login_img} />
        <div className="title">
            <h1>Ancient Emeralds</h1>
        <h6 className="sub-title">
          Culture from the Past
        </h6> 
        </div>
        </div>
        <div className="container">
          <form className="login_form" onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel className="label">USERNAME</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>PASSWORD</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              SIGN IN
            </Button>
          </form>
          <div className="footer">
          <span className="left">
            FORGOT PASSWORD
          </span>
          <span className="right">
            SIGN UP
          </span>
          </div>
        </div>
      </div>
    );
  }
}