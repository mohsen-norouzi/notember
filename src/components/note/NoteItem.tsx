import { FC } from 'react';
import { NoteEntity } from 'graphql/generated/graphql-types';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  dialogTitleClasses,
  Icon,
  List,
  ListItem,
  Typography
} from '@mui/material';
import clsx from 'clsx';
import { Checklist } from 'models';
import { NoteLabel } from './NoteLabel';

type NoteItemProps = {
  note: NoteEntity;
};

export const NoteItem: FC<NoteItemProps> = ({ note }) => {
  if (!note.attributes) return null;

  const { title, description, image, checklist, labels } = note.attributes;

  return (
    <Card sx={{ borderRadius: '0.5rem' }} className='w-full'>
      {image?.data && (
        <CardMedia
          component='img'
          image={import.meta.env.VITE_GRAPHQL_ENDPOINT + image.data?.attributes?.url}
          alt={image.data?.attributes?.name}
        />
      )}

      <CardContent sx={{ paddingBottom: '1rem !important' }}>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>

        {checklist && checklist.length > 0 && (
          <List sx={{ padding: '0.5rem 0' }} dense>
            {checklist.map((item: Checklist, index: number) => (
              <ListItem key={index} className='flex items-center w-full' sx={{ padding: 0 }} dense>
                <Icon color='action' className='text-16 material-icons-outlined' fontSize='small'>
                  {item.checked ? 'check_box_outline' : 'check_box_outline_blank'}
                </Icon>
                <Typography
                  className={clsx('truncate pl-2', item.checked && 'line-through')}
                  color={item.checked ? 'textSecondary' : 'inherit'}
                  fontSize='small'
                >
                  {item.text}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}

        {labels?.data && labels?.data.length > 0 && (
          <div className='flex flex-wrap mt-2 gap-1'>
            {labels?.data.map(({ attributes }) => (
              <NoteLabel title={attributes!.title} key={attributes!.title} />
            ))}
            {labels?.data.map(({ attributes }) => (
              <NoteLabel title={attributes!.title} key={attributes!.title} />
            ))}
            {labels?.data.map(({ attributes }) => (
              <NoteLabel title={attributes!.title} key={attributes!.title} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
