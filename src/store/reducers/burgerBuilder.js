import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.3,
  meat: 1.5,
  cheese: 0.6,
  bacon: 0.5
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return updateObject(state, {
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      });
    case actionTypes.REMOVE_INGREDIENT:
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
          : state.totalPrice
      });
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        error: false
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
