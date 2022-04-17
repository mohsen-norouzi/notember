import { FC, useState } from 'react';
import { FormControl, Icon, IconButton, Input, InputAdornment } from '@mui/material';

import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';
import {
  CreateLabelMutation,
  LabelInput,
  Maybe,
  useCreateLabelMutation
} from 'graphql/generated/graphql-types';
import { useQueryClient } from 'react-query';

type LabelsFormProps = {};

export const LabelsForm: FC<LabelsFormProps> = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, mutate } = useCreateLabelMutation<CreateLabelMutation, Error>(
    graphqlRequestClient,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['GetLabels']);
        setTitle('');
        setColor(null);
        setIcon(null);
      }
    }
  );

  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState<Maybe<string>>(null);
  const [color, setColor] = useState<Maybe<string>>(null);

  const isValid = () => {
    if (title.trim() === '') {
      return false;
    }

    return true;
  };

  const onSubmitHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    const data: LabelInput = {
      title,
      publishedAt: new Date()
    };

    if (icon) {
      data.icon = icon;
    }

    if (color) {
      data.color = color;
    }

    mutate({ data });
  };

  return (
    <form>
      <FormControl variant='standard'>
        <Input
          className='border p-2'
          sx={{ fontSize: '14px' }}
          disableUnderline
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
          value={title}
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
                disabled={!isValid()}
                type='submit'
                onClick={onSubmitHandler}
              >
                <Icon fontSize='small'>check</Icon>
              </IconButton>
            </InputAdornment>
          }
          autoFocus
        />
      </FormControl>
    </form>
  );
};
