import { Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import logoImage from 'assets/images/logo.png';
import {
  RegisterMutation,
  useRegisterMutation,
  UsersPermissionsRegisterInput
} from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';
import { useNavigate } from 'react-router-dom';

type LoginType = {
  email: string;
  password: string;
};

const defaultValues: UsersPermissionsRegisterInput = {
  email: '',
  password: '',
  username: ''
};

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { data, error, isLoading, mutate } = useRegisterMutation<RegisterMutation, Error>(
    graphqlRequestClient,
    {
      onSuccess: (result) => {
        if (result.register && result.register.jwt && result.register.user) {
          localStorage.setItem('jwt', result.register.jwt.toString());
          navigate('/');
        }
      },
      onError: (err) => {
        console.log(err);
      }
    }
  );

  const { control, handleSubmit } = useForm<UsersPermissionsRegisterInput>({ defaultValues });

  const onSubmit = (data: UsersPermissionsRegisterInput) => {
    const input: UsersPermissionsRegisterInput = {
      email: data.email,
      username: data.username,
      password: data.password
    };

    mutate({ input });
  };

  return (
    <div className='h-full w-full flex flex-col flex-auto items-center justify-center'>
      <img className='w-16 mb-5' src={logoImage} alt='logo' />

      <Typography variant='h5' className='mt-16 mb-24 font-semibold text-18 sm:text-24'>
        Create an account
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center items-center w-full gap-2'
      >
        <Controller
          name='username'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Username'
              variant='outlined'
              size='small'
              sx={{ border: '1px solid !important' }}
              autoFocus
            />
          )}
        />

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
              type='password'
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
