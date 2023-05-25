type Props = {
  title: string,
  value: number
}

const IngredientDetailsInfoCard = ({ title, value }: Props) => {
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

export default IngredientDetailsInfoCard;