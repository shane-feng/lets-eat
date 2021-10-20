import { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import FoodList from '../FoodList/FoodList';
import FoodFormModal from '../FoodFormModal/FoodFormModal';
import { getFoods, deleteFood } from '../../api/apiService';
import { AuthContext } from '../../contexts/AuthContext';
import { clearSessionData } from '../../utils';

import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';

const containerStyle = {
  textAlign: 'center',
};

const circularProgressStyle = {
  justifySelf: 'center',
  marginTop: '100px',
};

const boxStyle = {
  padding: '0 24px',
  display: 'grid',
  justifyContent: 'center',
};

const addFoodButtonStyle = {
  width: '150px',
  marginTop: {
    xs: '40px',
    md: '20px',
  },
};

function Menu() {
  const [foods, setFoods] = useState();
  const [foodToEdit, setFoodToEdit] = useState();
  const [isFoodFormModalOpen, setIsFoodFormModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addFoodMode, setAddFoodMode] = useState(false);
  const [auth] = useContext(AuthContext);

  const handleOpenAddFoodFormModal = () => {
    setAddFoodMode(true);
    setIsFoodFormModalOpen(true);
  };

  const handleOpenEditFoodFormModal = useCallback((food) => {
    setAddFoodMode(false);
    setFoodToEdit(food);
    setIsFoodFormModalOpen(true);
  }, []);

  const handleCloseModal = () => setIsFoodFormModalOpen(false);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const { data } = await getFoods();
      setFoods(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      // clears session data if user session data is ever invalidated
      if (error.response.status === 401) {
        clearSessionData();
      }
    }
  };

  const deleteFoodItem = useCallback(async (food) => {
    try {
      await deleteFood(food?._id);
      fetchFoods();
    } catch (error) {
      console.log(error);
      // clears session data if user session data is ever invalidated
      if (error.response.status === 401) {
        clearSessionData();
      }
    }
  }, []);

  const buttonsProps = useMemo(() => {
    return [
      {
        text: 'Edit',
        onClick: handleOpenEditFoodFormModal,
      },
      {
        text: 'Delete',
        onClick: deleteFoodItem,
      },
    ];
  }, [handleOpenEditFoodFormModal, deleteFoodItem]);

  useEffect(() => {
    if (auth) {
      fetchFoods();
    }
  }, [auth]);

  if (!auth) {
    return <Redirect to="/login" />;
  }

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" component="div">
        What Should We Eat?
      </Typography>
      <Box sx={boxStyle}>
        <Button sx={addFoodButtonStyle} variant="contained" size="large" onClick={handleOpenAddFoodFormModal}>
          Add Food
        </Button>
      </Box>
      <Box>
        {loading ? (
          <CircularProgress size={80} sx={circularProgressStyle} />
        ) : (
          <FoodList foods={foods} buttonsProps={buttonsProps} />
        )}
        <FoodFormModal
          isFoodFormModalOpen={isFoodFormModalOpen}
          handleCloseModal={handleCloseModal}
          addFoodMode={addFoodMode}
          foodToEdit={foodToEdit}
          fetchFoods={fetchFoods}
        />
      </Box>
    </Container>
  );
}

export default Menu;
