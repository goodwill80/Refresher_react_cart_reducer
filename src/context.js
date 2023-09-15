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

// **********************************************
// Map Data Structure Notes
// a. initialise
const basket = new Map();
// b. ADD
basket.set('apple', { name: 'apples', price: 0.05 });
basket.set('pear', { name: 'pears', price: 0.05 });
// c. GET
const myApples = basket.get('apple');
const myPears = basket.get('orange');
// d. CHECK - boolean
const checkForApples = basket.has('apple');
// e. SIZE
const sizwOfBasket = basket.size;
// f. DELETE
basket.delete('apple');
// g. LOOPING
for (let [key, { name, price }] of basket) {
  // console.log(key, name, price);
}
// h. CONVERTING FROM ARRAY TO MAP
const items = [
  { id: 1, name: 'first', price: 10 },
  { id: 2, name: 'second', price: 12 },
];
const itemsMap = new Map(items.map((item) => [item.id, item]));
// console.log(itemsMap);
// i. CONVERTING FROM MAP TO ARRAY
const itemsArray = Array.from(itemsMap.entries());
console.log(itemsArray.map((item) => item[1]));

// **********************************************

const initialState = {
  loading: false,
  cart: new Map(cartItems.map((item) => [item.id, item])),
};

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
}

export const useGlobalContext = () => useContext(AppContext);

export default AppContextProvider;
