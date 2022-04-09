import { FC } from 'react';
import { NoteEntity } from 'graphql/generated/graphql-types';
import { Card, CardContent, CardMedia, dialogTitleClasses, Typography } from '@mui/material';

type NoteItemProps = {
  note: NoteEntity;
};

export const NoteItem: FC<NoteItemProps> = ({ note }) => {
  if (!note.attributes) return null;

  const { title, description, image } = note.attributes;

  return (
    <Card sx={{ borderRadius: '0.5rem' }} className='w-full'>
      {image?.data && (
        <CardMedia
          component='img'
          image={import.meta.env.VITE_GRAPHQL_ENDPOINT + image.data?.attributes?.url}
          alt={image.data?.attributes?.name}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};
