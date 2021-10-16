import { useMemo } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { decodeDataUri } from '../../utils';

import { Container, Grid, Typography } from '@mui/material';

const containerStyle = { textAlign: 'center', paddingBottom: '50px' };

const gridContainerStyle = { justifyContent: 'center', marginTop: '50px' };

function FoodList({ foods, title, buttonsProps, switchProps }) {
  const renderFoods = useMemo(() => {
    return foods?.map((food, index) => {
      const imgUri = decodeDataUri(food.picture.data);

      return <FoodItem key={index} food={food} img={imgUri} buttonsProps={buttonsProps} switchProps={switchProps} />;
    });
  }, [foods, buttonsProps, switchProps]);

  return (
    <Container maxWidth="md" sx={containerStyle}>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Grid container spacing={2} sx={gridContainerStyle}>
        {renderFoods}
      </Grid>
    </Container>
  );
}

export default FoodList;
