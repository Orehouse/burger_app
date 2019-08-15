import React from "react";

import classes from "./Input.module.css";

const input = props => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          {...props.elementConfig}
          className={classes.InputElement}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          {...props.elementConfig}
          className={classes.InputElement}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.changed}
          className={classes.InputElement}
          value={props.value}
        >
          {props.elementConfig.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          {...props.elementConfig}
          className={classes.InputElement}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label htmlFor="" className={classes.Label}>
        {props.label}
      </label>
      {inputElement}
    </div>
  );
};

export default input;
