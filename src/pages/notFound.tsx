import { useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      height: 'calc(100vh - 88px)',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <p className="text text_type_digits-large">404</p>
      <Button 
        htmlType="button" 
        type="primary" 
        extraClass="mt-2" 
        onClick={() => navigate('/')}>
        Главная
      </Button>
    </div>
  )
}

export default NotFound;