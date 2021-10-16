import { useState, useEffect, useMemo } from 'react';
import { getFoodsToEat } from '../../api/apiService';

import { Container, Grid, Card, CardContent, CardMedia, CardActionArea, Typography } from '@mui/material';

const containerStyle = { textAlign: 'center' };

const gridContainerStyle = { justifyContent: 'center', marginTop: '50px' };

const gridItemStyle = { justifyContent: 'center' };

const cardStyle = { maxWidth: '350px', marginLeft: 'auto', marginRight: 'auto' };

const cardMediaStyle = {
  width: '100%',
  height: '150px',
  marginLeft: 'auto',
  marginRight: 'auto',
  objectFit: 'contain',
  background: '#F8F8F7',
};

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
        <Grid item key={food._id} xs={10} md={6} lg={4} sx={gridItemStyle}>
          <Card sx={cardStyle}>
            <CardActionArea>
              <CardMedia component="img" image={imgUri} alt="Food Image" sx={cardMediaStyle} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {food.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
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
