import { Backdrop, Drawer } from '@mui/material';
import { LabelList } from 'components/label';
import { FC } from 'react';
import { appActions } from 'redux/app-slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { AppbarLayout } from './AppbarLayout';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const showLabels = useAppSelector((state) => state.app.showLabels);

  const dispatch = useAppDispatch();

  const handleToggleLabels = () => {
    dispatch(appActions.toggleShowLabels());
  };

  return (
    <>
      <AppbarLayout />

      {props.children}

      <Drawer
        anchor='left'
        open={showLabels}
        onClose={handleToggleLabels}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <LabelList onFilter={() => {}} />
      </Drawer>
    </>
  );
};
