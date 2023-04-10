import { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerLayout from '../BurgerLayout/BurgerLayout';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [products, setProducts] = useState(null);

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
    <>
      <AppHeader />
      {products && <BurgerLayout products={products} />}
    </>
  );
}

export default App;
