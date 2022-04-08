import { FC, useState } from 'react';
import { Button, Icon, IconButton, TextField, Tooltip } from '@mui/material';
import { NoteCheckList } from './checklist';
import { Checklist } from 'graphql/generated/graphql-types';

type NoteFormProps = {
  onCreate: () => void;
};

export const NoteForm: FC<NoteFormProps> = (props) => {
  const [showChecklist, setShowCheckList] = useState(false);
  const [checklist, setChecklist] = useState<Checklist[]>([]);

  const onSubmitHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onCreate();
  };

  const onChecklistChangeHandler = (value: Checklist[]) => {
    setChecklist(value);
    // console.log(value)
  };

  return (
    <>
      <TextField
        variant='outlined'
        size='small'
        placeholder='Title'
        className='bg-white rounded-t-2xl focus:h-48 w-full'
        inputProps={{ style: { fontSize: '0.9rem', fontWeight: '500' } }}
        InputProps={{ className: 'p-2' }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: 'none',
            fontWeight: 'bold'
          }
        }}
      />

      <TextField
        variant='outlined'
        size='small'
        placeholder='Take a note...'
        className='bg-white focus:h-48 w-full'
        inputProps={{ style: { fontSize: '0.9rem', padding: '8px' } }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: 'none'
          }
        }}
        multiline
        rows={4}
      />

      {showChecklist && (
        <NoteCheckList checklist={checklist} onChecklistChange={onChecklistChangeHandler} />
      )}

      <div className='flex flex-auto justify-between items-center bg-white rounded-b-2xl p-2 px-3'>
        <div className='flex items-center'>
          <Tooltip title='Add checklist' placement='bottom'>
            <IconButton onClick={() => setShowCheckList(!showChecklist)}>
              <Icon className='material-icons-outlined'>playlist_add_check</Icon>
            </IconButton>
          </Tooltip>
        </div>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='small'
          onClick={onSubmitHandler}
          sx={{
            borderRadius: '15px',
            border: 'none',
            outline: 'none',
            fontStyle: 'normal',
            boxShadow: 'none',
            textTransform: 'unset',
            '&:hover': {
              boxShadow: 'none'
            }
          }}
        >
          Create
        </Button>
      </div>
    </>
  );
};
