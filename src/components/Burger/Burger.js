import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => (
        <BurgerIngredient type={igKey} key={igKey + i} />
      ));
    })
    .flat();

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients.length === 0 ? (
        <p>Please start adding ingredients</p>
      ) : (
        transformedIngredients
      )}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
