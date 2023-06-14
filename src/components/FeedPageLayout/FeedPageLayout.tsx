import FeedItem from '../FeedItem/FeedItem';
import classes from './FeedPageLayout.module.css';

const doneItems = ['034533', '034532', '034530', '034527', '034525'];
const inProgressItems = ['034541', '034542', '034543'];

const FeedPageLayout = () => {
  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <h1 className="text text_type_main-large">
          Лента заказов
        </h1>
        <div className={classes.feedContainer}>
          <div className={classes.feedList}>
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
          </div>
          <div className={classes.feedInfo}>
            <div className={classes.feedInfoRow}>
              <div className={classes.feedInfoCell}>
                <p className='text text_type_main-medium'>Готовы:</p>
                <ul className={classes.feedInfoItems}>
                  {doneItems.map((item) => {
                    return <li key={item} style={{ color: '#00CCCC' }} className='text text_type_digits-default'>{item}</li>
                  })}
                </ul>
              </div>
              <div className={classes.feedInfoCell}>
                <p className='text text_type_main-medium'>В работе:</p>
                <ul className={classes.feedInfoItems}>
                  {inProgressItems.map((item) => {
                    return <li key={item} className='text text_type_digits-default'>{item}</li>
                  })}
                </ul>
              </div>
            </div>
            <div className={classes.feedInfoRow}>
              <div className={classes.feedInfoCell}>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <p className='text text_type_digits-large'>
                  28 752
                </p>
              </div>
            </div>
            <div className={classes.feedInfoRow}>
              <div className={classes.feedInfoCell}>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <p className='text text_type_digits-large'>
                  138
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default FeedPageLayout;