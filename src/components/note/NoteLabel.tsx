import { FC } from 'react';
import { Chip } from '@mui/material';

type NoteLabelProps = {
  title: string;
  onDelete?: () => void;
};

export const NoteLabel: FC<NoteLabelProps> = (props) => {
  const onClickHandler = () => {
    // todo: filter notes by the selected label
  };

  return (
    <Chip
      {...(props.onDelete ? { onDelete: props.onDelete } : null)}
      label={props.title}
      variant='outlined'
      size='small'
      onClick={onClickHandler}
      sx={{
        fontSize: '12px'
      }}
    />
  );
};
