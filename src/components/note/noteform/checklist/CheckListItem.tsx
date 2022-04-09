import { FC } from 'react';
import { Checkbox, Icon, IconButton, Input, ListItem } from '@mui/material';
import clsx from 'clsx';
import { Checklist } from 'models';

type CheckListItemProps = {
  item: Checklist;
  onChange: (key: string, value: string | boolean) => void;
  onRemove: () => void;
};

export const CheckListItem: FC<CheckListItemProps> = (props) => {
  const handleChange = (event: any) => {
    if (event.target.type === 'checkbox') {
      return props.onChange('checked', event.target.checked);
    }

    props.onChange('text', event.target.value);
  };

  return (
    <ListItem dense>
      <Checkbox
        disableRipple
        onChange={handleChange}
        style={{ paddingBottom: '0', paddingTop: 0 }}
      />

      <Input
        className={clsx('flex flex-1', { 'line-through opacity-50': props.item.checked })}
        name='text'
        value={props.item.text}
        placeholder='Add an item'
        onChange={handleChange}
        disableUnderline
        style={{ paddingBottom: '0', paddingTop: 0 }}
        inputProps={{ style: { fontSize: '12px' } }}
      />

      <IconButton style={{ paddingBottom: '0', paddingTop: 0 }} onClick={() => props.onRemove()}>
        <Icon fontSize='small' className='material-icons-outlined'>
          delete
        </Icon>
      </IconButton>
    </ListItem>
  );
};
