import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import FoodList from '../FoodList/FoodList';
import { getFoodsToEat } from '../../api/apiService';
import { AuthContext } from '../../contexts/AuthContext';

import { Container, Typography, CircularProgress } from '@mui/material';

const containerStyle = {
  textAlign: 'center',
};

const messageStyle = {
  marginTop: '150px',
};

const circularProgressStyle = {
  justifySelf: 'center',
  marginTop: '100px',
};

function Eat() {
  const [foods, setFoods] = useState();
  const [loading, setLoading] = useState(false);
  const [auth] = useContext(AuthContext);

  const fetchFoodsToEat = async () => {
    try {
      setLoading(true);
      const { data } = await getFoodsToEat();
      setFoods(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchFoodsToEat();
    }
  }, [auth]);

  if (!auth) {
    return <Redirect to="/login" />;
  }

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" component="div">
        Lets Eat . . .
      </Typography>
      {loading ? (
        <CircularProgress size={80} sx={circularProgressStyle} />
      ) : foods?.length > 0 ? (
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
