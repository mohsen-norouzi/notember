import { AppBar, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const AppbarLayout = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Notember
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
