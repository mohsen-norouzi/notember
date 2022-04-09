import { FC } from 'react';
import { Chip } from '@mui/material';

type NoteLabelProps = {
  title: string;
};

export const NoteLabel: FC<NoteLabelProps> = ({ title }) => {
  const onClickHandler = () => {
    // todo: filter notes by the selected label
  };

  return (
    <Chip
      label={title}
      variant='outlined'
      size='small'
      onClick={onClickHandler}
      sx={{
        fontSize: '12px'
      }}
    />
  );
};
