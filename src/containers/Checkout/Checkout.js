import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  render() {
    let summary = <Redirect to={"/"} />;
    if (this.props.ingredients) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutContinued={this.checkoutContinueHandler}
            checkoutCancelled={this.checkoutCancelHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout);
