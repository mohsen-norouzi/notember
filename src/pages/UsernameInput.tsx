import { FC, useEffect, useState } from 'react';
import {
  CircularProgress,
  Icon,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material';
import { useDebounce } from 'hooks';
import {
  GetUsernameQuery,
  useGetUsernameQuery,
  UsersPermissionsRegisterInput
} from 'graphql/generated/graphql-types';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';
import { useQueryClient } from 'react-query';
import { Control, Controller } from 'react-hook-form';

type UsernameInputProps = {
  control: Control<UsersPermissionsRegisterInput, any>;
  value: string;
  isValidating: boolean;
  onValidateStart: () => void;
  onValidateFinish: (taken: boolean) => void;
};

export const UsernameInput: FC<UsernameInputProps> = (props) => {
  const usernameState = props.control.getFieldState('username');
  const queryClient = useQueryClient();
  const debouncedUsername = useDebounce<string>(props.value, 3000);

  const checkUsername = useGetUsernameQuery<GetUsernameQuery, Error>(
    getGraphQLRequestClient(false),
    {
      filters: { username: { eq: debouncedUsername.toLowerCase() } }
    },
    {
      onSuccess: (result) => {
        if (result.usersPermissionsUsers?.data) {
          const taken = result.usersPermissionsUsers?.data.length > 0;
          props.onValidateFinish(taken);
        }
      },
      retry: false,
      refetchOnWindowFocus: false
    }
  );

  useEffect(() => {
    if (usernameState.error === undefined) {
      checkUsername.refetch();
    }
  }, []);

  useEffect(() => {
    queryClient.cancelQueries(['GetUsername']);
    props.onValidateStart();
  }, [props.value]);

  let status = <></>;

  if (usernameState.isDirty) {
    if (props.isValidating) {
      status = <CircularProgress size='18px' />;
    } else if (!props.isValidating) {
      if (usernameState.error === undefined) {
        status = <Icon>check</Icon>;
      } else {
        status = <Icon color='error'>error</Icon>;
      }
    }
  }

  return (
    <FormControl
      variant='outlined'
      className='w-full !mb-3'
      error={usernameState.error !== undefined}
      color={
        usernameState.isDirty && !props.isValidating && usernameState.error === undefined
          ? 'primary'
          : 'error'
      }
    >
      <InputLabel>Username</InputLabel>
      <Controller
        name='username'
        control={props.control}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            label='Username'
            autoFocus
            className='w-full'
            // error={props.error !== undefined}
            // helperText={props.error && (props.error.message || 'This field is required')}
            endAdornment={<InputAdornment position='end'>{status}</InputAdornment>}
          />
        )}
      />
      <FormHelperText>{usernameState.error?.message}</FormHelperText>
    </FormControl>
  );
};
