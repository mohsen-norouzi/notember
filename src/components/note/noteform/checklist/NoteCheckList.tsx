import { Button, List } from '@mui/material';
import { Checklist } from 'graphql/generated/graphql-types';
import { FC, useState } from 'react';
import { CheckListForm } from './CheckListForm';
import { CheckListItem } from './CheckListItem';

type CheckListProps = {
  checklist: Checklist[];
  onChecklistChange: (checklist: Checklist[]) => void;
};

export const NoteCheckList: FC<CheckListProps> = (props) => {
  const onAddHandler = (title: string) => {
    const newItem: Checklist = { title, checked: false };
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
    <List className='p-0 bg-white' dense>
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
