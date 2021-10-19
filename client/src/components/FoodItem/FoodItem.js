import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Container,
  Typography,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
} from '@mui/material';

const gridItemStyle = {
  justifyContent: 'center',
};

const cardStyle = {
  display: {
    md: 'flex',
  },
  maxWidth: {
    xs: '300px',
    md: '600px',
  },
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
  height: '60%',
  display: 'grid',
  alignItems: 'center',
};

const cardActionsStyle = {
  height: '40%',
  display: {
    xs: 'flex',
    md: 'grid',
  },
  justifyContent: {
    xs: 'space-around',
    md: 'center',
  },
};

const formControlLabelStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const boxStyle = {
  display: 'flex',
};

function FoodItem({ food, img, buttonsProps, switchProps }) {
  const buttons = buttonsProps?.map((buttonProps, index) => {
    return (
      <Button key={index} onClick={() => buttonProps.onClick(food?._id)}>
        {buttonProps.text}
      </Button>
    );
  });

  return (
    <Grid item key={food._id} xs={10} md={6} sx={gridItemStyle}>
      <Card sx={cardStyle}>
        <CardMedia component="img" image={img} alt="Food Image" sx={cardMediaStyle} />
        <Container disableGutters sx={containerStyle}>
          <CardContent sx={cardContentStyle}>
            <Typography variant="h6">{food.name}</Typography>
          </CardContent>
          <CardActions disableSpacing sx={cardActionsStyle}>
            {switchProps ? (
              <FormGroup>
                <FormControlLabel
                  sx={formControlLabelStyle}
                  control={<Switch onChange={switchProps.onChange} />}
                  label={switchProps.label}
                  labelPlacement="end"
                />
              </FormGroup>
            ) : null}
            <Box sx={boxStyle}>{buttons}</Box>
          </CardActions>
        </Container>
      </Card>
    </Grid>
  );
}

export default FoodItem;
