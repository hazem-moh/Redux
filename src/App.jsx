import { useState } from 'react';

// Action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Reducer
const cartReducer = (state = 0, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return state + 1;
    case REMOVE_FROM_CART:
      return state - 1;
    default:
      return state;
  }
};

// Create store
const createStore = (reducer, initialState) => {
  let state = initialState;
  const listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners.filter(l => l !== listener);
    };
  };

  return { getState, dispatch, subscribe };
};

const store = createStore(cartReducer, 0);

// Components
function Item({ onAddToCart, onRemoveFromCart }) {
  const handleAddToCart = () => {
    onAddToCart();
  };

  const handleRemoveFromCart = () => {
    onRemoveFromCart();
  };

  return (
    <div className='card p-32 bg-gray-200 relative rounded w-fit'>
      <p className='uppercase text-2xl font-bold'>product</p>
      <button className='p-2 bg-green-500 text-white absolute bottom-4 right-4 rounded-md cursor-pointer' onClick={handleAddToCart}>
        Add product
      </button>
      <button className='p-2 bg-red-500 text-white absolute bottom-4 left-4 rounded-md cursor-pointer' onClick={handleRemoveFromCart}>
        Remove product
      </button>
    </div>
  );
}

function App() {
  const [cartCount, setCartCount] = useState(store.getState());

  store.subscribe(() => {
    setCartCount(store.getState());
  });

  const handleAddToCart = () => {
    store.dispatch({ type: ADD_TO_CART });
  };
  const handleRemoveFromCart = () => {
    store.dispatch({ type: REMOVE_FROM_CART });
  };
  return (
    <div className="App mt-24">
      <div className="bg-gray-200 p-10 rounded-lg mb-7 text-center">
        <p className='text-xl'>You have <span className='bg-green-500 text-white p-3 rounded-md '>
          {cartCount}</span> items in your cart</p>
      </div>
      <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-5">
        <Item onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
        <Item onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
        <Item onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      </div>
    </div>
  );
}

export default App;
