import PropTypes from 'prop-types';

const IngredientDetailsInfoCard = ({ title, value }) => {
  return (
    <>
      <p className="text text_type_main-default text_color_inactive">
        {title}
      </p>
      <p className="text text_type_digits-default text_color_inactive">
        {value}
      </p>
    </>
  )
}

IngredientDetailsInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default IngredientDetailsInfoCard;