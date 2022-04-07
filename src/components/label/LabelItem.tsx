import Icon from '@mui/material/Icon';
import { FC } from 'react';

type LabelItemProps = {
  title?: string;
  icon: string;
  color?: string | undefined | null;
};

export const LabelItem: FC<LabelItemProps> = ({ title, icon, color }) => {
  return (
    <div className='flex items-center cursor-pointer hover:bg-gray-100 rounded-md transition-all'>
      <Icon
        color='action'
        fontSize='small'
        style={{ color: color! }}
        className='m-2 material-icons-outlined'
      >
        {icon}
      </Icon>

      <p className='flex-2 p-2 text-gray-600 text-sm'>{title}</p>
    </div>
  );
};
