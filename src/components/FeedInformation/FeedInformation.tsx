import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './FeedInformation.module.css';

const images = [
  {"_id":"643d69a5c3f7b9001cfa093c","name":"Краторная булка N-200i","type":"bun","proteins":80,"fat":24,"carbohydrates":53,"calories":420,"price":1255,"image":"https://code.s3.yandex.net/react/code/bun-02.png","image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png","__v":0},
  {"_id":"643d69a5c3f7b9001cfa0941","name":"Биокотлета из марсианской Магнолии","type":"main","proteins":420,"fat":142,"carbohydrates":242,"calories":4242,"price":424,"image":"https://code.s3.yandex.net/react/code/meat-01.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png","__v":0},
  {"_id":"643d69a5c3f7b9001cfa093e","name":"Филе Люминесцентного тетраодонтимформа","type":"main","proteins":44,"fat":26,"carbohydrates":85,"calories":643,"price":988,"image":"https://code.s3.yandex.net/react/code/meat-03.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png","__v":0},
  {"_id":"643d69a5c3f7b9001cfa0942","name":"Соус Spicy-X","type":"sauce","proteins":30,"fat":20,"carbohydrates":40,"calories":30,"price":90,"image":"https://code.s3.yandex.net/react/code/sauce-02.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png","__v":0}
]

const FeedInformation = () => {
  return (
    <div className={classes.feed}>
      <p className={`${classes.feedNumber} text text_type_digits-default`}>
        #034533
      </p>
      <p className='text text_type_main-medium'>
        Black Hole Singularity острый бургер
      </p>
      <p className={`${classes.feedStatus} text text_type_main-default`}>
        Выполнен
      </p>
      <div className={classes.feedComposition}>
        <p className='text text_type_main-medium'>
          Состав:
        </p>
        <ul className={classes.feedCompositionList}>
          {images.map((item) => (
            <li key={item._id} className={classes.feedCompositionItem}>
              <div className={classes.feedCompositionImage}>
                <img src={item.image_mobile} alt="" />
              </div>
              <p className={`${classes.feedCompositionName} text text_type_main-default`}>
                Флюоресцентная булка R2-D3
              </p>
              <div className={classes.feedCompositionPrice}>
                <span className='text text_type_digits-default'>1 X 20</span>
                <CurrencyIcon type='primary' />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.feedFooter}>
        <p className='text text_type_main-default text_color_inactive'>
          Вчера, 13:50
        </p>
        <div className={classes.feedPrice}>
          <p className='text text_type_digits-default'>
            510
          </p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}

export default FeedInformation;