import { Drawer, PaletteMode } from '@mui/material';
import { LabelList } from 'components/label';
import { FC, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { AppbarLayout } from './AppbarLayout';
import { labelActions } from 'redux/slices/label-slice';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          background: {
            default: '#f3f4f6',
            paper: '#fff'
          }
        }
      : {
          background: {
            // default: '#221D1D',
            // paper: '#221E1E'
          },
          text: {
            // primary: '#e2e2e2',
            // secondary: '#E2E2E2'
          }
        })
  }
});

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const dispatch = useAppDispatch();
  const { authenticated, username, email } = useAppSelector((state) => state.user);
  const showLabels = useAppSelector((state) => state.label.show);
  const mode = useAppSelector((state) => state.app.mode);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const handleToggleLabels = () => {
    dispatch(labelActions.toggleShowLabels());
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component='div'
        sx={{ bgcolor: 'background.default' }}
        className='w-screen min-h-screen flex flex-col justify-items-stretch'
      >
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          preventDuplicate
        >
          <AppbarLayout username={username} email={email} authenticated={authenticated} />

          {props.children}

          {authenticated && (
            <Drawer
              anchor='left'
              open={showLabels}
              onClose={handleToggleLabels}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <LabelList />
            </Drawer>
          )}
        </SnackbarProvider>
      </Box>
    </ThemeProvider>
  );
};
