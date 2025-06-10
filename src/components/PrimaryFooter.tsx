import { Box, Container, Typography } from '@mui/material';

const PrimaryFooter = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 2,
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'white',
        position: 'relative', // Changed from 'relative' for better sticky footer
        bottom: 0,
        width: '100%',
        zIndex: 1000 // Added zIndex to ensure footer stays above other content
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © {currentYear} Todo App - Made with ❤️
        </Typography>
      </Container>
    </Box>
  );
};

export default PrimaryFooter;
