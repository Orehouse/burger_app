import React from "react";

import classes from "./Order.module.css";
import Burger from "../../../components/Burger/Burger";

const order = props => {
  const ingredients = Object.keys(props.orderData.ingredients).map(
    ingredient => (
      <span
        className={classes.Ingredient}
        key={props.orderData.id + "_" + ingredient}
      >
        {ingredient} ({props.orderData.ingredients[ingredient]})
      </span>
    )
  );

  return (
    <div className={classes.Order}>
      <div className={classes.OrderSide}>
        <p>Ingredients:</p>
        {ingredients}
        <p>
          Price: <strong>${props.orderData.price.toFixed(2)}</strong>
        </p>
      </div>
      <div className={classes.BurgerSide}>
        <Burger ingredients={props.orderData.ingredients} />
      </div>
    </div>
  );
};

export default order;
