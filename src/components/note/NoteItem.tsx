import { FC, useState } from 'react';
import { NoteEntity } from 'graphql/generated/graphql-types';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Icon,
  List,
  ListItem,
  Skeleton,
  Typography
} from '@mui/material';
import clsx from 'clsx';
import { Checklist } from 'models';
import { NoteLabel } from './NoteLabel';

type NoteItemProps = {
  note: NoteEntity;
  onClick: (note: NoteEntity) => void;
};

export const NoteItem: FC<NoteItemProps> = ({ note, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!note.attributes) return null;

  const { title, description, image, checklist, labels } = note.attributes;

  const startLoading = () => {
    setImageLoaded(false);
  };

  const finishLoading = () => {
    setTimeout(() => {
      setImageLoaded(true);
    }, 3000);
  };

  return (
    <Card
      sx={{ borderRadius: '1rem' }}
      className='w-full cursor-pointer hover:shadow-xl animated fadeInUp'
      onClick={() => onClick(note)}
    >
      {image?.data && (
        <div>
          {!imageLoaded && (
            <Skeleton
              variant='rectangular'
              className='max-h-52 overflow-hidden'
              width={image?.data?.attributes?.width || 50}
              height={image?.data?.attributes?.height || 50}
            />
          )}

          <img
            src={import.meta.env.VITE_GRAPHQL_ENDPOINT + image.data?.attributes?.url}
            alt={image.data?.attributes?.name}
            onLoadStart={startLoading}
            onLoadCapture={finishLoading}
            className={clsx({ hidden: !imageLoaded })}
          />
        </div>
      )}

      <CardContent sx={{ paddingBottom: '1rem !important' }}>
        <Box component='div'className='mb-3'>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        </Box>

        {checklist && checklist.length > 0 && (
          <div>
            <List sx={{ padding: 0 }} dense>
              {checklist.map((item: Checklist, index: number) => (
                <ListItem
                  key={index}
                  className='flex items-center w-full'
                  sx={{ padding: 0 }}
                  dense
                >
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
          </div>
        )}

        {labels?.data && labels?.data.length > 0 && (
          <div className='flex flex-wrap mt-2 gap-1 pt-5'>
            {labels?.data.map(({ attributes }) => (
              <NoteLabel title={attributes!.title} key={attributes!.title} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
