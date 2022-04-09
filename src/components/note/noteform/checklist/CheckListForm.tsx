import React, { FC, useState } from 'react';
import { Icon, IconButton, Input, ListItem } from '@mui/material';
import clsx from 'clsx';

type CheckListFormProps = {
  onAdd: (text: string) => void;
};

export const CheckListForm: FC<CheckListFormProps> = (props) => {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);

  const onSubmitHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onAdd(text);
    setText('');
  };

  const canAdd = () => {
    if (text.trim() === '' || !focused) {
      return false;
    }

    return true;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <ListItem dense>
      <IconButton
        onClick={onSubmitHandler}
        disableRipple
        type='submit'
        style={{ padding: '0 9.5px' }}
        disabled={!canAdd()}
        className={clsx({ 'opacity-50': !canAdd() })}
      >
        <Icon className='material-icons-outlined p-0'>add</Icon>
      </IconButton>
      <Input
        name='text'
        value={text}
        placeholder='Add an item'
        onChange={handleChange}
        disableUnderline
        inputProps={{ style: { fontSize: '12px' } }}
        style={{ paddingBottom: '0', paddingTop: 0 }}
        autoFocus
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </ListItem>
  );
};
