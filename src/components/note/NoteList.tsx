import { FC, useEffect, useState } from 'react';
import Masonry from '@mui/lab/Masonry';

import {
  GetNotesQuery,
  Maybe,
  NoteEntity,
  useGetNotesQuery
} from 'graphql/generated/graphql-types';

import { NoteItem } from './NoteItem';
import { NoteDialog } from './NoteDialog';
import { Icon, Skeleton, Stack, Typography } from '@mui/material';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useSnackbar } from 'notistack';
import { noteActions } from 'redux/slices/note-slice';

type NoteListProps = {};

export const NoteList: FC<NoteListProps> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const notes = useAppSelector((state) => state.note.notes);
  const userId = useAppSelector((state) => state.user.userId);
  const filter = useAppSelector((state) => state.label.filter);

  const [selectedNote, setSelectedNote] = useState<Maybe<NoteEntity>>(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    let filterData = filter ? { labels: { title: { eq: filter } } } : {};

    setFilters(filterData);
  }, [filter]);

  const { isLoading, error } = useGetNotesQuery<GetNotesQuery, Error>(
    getGraphQLRequestClient(),
    {
      filters: { ...filters, users: { id: { eq: userId } } }
    },
    {
      onSuccess: (data) => {
        dispatch(noteActions.setNotes(data.notes?.data || []));
      },
      onError: () => {
        enqueueSnackbar('Failed to load notes.', { variant: 'error' });
      },
      retry: (failureCount, error) => {
        if (failureCount < 2) {
          enqueueSnackbar('Failed to load notes. Retrying...', { variant: 'error' });
          return true;
        }

        return false;
      },
      refetchOnWindowFocus: false,
      refetchInterval: 15 * 1000
    }
  );

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-full w-full mt-10 gap-5'>
        <Icon className='!text-9xl' color='action'>
          report
        </Icon>

        <Typography color='textSecondary' variant='h5'>
          Failed to load notes!
        </Typography>
      </div>
    );
  }

  if (!isLoading && notes.length === 0) {
    return (
      <div className='flex  items-center justify-center w-full h-auto mt-5'>
        <Typography color='textSecondary' variant='h5'>
          There are no notes!
        </Typography>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }} sx={{ alignContent: 'flex-start' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Stack spacing={1} key={i}>
            <Skeleton variant='rectangular' width='100%' height='40vh' className='rounded-md' />
          </Stack>
        ))}
      </Masonry>
    );
  }

  return (
    <>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }} sx={{ alignContent: 'flex-start' }}>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} onClick={(note) => setSelectedNote(note)} />
        ))}
      </Masonry>

      {selectedNote && (
        <NoteDialog note={selectedNote || null} onClose={() => setSelectedNote(null)} />
      )}
    </>
  );
};
