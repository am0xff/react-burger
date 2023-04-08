import { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerLayout from '../BurgerLayout/BurgerLayout';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients ';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(data => data.json())
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
      <BurgerLayout products={products} />
    </>
  );
}

export default App;
