import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";

import Order from "./Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  render() {
    const orders =
      this.props.orders.length > 0 ? (
        this.props.orders.map(order => (
          <Order orderData={order} key={order.id} />
        ))
      ) : (
        <p>No orders found :(</p>
      );
    return <div>{this.props.loading ? <Spinner /> : orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

export default connect(mapStateToProps)(withErrorHandler(Orders, axios));
