import { useState, useEffect, useMemo, useCallback } from 'react';
import FoodList from '../FoodList/FoodList';
import FoodFormModal from '../FoodFormModal/FoodFormModal';
import { getFoods, deleteFood } from '../../api/apiService';

import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';

const containerStyle = {
  display: 'grid',
  justifyContent: 'center',
  textAlign: 'center',
};

const circularProgressStyle = {
  justifySelf: 'center',
  marginTop: '100px',
};

const boxStyle = {
  width: '860px',
  padding: '0 24px',
  display: 'grid',
};

const addFoodButtonStyle = {
  marginTop: {
    xs: '40px',
    md: '10px',
  },
  justifySelf: {
    xs: 'center',
    md: 'end',
  },
};

function Menu() {
  const [foods, setFoods] = useState();
  const [isFoodFormModalOpen, setIsFoodFormModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addFoodMode, setAddFoodMode] = useState(false);
  const [editFoodItemId, setEditFoodItemId] = useState('');
  const handleOpenAddFoodFormModal = () => {
    setAddFoodMode(true);
    setIsFoodFormModalOpen(true);
  };

  const handleOpenEditFoodFormModal = useCallback((food) => {
    setAddFoodMode(false);
    setEditFoodItemId(food._id);
    setIsFoodFormModalOpen(true);
  }, []);

  const handleCloseModal = () => setIsFoodFormModalOpen(false);

  const fetchFoods = async () => {
    try {
      const { data } = await getFoods();
      setFoods(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFoodItem = useCallback(async (food) => {
    try {
      await deleteFood(food?._id);
      fetchFoods();
    } catch (e) {
      console.log(e);
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

  const switchProps = useMemo(() => {
    return { label: 'Eat', onChange: () => {} };
  }, []);

  useEffect(() => {
    handleCloseModal();
    setLoading(true);
    fetchFoods();
  }, []);

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
      {loading ? (
        <CircularProgress size={80} sx={circularProgressStyle} />
      ) : (
        <FoodList foods={foods} buttonsProps={buttonsProps} switchProps={switchProps} />
      )}
      <FoodFormModal
        isFoodFormModalOpen={isFoodFormModalOpen}
        handleCloseModal={handleCloseModal}
        addFoodMode={addFoodMode}
        editFoodItemId={editFoodItemId}
        fetchFoods={fetchFoods}
      />
    </Container>
  );
}

export default Menu;
