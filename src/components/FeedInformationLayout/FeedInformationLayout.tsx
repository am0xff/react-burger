import classes from './FeedInformationLayout.module.css';
import FeedInformation from '../FeedInformation/FeedInformation';

const FeedInformationLayout = () => {
  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <FeedInformation />
      </div>
    </main>
  )
}

export default FeedInformationLayout;