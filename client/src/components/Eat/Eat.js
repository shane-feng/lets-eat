import { useState, useEffect, useMemo } from 'react';
import { getFoodsToEat } from '../../api/apiService';
import FoodItem from '../FoodItem/FoodItem';

import { Container, Grid, Typography } from '@mui/material';

const containerStyle = { textAlign: 'center', paddingBottom: '50px' };

const gridContainerStyle = { justifyContent: 'center', marginTop: '50px' };

const gridItemStyle = { justifyContent: 'center' };

function Eat() {
  const [foods, setFoods] = useState();

  const fetchFoods = async () => {
    try {
      const { data } = await getFoodsToEat();
      setFoods(data);
    } catch (e) {
      console.log(e);
    }
  };

  const formatDataUri = (buffer) => {
    const encoded = Buffer.from(buffer).toString('base64');
    const uri = window.atob(encoded);
    return uri;
  };

  const renderFoods = useMemo(() => {
    return foods?.map((food) => {
      const imgUri = formatDataUri(food.picture.data);

      return (
        <Grid item key={food._id} xs={10} md={6} sx={gridItemStyle}>
          <FoodItem food={food} img={imgUri} />
        </Grid>
      );
    });
  }, [foods]);

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <Container maxWidth="md" sx={containerStyle}>
      <Typography variant="h5" component="div">
        Lets Eat These Today . . .
      </Typography>
      <Grid container spacing={2} sx={gridContainerStyle}>
        {renderFoods}
      </Grid>
    </Container>
  );
}

export default Eat;
