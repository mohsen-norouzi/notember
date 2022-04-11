import { Icon, IconButton, Input, ListItem } from '@mui/material';
import { LabelEntity, LabelInput, Maybe } from 'graphql/generated/graphql-types';
import React, { FC, useState } from 'react';

type LabelListFormItemProps = {
  label?: Maybe<LabelEntity>;
  onDelete: (id: string) => void;
  onChange: (data: LabelInput, id: string) => void;
};

export const LabelListFormItem: FC<LabelListFormItemProps> = (props) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const attributes = props.label?.attributes;
    const id = props.label?.id;

    if (attributes && id) {
      let data: LabelInput = {
        [event.target.name]: event.target.value
      };

      debugger;

      props.onChange(data, id);
    }
  };

  if (!props.label || !props.label.attributes) {
    return null;
  }

  const onDeleteHandler = () => {
    const id = props.label?.id;

    if (id) {
      props.onDelete(id);
    }
  };

  return (
    <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className='flex items-center '>
        <IconButton onClick={() => {}}>
          <Icon
            color='action'
            fontSize='small'
            style={{ color: props.label.attributes.color! }}
            className='material-icons-outlined'
          >
            {props.label.attributes.icon}
          </Icon>
        </IconButton>

        <Input
          className='p-0 h-full ml-2'
          sx={{ fontSize: '14px', padding: '4px 0 2.5px' }}
          value={props.label.attributes.title}
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
