import { Button, Icon, IconButton, TextField, Tooltip } from '@mui/material';

export const NoteForm = () => {
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

      <div className='flex flex-auto justify-between items-center bg-white rounded-b-2xl p-2 px-3'>
        <div className='flex items-center'>
          <Tooltip title='Add checklist' placement='bottom'>
            <IconButton>
              <Icon className='material-icons-outlined'>playlist_add_check</Icon>
            </IconButton>
          </Tooltip>
        </div>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='small'
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
