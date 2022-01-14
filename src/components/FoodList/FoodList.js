import { useMemo } from 'react';
import FoodItem from '../FoodItem/FoodItem';

import { Container, Grid } from '@mui/material';

const containerStyle = { textAlign: 'center', paddingBottom: '50px' };

const gridContainerStyle = { justifyContent: 'center', marginTop: '50px' };

function FoodList({ foods, isEatFoodList, fetchFoodsToEat, buttonsProps }) {
  const renderFoods = useMemo(() => {
    return foods?.map((food, index) => {
      const imgUri = food.picture || '';
      return (
        <FoodItem
          key={index}
          food={food}
          isEatFoodListItem={isEatFoodList}
          fetchFoodsToEat={fetchFoodsToEat}
          img={imgUri}
          buttonsProps={buttonsProps}
        />
      );
    });
  }, [foods, isEatFoodList, fetchFoodsToEat, buttonsProps]);

  return (
    <Container sx={containerStyle}>
      <Grid container spacing={2} sx={gridContainerStyle}>
        {renderFoods}
      </Grid>
    </Container>
  );
}

export default FoodList;
