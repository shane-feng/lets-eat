import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import FoodList from '../FoodList/FoodList';
import { getFoodsToEat } from '../../api/apiService';
import { getSessionData } from '../../utils';

import { Container, Typography } from '@mui/material';

const containerStyle = {
  textAlign: 'center',
};

const messageStyle = {
  marginTop: '150px',
};

function Eat() {
  const [foods, setFoods] = useState();
  const { session } = getSessionData();

  const fetchFoodsToEat = async () => {
    try {
      const { data } = await getFoodsToEat();
      setFoods(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodsToEat();
  }, []);

  if (session) {
    return <Redirect to="/login" />;
  }

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" component="div">
        Lets Eat . . .
      </Typography>
      {foods?.length > 0 ? (
        <FoodList isEatFoodList={true} fetchFoodsToEat={fetchFoodsToEat} foods={foods} />
      ) : (
        <Typography sx={messageStyle} variant="h3" component="div">
          Head To The Menu And Get Some Food To Eat!
        </Typography>
      )}
    </Container>
  );
}

export default Eat;
