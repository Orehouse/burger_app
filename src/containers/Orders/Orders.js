import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";

import Order from "./Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.authToken);
  }

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
      loading: state.order.loading,
      authToken: state.auth.token
    };
  },
  mapDispatchToProps = dispatch => {
    return {
      onFetchOrders: token => dispatch(actions.fetchOrders(token))
    };
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
