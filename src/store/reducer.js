import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    cheese: 0,
    bacon: 0
  },
  totalPrice: 4
};

const INGRIDIENT_PRICES = {
  salad: 0.3,
  meat: 1.5,
  cheese: 0.6,
  bacon: 0.5
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      const isIngredientAvailableToRemove =
        state.ingredients[action.ingredientName] > 0;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: isIngredientAvailableToRemove
            ? state.ingredients[action.ingredientName] - 1
            : 0
        },
        totalPrice: isIngredientAvailableToRemove
          ? state.totalPrice - INGRIDIENT_PRICES[action.ingredientName]
          : state.totalPrice
      };
    default:
      return state;
  }
};

export default reducer;
