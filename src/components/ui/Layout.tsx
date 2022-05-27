import { Drawer } from '@mui/material';
import { LabelList } from 'components/label';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { AppbarLayout } from './AppbarLayout';
import { labelActions } from 'redux/slices/label-slice';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const { authenticated, username, email } = useAppSelector((state) => state.user);
  const showLabels = useAppSelector((state) => state.label.show);

  const dispatch = useAppDispatch();

  const handleToggleLabels = () => {
    dispatch(labelActions.toggleShowLabels());
  };

  return (
    <>
      {authenticated && <AppbarLayout username={username} email={email} />}

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
    </>
  );
};
