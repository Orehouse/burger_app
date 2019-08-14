import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zip: ""
    },
    totalPrice: 0,
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Artem",
        address: {
          street: "My Street",
          zip: "12345",
          country: "RU"
        },
        email: "orehouse@test.ru"
      }
    };
    axios
      .post("orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          type="text"
          placeholder={"Name"}
          name={"name"}
          className={classes.Input}
        />
        <input
          type="email"
          placeholder={"Email"}
          name={"email"}
          className={classes.Input}
        />
        <input
          type="text"
          placeholder={"Street"}
          name={"street"}
          className={classes.Input}
        />
        <input
          type="text"
          placeholder={"Zip"}
          name={"zip"}
          className={classes.Input}
        />
        <Button btnType={"Success"} clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
