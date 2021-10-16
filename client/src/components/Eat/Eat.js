import { useState, useEffect, useMemo } from 'react';
import { getFoodsToEat } from '../../api/apiService';
import FoodList from '../FoodList/FoodList';
import FoodItem from '../FoodItem/FoodItem';

import { Grid } from '@mui/material';

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

  const decodeDataUri = (buffer) => {
    const encoded = Buffer.from(buffer).toString('base64');
    const uri = window.atob(encoded);
    return uri;
  };

  const renderFoods = useMemo(() => {
    return foods?.map((food) => {
      const imgUri = decodeDataUri(food.picture.data);

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

  return <FoodList foods={renderFoods} title={'Lets Eat These Today . . .'} />;
}

export default Eat;
