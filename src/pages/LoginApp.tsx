import { Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import logoImage from 'assets/images/logo.png';
import {
  LoginMutation,
  useLoginMutation,
  UsersPermissionsLoginInput
} from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';
import { Navigate, useNavigate } from 'react-router-dom';

type LoginType = {
  email: string;
  password: string;
};

const defaultValues: LoginType = {
  email: '',
  password: ''
};

export const LoginApp = () => {
  const navigate = useNavigate();
  const { data, error, isLoading, mutate } = useLoginMutation<LoginMutation, Error>(
    graphqlRequestClient,
    {
      onSuccess: (result) => {
        if (result.login && result.login.jwt) {
          localStorage.setItem('jwt', result.login.jwt.toString());
          navigate('/');
        }
      },
      onError: (err) => {
        console.log(err);
      }
    }
  );

  const { control, handleSubmit } = useForm<LoginType>({ defaultValues });

  const onSubmit = (data: LoginType) => {
    const input: UsersPermissionsLoginInput = {
      identifier: data.email,
      password: data.password
    };

    mutate({ input });
  };

  return (
    <div className='h-full w-full flex flex-col flex-auto items-center justify-center'>
      <img className='w-16 mb-5' src={logoImage} alt='logo' />

      <Typography variant='h5' className='mt-16 mb-24 font-semibold text-18 sm:text-24'>
        Login to your account
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center items-center w-full gap-2'
      >
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Email'
              variant='outlined'
              size='small'
              sx={{ border: '1px solid !important' }}
              autoFocus
            />
          )}
        />

        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Password'
              variant='outlined'
              size='small'
              sx={{ border: '1px solid !important' }}
            />
          )}
        />

        <Button type='submit'>Login</Button>
      </form>
    </div>
  );
};
