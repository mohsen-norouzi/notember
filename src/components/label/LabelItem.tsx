import { Icon } from '@mui/material';
import { LabelEntity } from 'graphql/generated/graphql-types';
import { FC } from 'react';

type LabelItemProps = {
  label: LabelEntity;
};

export const LabelItem: FC<LabelItemProps> = ({ label }) => {
  if (!label.attributes) return null;

  const { title, icon, color } = label.attributes;

  return (
    <li className='flex'>
      <Icon fontSize='small' style={{ color: color || '#2E2E2E' }}>
        {icon}
      </Icon>

      <p>{title}</p>
    </li>
  );
};
