import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from './Actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, cart: new Map() };

    case REMOVE:
      const newCartAfterRemove = new Map(state.cart);
      newCartAfterRemove.delete(action.payload.id);
      return { ...state, cart: newCartAfterRemove };

    case INCREASE:
      const newCartAfterIncrease = new Map(state.cart);
      const itemId = action.payload.id;
      const target = newCartAfterIncrease.get(itemId); // Get the target object
      const newTarget = { ...target, amount: target.amount + 1 }; // increament the object amount
      newCartAfterIncrease.set(itemId, newTarget); // Set the amended object into map
      return { ...state, cart: newCartAfterIncrease };

    case DECREASE:
      const newCartAfterDecrease = new Map(state.cart);
      const id = action.payload.id;
      const targetToDecrease = newCartAfterDecrease.get(id);
      // If item qty is 1, then we just remove the item entirely when decreasing
      if (targetToDecrease.amount === 1) {
        newCartAfterDecrease.delete(id);
      } else {
        const newTargetToDecrease = {
          ...targetToDecrease,
          amount: targetToDecrease.amount - 1,
        };
        newCartAfterDecrease.set(id, newTargetToDecrease);
      }
      return { ...state, cart: newCartAfterDecrease };

    default:
      throw new Error(`no matching action type ${action.type}`);
  }
};
