import { useState, useEffect } from 'react';
import FoodList from '../FoodList/FoodList';
import { getFoodsToEat } from '../../api/apiService';

import { Container, Typography } from '@mui/material';

const containerStyle = {
  textAlign: 'center',
};

function Eat() {
  const [foods, setFoods] = useState();

  const fetchFoods = async () => {
    try {
      const { data } = await getFoodsToEat();
      setFoods(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" component="div">
        Lets Eat . . .
      </Typography>
      <FoodList foods={foods} />
    </Container>
  );
}

export default Eat;
