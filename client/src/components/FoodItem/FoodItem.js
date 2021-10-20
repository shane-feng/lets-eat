import { useState, useCallback } from 'react';
import { updateFoodToEatDate } from '../../api/apiService';
import { checkDateIsToday, clearSessionData } from '../../utils';

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
  width: {
    xs: '300px',
    md: '520px',
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
    xs: 'center',
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

function FoodItem({ food, isEatFoodListItem, img, buttonsProps }) {
  const [isEatToday, setIsEatToday] = useState(checkDateIsToday(food?.dateToEat));

  const toggleEatFoodToday = useCallback(async () => {
    const today = new Date();
    try {
      // if food already has toEatDate set to today - toggle off - return null
      // if food has no toEatDate - toggle on - return today's date
      // if food has toEatDate which is not today - toggle on - return today's date
      const date = checkDateIsToday(food?.dateToEat) ? null : today;
      await updateFoodToEatDate(food._id, date);
      setIsEatToday(!isEatToday);
    } catch (error) {
      console.log(error);
      // clears session data if user session data is ever invalidated
      if (error.response.status === 401) {
        clearSessionData();
      }
    }
  }, [isEatToday, food._id, food.dateToEat]);

  const buttons = buttonsProps?.map((buttonProps, index) => {
    return (
      <Button key={index} onClick={() => buttonProps.onClick(food)}>
        {buttonProps.text}
      </Button>
    );
  });

  return (
    <Grid item key={food?._id} xs={12} lg={6} sx={gridItemStyle}>
      <Card sx={cardStyle}>
        <CardMedia component="img" image={img} alt="Food Image" sx={cardMediaStyle} />
        <Container disableGutters sx={containerStyle}>
          <CardContent sx={cardContentStyle}>
            <Typography variant="h6">{food?.name}</Typography>
          </CardContent>
          <CardActions disableSpacing sx={cardActionsStyle}>
            <FormGroup>
              <FormControlLabel
                sx={formControlLabelStyle}
                control={
                  <Switch
                    checked={isEatToday}
                    onChange={(event) => {
                      toggleEatFoodToday(food?._id);
                      // disable user from toggling back and forth on the lets eat
                      // page after the user has chosen to not eat a food item today
                      if (isEatFoodListItem) {
                        event.target.disabled = true;
                      }
                    }}
                  />
                }
                label={'Eat'}
                labelPlacement="end"
              />
            </FormGroup>
            <Box sx={boxStyle}>{buttons}</Box>
          </CardActions>
        </Container>
      </Card>
    </Grid>
  );
}

export default FoodItem;
