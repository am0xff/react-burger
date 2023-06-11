import { useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks';
import BurgerIngredientsSection from './BurgerIngredientsSection';
import classes from './BurgerIngredients.module.css';

const BurgerIngredients = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [tab, setTab] = useState<number>(0);
  const { items: ingredients } = useSelector((state) => state.ingredients);
  const { items: constructorItems } = useSelector((state) => state.burgerConstructor);

  const countByIdIngredients = useMemo(() => {
    return constructorItems.reduce((acc, {_id}) => {
      return acc[_id] ? {...acc, [_id]: acc[_id] + 1} : {...acc, [_id]: 1}
    }, {} as Record<string, number>);
  }, [constructorItems]);

  const bunListWithCount = useMemo(() => {
    return ingredients
      .filter(({ type }) => type === 'bun')
      .map((item) => ({
        ...item,
        count: countByIdIngredients[item._id] || 0
      }));
  }, [countByIdIngredients, ingredients]);

  const mainListWithCount = useMemo(() => {
    return ingredients
      .filter(({ type }) => type === 'main')
      .map((item) => ({
        ...item,
        count: countByIdIngredients[item._id] || 0
      }));
  }, [countByIdIngredients, ingredients]);

  const sauceListWithCount = useMemo(() => {
    return ingredients
      .filter(({ type }) => type === 'sauce')
      .map((item) => ({
        ...item,
        count: countByIdIngredients[item._id] || 0
      }));
  }, [countByIdIngredients, ingredients]);

  const handleTab = (id: number) => {
    const section = ref?.querySelector(`[data-section-id="${id}"]`);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      });
    }

    setTab(id);
  };

  return (
    <section className={`${classes.section} pb-10`}>
      <h2 className='text text_type_main-large pt-10 pb-5'>
          Соберите бургер
      </h2>
      <div className={`${classes.ingredientsTabs}`}>
        <Tab active={tab === 0} onClick={() => handleTab(0)} value='0'>
          Булки
        </Tab>
        <Tab active={tab === 1} onClick={() => handleTab(1)} value='1'>
          Соусы
        </Tab>
        <Tab active={tab === 2} onClick={() => handleTab(2)} value='2'>
          Начинки
        </Tab>
      </div>
      <div ref={setRef} className={classes.ingredientsBody}>
        <BurgerIngredientsSection
          id={0}
          title={'Булки'}
          items={bunListWithCount}
          setTab={setTab}
        />
        <BurgerIngredientsSection
          id={1}
          title={'Соусы'}
          items={mainListWithCount}
          setTab={setTab}
        />
        <BurgerIngredientsSection
          id={2}
          title={'Начинки'}
          items={sauceListWithCount}
          setTab={setTab}
        />
      </div>
    </section>
  )
}

export default BurgerIngredients;