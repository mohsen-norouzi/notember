import Icon from '@mui/material/Icon';
import { FC } from 'react';

type LabelItemProps = {
  title?: string;
  icon: string;
  color?: string | undefined | null;
  onClick: () => void;
};

export const LabelItem: FC<LabelItemProps> = (props) => {
  const onClickHandler = () => {
    props.onClick();
  };

  return (
    <div
      className='flex items-center cursor-pointer hover:bg-gray-100 rounded-md transition-all'
      onClick={onClickHandler}
    >
      <Icon
        color='action'
        fontSize='small'
        style={{ color: props.color! }}
        className='m-2 material-icons-outlined'
      >
        {props.icon}
      </Icon>

      <p className='flex-2 p-2 text-gray-600 text-sm'>{props.title}</p>
    </div>
  );
};
