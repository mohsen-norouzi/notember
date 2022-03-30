import { FC } from 'react';
import { NoteEntity } from 'graphql/generated/graphql-types';

type NoteItemProps = {
  note: NoteEntity;
};

export const NoteItem: FC<NoteItemProps> = ({ note }) => {
  if (!note.attributes) return null;

  const { title } = note.attributes;

  return <li>{title}</li>;
};
