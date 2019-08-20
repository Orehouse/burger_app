import React, { Component } from "react";

import axios from "../../axios-orders";

import Order from "./Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: false
  };
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/orders.json")
      .then(response => {
        const fetchedOrders = response.data;
        const orders = [];
        for (let orderId in fetchedOrders) {
          orders.push({
            ...fetchedOrders[orderId],
            id: orderId
          });
        }
        this.setState({ orders: orders });
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    const orders =
      this.state.orders.length > 0 ? (
        this.state.orders.map(order => (
          <Order orderData={order} key={order.id} />
        ))
      ) : (
        <p>No orders found :(</p>
      );
    return <div>{this.state.loading ? <Spinner /> : orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
