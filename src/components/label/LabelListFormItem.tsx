import React, { FC, useEffect, useState } from 'react';
import { Icon, IconButton, Input, ListItem } from '@mui/material';

import { LabelEntity, LabelInput, Maybe } from 'graphql/generated/graphql-types';
import { useDebounce } from 'hooks';
import { Picker } from 'components/ui';

type LabelListFormItemProps = {
  label?: Maybe<LabelEntity>;
  onDelete: (id: string) => void;
  onChange: (data: LabelInput, id: string) => void;
};

export const LabelListFormItem: FC<LabelListFormItemProps> = (props) => {
  const [title, setTitle] = useState(props.label?.attributes?.title || '');
  const debouncedTitle = useDebounce<string>(title, 500);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onIconPickHandler = (icon: string, color: string) => {
    const id = props.label?.id;

    if (id) {
      let data: LabelInput = {};

      if (icon) {
        data.icon = icon;
      }

      if (color) {
        data.color = color;
      }

      props.onChange(data, id);
    }
  };

  const onDeleteHandler = () => {
    const id = props.label?.id;

    if (id) {
      props.onDelete(id);
    }
  };

  if (!props.label || !props.label.attributes) {
    return null;
  }

  useEffect(() => {
    const id = props.label?.id;

    if (id) {
      let data: LabelInput = {
        title: debouncedTitle
      };

      props.onChange(data, id);
    }
  }, [debouncedTitle]);

  return (
    <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className='flex items-center '>
        <Picker
          onPick={onIconPickHandler}
          icon={props.label.attributes.icon!}
          color={props.label.attributes.color!}
        />

        <Input
          className='p-0 h-full ml-2'
          sx={{ fontSize: '14px', padding: '4px 0 2.5px' }}
          value={title}
          name='title'
          onChange={onChangeHandler}
          disableUnderline
        />
      </div>

      <IconButton style={{ inset: 0 }} onClick={onDeleteHandler}>
        <Icon fontSize='small' className='material-icons-outlined'>
          delete
        </Icon>
      </IconButton>
    </ListItem>
  );
};
