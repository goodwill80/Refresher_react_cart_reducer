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
import { getTotal } from './ultil';

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
const itemsArr = itemsArray.map((item) => item[1]);

// **********************************************

const initialState = {
  loading: false,
  cart: new Map(cartItems.map((item) => [item.id, item])),
};

const url = 'https://www.course-api.com/react-useReducer-cart-project';

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalCost } = getTotal(state.cart);

  // a. CLEAR CART
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // b. REMOVE ITEM
  const remove = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };

  // c. INCREASE ITEM
  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  // d. DECREASE ITEM
  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => useContext(AppContext);

export default AppContextProvider;
