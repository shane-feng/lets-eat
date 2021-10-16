import { Container, Grid, Typography } from '@mui/material';

const containerStyle = { textAlign: 'center', paddingBottom: '50px' };

const gridContainerStyle = { justifyContent: 'center', marginTop: '50px' };

function FoodList({ foods, title }) {
  return (
    <Container maxWidth="md" sx={containerStyle}>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Grid container spacing={2} sx={gridContainerStyle}>
        {foods}
      </Grid>
    </Container>
  );
}

export default FoodList;
