import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CssBaseline, Icon, Popover, useScrollTrigger } from '@mui/material';
import { useAppDispatch } from 'redux/hooks';
import { labelActions } from 'redux/slices/label-slice';
import { userActions } from 'redux/slices/user-slice';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';

type AppbarLayoutProps = {
  username: string;
  email?: string;
};

export const AppbarLayout: React.FC<AppbarLayoutProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggleLabels = () => {
    dispatch(labelActions.toggleShowLabels());
  };

  const handleLogout = () => {
    dispatch(userActions.logout());
    navigate('/login');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div className='flex flex-col'>
        <div className='flex gap-2 p-4 pb-2'>
          <Avatar sx={{ bgcolor: '#E53E3E' }} aria-label='recipe' className='uppercase'>
            {props.username[0]}
          </Avatar>

          <div className='flex flex-col'>
            <Typography>{props.username}</Typography>
            <Typography color='text.secondary'>{props.email}</Typography>
          </div>
        </div>

        <div className='flex  w-full py-1'>
          <Button className='w-full' color='warning' onClick={handleLogout} size='medium'>
            Logout
          </Button>
        </div>
      </div>
    </Popover>
  );

  return (
    <>
      <AppBar
        position='static'
        color='transparent'
        className='text-black'
        sx={{ boxShadow: 'none' }}
      >
        <Toolbar className='!pl-0'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            className='!ml-1'
            sx={{ display: { xs: 'block', sm: 'none' } }}
            onClick={handleToggleLabels}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography
            variant='h5'
            className='text-center w-60 mx-2 fixed'
            component='div'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            N▢tember
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box>
            <IconButton size='medium'>
              <Icon>light_mode</Icon>
            </IconButton>
            <IconButton onClick={handleProfileMenuOpen} size='medium'>
              <Icon>person</Icon>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};
