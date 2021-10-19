import { useMemo } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { decodeDataUri } from '../../utils';

import { Container, Grid } from '@mui/material';

const containerStyle = { textAlign: 'center', paddingBottom: '50px' };

const gridContainerStyle = { justifyContent: 'center', marginTop: '50px' };

function FoodList({ foods, buttonsProps, switchProps }) {
  const renderFoods = useMemo(() => {
    return foods?.map((food, index) => {
      const imgUri = food.picture ? decodeDataUri(food.picture.data) : '';

      return <FoodItem key={index} food={food} img={imgUri} buttonsProps={buttonsProps} switchProps={switchProps} />;
    });
  }, [foods, buttonsProps, switchProps]);

  return (
    <Container sx={containerStyle}>
      <Grid container spacing={2} sx={gridContainerStyle}>
        {renderFoods}
      </Grid>
    </Container>
  );
}

export default FoodList;
