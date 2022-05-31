import { Box, Typography } from '@mui/material';
import Icon from '@mui/material/Icon';
import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type LabelItemProps = {
  title?: string;
  icon: string;
  color?: string | undefined | null;
  active?: boolean;
  onClick: () => void;
};

export const LabelItem: FC<LabelItemProps> = (props) => {
  const onClickHandler = () => {
    props.onClick();
  };

  return (
    <Box
      className={clsx('flex items-center cursor-pointer rounded-md transition-all mb-1 mx-2', {
        active: !!props.active
      })}
      onClick={onClickHandler}
      sx={{
        bgcolor: !!props.active ? 'action.selected' : 'unset',
        ':hover': { bgcolor: 'action.hover' }
      }}
    >
      <Icon color='action' style={{ color: props.color! }} className='m-2'>
        {props.icon}
      </Icon>

      <Typography className='flex-2 p-2' color='text.primary'>
        {props.title}
      </Typography>
    </Box>
  );
};
