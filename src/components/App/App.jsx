import { useEffect, useState, useReducer } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerLayout from '../BurgerLayout/BurgerLayout';
import { ConstructorContext } from '../../services/constructorContext';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

const constructorInitialState = { bun: undefined, products: [] };

function reducer(state = constructorInitialState, action) {
  switch(action.type) {
    case 'add':
      const isBun = action.payload.type === 'bun';

      return {
        bun: isBun ? action.payload : state.bun,
        products: !isBun ? [...state.products, {...action.payload}] : state.products
      }
    case 'delete':
      return {
        ...state,
        products: state.products.filter(({ _id }) => _id !== action.payload)
      }
    default:
      return state;
  }
}

function App() {
  const [products, setProducts] = useState(null);
  const [constructorState, constructorDispatcher] = useReducer(reducer, constructorInitialState);

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: Status code ${response.status}`)
        }
        
        return response.json();
      })
      .then(({ data }) => {
        setProducts(data)
      })
      .catch(err => {
        console.error(err);
      })
  }, []);

  return (
    <ConstructorContext.Provider value={{ constructorState, constructorDispatcher }}>
      <AppHeader />
      {products && <BurgerLayout products={products} />}
    </ConstructorContext.Provider>
  );
}

export default App;
