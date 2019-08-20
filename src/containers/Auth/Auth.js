import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import { SIGN_UP_METHOD, SIGN_IN_METHOD } from "../../config/config";
import * as actions from "../../store/actions/index";

import classes from "./Auth.module.css";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: { type: "email", placeholder: "e-mail address" },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: { type: "password", placeholder: "Password" },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: false
  };

  checkValidity = (value, rules) => {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== "";
    }

    if (rules.minLength) {
      isValid &= value.trim().length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid &= value.trim().length <= rules.maxLength;
    }

    if (rules.isEmail) {
      isValid &= new RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ).test(value);
    }

    return !!isValid;
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitSignUpHandler = event => {
    event.preventDefault();
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    const method = this.state.isSignUp ? SIGN_UP_METHOD : SIGN_IN_METHOD;
    this.props.onAuth(email, password, method);
  };

  switchAuthModeHandler = () => {
    this.setState({ isSignUp: !this.state.isSignUp });
  };

  render() {
    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    const form = formElements.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        validated={formElement.config.valid}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    const button = this.props.loading ? (
      <Spinner />
    ) : (
      <Button btnType={"Success"}>
        {this.state.isSignUp ? "Sign Up" : "Sign In"}
      </Button>
    );

    const error = this.props.error ? <p>{this.props.error.message}</p> : null;
    const authRedirect = this.props.isAuthenticated ? (
      <Redirect to={"/"} />
    ) : null;
    return (
      <div className={classes.Auth}>
        {authRedirect}
        <form onSubmit={this.submitSignUpHandler}>
          {form}
          {button}
        </form>
        {error}
        <Button btnType={"Danger"} clicked={this.switchAuthModeHandler}>
          {this.state.isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token != null
});

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, method) =>
      dispatch(actions.auth(email, password, method))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
