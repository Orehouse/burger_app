import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { updateObject } from "../../shared/utility";
import { checkValidity } from "../../shared/validation";

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

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
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

  componentDidMount() {
    if (!this.props.isBuildingBurger) {
      this.props.onSetAuthRedirectPath("/");
    }
  }

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
      <Redirect to={this.props.authRedirectPath} />
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
  isAuthenticated: state.auth.token != null,
  isBuildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, method) =>
      dispatch(actions.auth(email, password, method)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
