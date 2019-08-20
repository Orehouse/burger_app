import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.3,
  meat: 1.5,
  cheese: 0.6,
  bacon: 0.5
};

function addIngredient(state, action) {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  });
}

function removeIngredient(state, action) {
  const isIngredientAvailableToRemove =
    state.ingredients[action.ingredientName] > 0;
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: isIngredientAvailableToRemove
        ? state.ingredients[action.ingredientName] - 1
        : 0
    },
    totalPrice: isIngredientAvailableToRemove
      ? state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      : state.totalPrice,
    building: true
  });
}

function setIngredients(state, action) {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building: false
  });
}

function fetchIngredientsFail(state) {
  return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return fetchIngredientsFail(state);
    default:
      return state;
  }
};

export default reducer;
