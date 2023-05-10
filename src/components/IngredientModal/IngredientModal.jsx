import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import classes from './IngredientModal.module.css';

const IngredientModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, success } = useSelector((state) => state.ingredients);
  const [item, setItem] = useState(null);

  const handleClose = () => {
    navigate('/');
  }

  useEffect(() => {
    if (success) {
      const item = items.find(({ _id }) => _id === id);

      setItem(item);
    }
  }, [id, items, success]);

  return item && (
    <Modal heading='Детали ингредиента' onClose={handleClose}>
      <div className={classes.modalBody}>
        <IngredientDetails
          image={item.image_large}
          name={item.name}
          proteins={item.proteins}
          fat={item.fat}
          carbohydrates={item.carbohydrates}
          calories={item.calories}
        />
      </div>
    </Modal>
  )
}

export default IngredientModal;