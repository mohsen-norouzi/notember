import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  LoginMutation,
  useLoginMutation,
  UsersPermissionsLoginInput
} from 'graphql/generated/graphql-types';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';
import { userActions } from 'redux/slices/user-slice';

type LoginType = {
  username: string;
  password: string;
};

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required()
  })
  .required();

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, error, isLoading, mutate } = useLoginMutation<LoginMutation, Error>(
    getGraphQLRequestClient(false),
    {
      onSuccess: (result) => {
        const { user, jwt } = result.login;

        if (user && jwt) {
          dispatch(userActions.login(jwt));
          dispatch(userActions.setUserData(user));
          navigate('/');
        }
      },
      onError: (err) => {
        console.log(err);
      }
    }
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginType>({
    defaultValues: { username: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: LoginType) => {
    const input: UsersPermissionsLoginInput = {
      identifier: data.username,
      password: data.password
    };

    mutate({ input });
  };

  return (
    <div className='h-full w-full flex flex-col flex-auto items-center justify-center animated fadeIn'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full px-5 sm:w-96 sm:px-0 mx-auto'>
        <Card className='shadow-xl p-5 !rounded-lg w-full '>
          <CardContent>
            <div className='flex flex-col items-center justify-center w-full mb-6'>
              <Typography variant='h1' noWrap component='div' color='text-secondary'>
                ▢
              </Typography>

              <Typography variant='h4' fontWeight='500' color='text.primary'>
                Login
              </Typography>
            </div>

            <div className='bg-white flex flex-col justify-center items-center'>
              <Controller
                name='username'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Username'
                    variant='outlined'
                    type='text'
                    autoFocus
                    className='w-full !mb-3'
                    error={errors.username !== undefined}
                    helperText={
                      errors.username && (errors.username?.message || 'This field is required')
                    }
                  />
                )}
              />

              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Password'
                    variant='outlined'
                    className='w-full'
                    type='password'
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
              <Button
                type='submit'
                color='primary'
                variant='contained'
                size='large'
                className='w-full rounded-lg'
                disabled={!isValid}
              >
                Login
              </Button>
            </div>

            <Typography className='font-medium'>
              No account?{' '}
              <Link to='/register' className='text-sky-500'>
                Create one!
              </Link>
            </Typography>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};
