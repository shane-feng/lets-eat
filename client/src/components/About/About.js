import { Container, Typography } from '@mui/material';

const containerStyle = {
  textAlign: 'center',
};

const typographyStyle = {
  width: '70%',
  margin: '60px auto',
};

function About() {
  return (
    <Container sx={containerStyle}>
      <Typography sx={typographyStyle} variant="h3">
        About Lets Eat
      </Typography>
      <Typography sx={typographyStyle} variant="h6">
        Welcome to Lets Eat! This easy to use application allows you to manage all of your cooking dishes in one place,
        adding, editing or removing items as you wish. You can easily choose to set which dishes you wish to eat today
        with a simple switch and you're ready to go!
      </Typography>
    </Container>
  );
}

export default About;
