import React from "react";
import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Beacon", type: "bacon" },
  { label: "Cheese", type: "cheese" }
];
const buildControls = props => (
  <div className={classes.BuildControls}>
    {controls.map(ctrl => (
      <BuildControl
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        key={ctrl.type}
        label={ctrl.label}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <p>
      Price: <strong>${props.price.toFixed(2)}</strong>
    </p>
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      Order Now!
    </button>
  </div>
);

export default buildControls;
