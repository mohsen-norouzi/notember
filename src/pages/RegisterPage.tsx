import { Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  RegisterMutation,
  useRegisterMutation,
  UsersPermissionsRegisterInput
} from 'graphql/generated/graphql-types';
import { Link, useNavigate } from 'react-router-dom';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';
import { userActions } from 'redux/slices/user-slice';
import { useAppDispatch } from 'redux/hooks';
import { useSnackbar } from 'notistack';
import { ClientError } from 'graphql-request';
import { LoadingButton } from '@mui/lab';
import { UsernameInput } from './UsernameInput';
import { useState } from 'react';

const schema = yup
  .object({
    username: yup
      .string()
      .default('')
      .min(3)
      .required()
      .matches(/^[A-Za-z]*$/, 'username must start with an alphabet'),
    email: yup.string().default('').email().required(),
    password: yup
      .string()
      .default('')
      .min(5)
      .required()
      .matches(/^(?=.*[A-Z])/, 'password must contain at least one uppercase')
      .matches(/^(?=.*[a-z])/, 'password must contain at least one lowercase')
      .matches(/^(?=.*[0-9])^/, 'password must contain at least one number')
      .matches(/^(?=.*[!@#\$%\^&\*])^/, 'password must contain at least one character')
  })
  .required();

export const RegisterPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, isLoading, mutate } = useRegisterMutation<RegisterMutation, Error>(
    getGraphQLRequestClient(false),
    {
      onSuccess: (result) => {
        const { user, jwt } = result.register;

        if (user && jwt) {
          dispatch(userActions.login(jwt));
          dispatch(userActions.setUserData(user));
          navigate('/');
        }
      },
      onError: () => {
        const errorObject: ClientError = JSON.parse(JSON.stringify(error));

        if (errorObject.response && errorObject.response.errors) {
          const message = errorObject.response.errors[0].message;
          enqueueSnackbar(message, { variant: 'error' });
          return;
        }

        enqueueSnackbar('An error occured!', { variant: 'error' });
      }
    }
  );

  const {
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isValid, isValidating }
  } = useForm<UsersPermissionsRegisterInput>({
    defaultValues: { username: '', email: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: UsersPermissionsRegisterInput) => {
    const input: UsersPermissionsRegisterInput = {
      email: data.email,
      username: data.username,
      password: data.password
    };

    mutate({ input });
  };

  const [validatingUsername, setValidatingUsername] = useState(false);
  const handleValidateStart = () => {
    setValidatingUsername(true);
  };

  const handleValidateFinish = (taken: boolean) => {
    if (taken) {
      setError('username', { message: 'Username already taken' });
    }

    setValidatingUsername(false);
  };

  return (
    <div className='h-full w-full flex flex-col flex-auto items-center justify-center animated fadeIn'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full px-5 sm:w-96 sm:px-0 mx-auto'>
        <Card className='shadow-xl p-5 !rounded-lg w-full'>
          <CardContent className='!pb-0'>
            <div className='flex flex-col items-center justify-center w-full mb-10'>
              <Typography variant='h1' noWrap component='div' color='text-secondary'>
                ▢
              </Typography>

              <Typography variant='h4' fontWeight='500' color='text.primary'>
                Join us!
              </Typography>
            </div>

            <div className='bg-white flex flex-col justify-center items-center'>
              <UsernameInput
                control={control}
                value={getValues('username')}
                isValidating={validatingUsername}
                onValidateStart={handleValidateStart}
                onValidateFinish={handleValidateFinish}
              />

              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Email'
                    variant='outlined'
                    className='w-full !mb-3'
                    error={errors.email !== undefined}
                    helperText={errors.email && (errors.email?.message || 'This field is required')}
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
                    label='Password'
                    variant='outlined'
                    className='w-full !mb-5'
                    error={errors.password !== undefined}
                    helperText={
                      errors.password && (errors.password?.message || 'This field is required')
                    }
                  />
                )}
              />
            </div>
          </CardContent>

          <CardActions className='flex flex-col justify-center items-center'>
            <div className='px-2 w-full mb-5'>
              <LoadingButton
                type='submit'
                color='primary'
                variant='contained'
                size='large'
                className='w-full rounded-lg'
                disabled={!isValid || validatingUsername}
                loading={isLoading}
              >
                Register
              </LoadingButton>
            </div>

            <Typography className='font-medium'>
              Already have an account?{' '}
              <Link to='/login' className='text-sky-500'>
                Sign in!
              </Link>
            </Typography>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};
