import { Grid, Card, CardContent, CardMedia, CardActions, Container, Typography, Button } from '@mui/material';

const gridItemStyle = {
  justifyContent: 'center',
};

const cardStyle = {
  display: {
    md: 'flex',
  },
  maxWidth: { xs: '300px', md: '600px' },
  marginLeft: 'auto',
  marginRight: 'auto',
};

const cardMediaStyle = {
  flex: '60%',
  height: '150px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '20px 0',
  objectFit: 'contain',
  background: '#F8F8F7',
};

const containerStyle = {
  flex: '40%',
  display: 'flex',
  flexDirection: 'column',
};

const cardContentStyle = {
  height: '70%',
  display: 'grid',
  alignItems: 'center',
};

const cardActionsStyle = {
  height: '30%',
  display: 'flex',
  justifyContent: 'center',
};

function FoodItem({ food, img, buttonProps }) {
  return (
    <Grid item key={food._id} xs={10} md={6} sx={gridItemStyle}>
      <Card sx={cardStyle}>
        <CardMedia component="img" image={img} alt="Food Image" sx={cardMediaStyle} />
        <Container disableGutters sx={containerStyle}>
          <CardContent sx={cardContentStyle}>
            <Typography variant="h6">{food.name}</Typography>
          </CardContent>
          <CardActions disableSpacing sx={cardActionsStyle}>
            {buttonProps?.map((buttonProp, index) => {
              return (
                <Button key={index} onClick={buttonProp.onClick}>
                  {buttonProp.text}
                </Button>
              );
            })}
          </CardActions>
        </Container>
      </Card>
    </Grid>
  );
}

export default FoodItem;
