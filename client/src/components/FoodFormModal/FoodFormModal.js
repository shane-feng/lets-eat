import { useState, useEffect } from 'react';
import { createFood, updateFood } from '../../api/apiService';

import { Card, CardMedia, Modal, Backdrop, Fade, Box, Grid, Typography, Button, styled } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const boxStyle = {
  height: {
    xs: '400px',
    md: '480px',
  },
  maxWidth: 400,
  minWidth: 250,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const gridContainerStyle = {
  justifyContent: 'center',
  marginTop: '1px',
};

const gridItemStyle = {
  padding: 0,
};

const foodNameTextContainerStyle = {
  height: '100px',
};

const textFieldStyle = {
  display: 'block',
};

const imagePreviewGridStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: {
    xs: '200px',
    md: '230px',
  },
  border: '1px solid  #c1c1d7',
  background: '#F8F8F7',
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

const buttonStyle = {
  width: '120px',
  height: '32px',
  margin: '5px',
};

const cameraIconStyle = {
  marginLeft: 1,
};

const Input = styled('input')({
  display: 'none',
});

function FoodFormModal({ isFoodFormModalOpen, handleCloseModal, addFoodMode, foodToEdit, fetchFoods }) {
  const [foodName, setFoodName] = useState('');
  const [foodPicture, setFoodPicture] = useState('');

  const readFileAsync = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve({ name: file.name, dataUri: reader.result });
        };
      }
    });
  };

  const processFile = async (event) => {
    try {
      const results = await readFileAsync(event.target.files[0]);
      setFoodPicture(results.dataUri);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const food = { name: foodName, picture: foodPicture };
    try {
      if (addFoodMode) {
        handleCloseModal();
        await createFood(food);
        fetchFoods();
      } else {
        handleCloseModal();
        await updateFood({ _id: foodToEdit?._id, ...food });
        fetchFoods();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFoodName('');
    setFoodPicture('');
  }, [handleCloseModal]);

  return (
    <Modal
      open={isFoodFormModalOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isFoodFormModalOpen}>
        <Box sx={boxStyle}>
          <Typography variant="h6">{addFoodMode ? 'Add Food' : 'Edit Food'}</Typography>
          <ValidatorForm onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={gridContainerStyle}>
              <Grid item xs={12} sx={foodNameTextContainerStyle}>
                <TextValidator
                  label="Food Name"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Food Name"
                  size="normal"
                  fullWidth
                  sx={textFieldStyle}
                  value={foodName}
                  onChange={(event) => setFoodName(event.target.value)}
                  validators={['required']}
                  errorMessages={['This field is required']}
                />
              </Grid>
              <Grid item xs={12} sx={gridItemStyle}>
                <Card sx={imagePreviewGridStyle}>
                  {foodPicture ? (
                    <CardMedia component="img" image={foodPicture} alt="Food Image" sx={cardMediaStyle} />
                  ) : (
                    <Typography variant="h6">Upload Image</Typography>
                  )}
                </Card>
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(event) => processFile(event)}
                  />
                  <Button variant="contained" component="span" size="small" sx={buttonStyle}>
                    Upload <PhotoCamera sx={cameraIconStyle} />
                  </Button>
                </label>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" type="submit" size="small" sx={buttonStyle}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Box>
      </Fade>
    </Modal>
  );
}

export default FoodFormModal;
