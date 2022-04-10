import { FormControl, Icon, IconButton, Input, InputAdornment } from '@mui/material';
import { FC } from 'react';

type LabelsFormProps = {};

export const LabelsForm: FC<LabelsFormProps> = () => {
  return (
    <FormControl variant='standard'>
      <Input
        className='border p-2'
        sx={{ fontSize: '14px' }}
        disableUnderline
        startAdornment={
          <InputAdornment position='start'>
            <Icon className='list-item-icon text-16' color='action' fontSize='small'>
              add
            </Icon>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              className='p-0'
              aria-label='Delete'
              // disabled={_.isEmpty(dirtyFields) || !isValid}
              type='submit'
            >
              <Icon fontSize='small'>check</Icon>
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
