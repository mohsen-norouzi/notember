import { FC } from 'react';
import { List } from '@mui/material';
import { CheckListForm } from './CheckListForm';
import { CheckListItem } from './CheckListItem';
import { Checklist } from 'models';

type CheckListProps = {
  checklist: Checklist[];
  onChecklistChange: (checklist: Checklist[]) => void;
};

export const NoteCheckList: FC<CheckListProps> = (props) => {
  const onAddHandler = (text: string) => {
    const newItem: Checklist = { text, checked: false };
    props.onChecklistChange([...props.checklist, newItem]);
  };

  const onRemoveHandler = (i: number) => {
    let newItems = [...props.checklist];
    newItems.splice(i, 1);
    props.onChecklistChange(newItems);
  };

  const onChecklistItemChangeHadnler = (i: number, key: string, value: string | boolean) => {
    const updatedItems = [...props.checklist];
    updatedItems[i] = { ...updatedItems[i], [key]: value };
    props.onChecklistChange(updatedItems);
  };

  return (
    <List className='p-0' dense>
      {props.checklist.map((item, i) => (
        <CheckListItem
          key={i}
          item={item}
          onChange={(key, value) => onChecklistItemChangeHadnler(i, key, value)}
          onRemove={() => onRemoveHandler(i)}
        />
      ))}

      <CheckListForm onAdd={onAddHandler} />
    </List>
  );
};
