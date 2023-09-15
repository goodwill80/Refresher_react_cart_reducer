import { createContext, useContext, useReducer, useEffect } from 'react';
import { reducer } from './reducer';
import cartItems from './data.js';
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from './Actions';

const AppContext = createContext();

// console.log(cartItems.map((item) => [item.id, item]));

const initialState = {
  loading: false,
  cart: new Map(cartItems.map((item) => [item.id, item])),
};

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cart = 1;
  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
}

export const useGlobalContext = () => useContext(AppContext);

export default AppContextProvider;
