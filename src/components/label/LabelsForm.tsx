import { FC, useState } from 'react';
import { FormControl, Icon, IconButton, Input, InputAdornment } from '@mui/material';

import {
  CreateLabelMutation,
  LabelInput,
  Maybe,
  useCreateLabelMutation
} from 'graphql/generated/graphql-types';
import { useQueryClient } from 'react-query';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';
import { useAppSelector } from 'redux/hooks';
import { Picker } from 'components/ui';

type LabelsFormProps = {};

export const LabelsForm: FC<LabelsFormProps> = () => {
  const userId = useAppSelector((state) => state.user.userId);
  const queryClient = useQueryClient();

  const { data, error, isLoading, mutate } = useCreateLabelMutation<CreateLabelMutation, Error>(
    getGraphQLRequestClient(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['GetLabels']);
        setTitle('');
        setIcon('label');
        setColor('#2e2e2e');
      }
    }
  );

  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState<string>('label');
  const [color, setColor] = useState<string>('#2E2E2E');

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
      publishedAt: new Date(),
      user: userId
    };

    if (icon) {
      data.icon = icon;
    }

    if (color) {
      data.color = color;
    }

    mutate({ data });
  };

  const onIconPickHandler = (icon: string, color: string) => {
    if (icon) {
      setIcon(icon);
    }

    if (color) {
      setColor(color);
    }
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
              <Picker onPick={onIconPickHandler} icon={icon} color={color} />
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
