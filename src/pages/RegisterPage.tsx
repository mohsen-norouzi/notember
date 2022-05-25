import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import logoImage from 'assets/images/logo.png';
import {
  RegisterMutation,
  useRegisterMutation,
  UsersPermissionsRegisterInput
} from 'graphql/generated/graphql-types';
import { Link, useNavigate } from 'react-router-dom';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';

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
    getGraphQLRequestClient(false),
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
    <div className='h-full w-full flex flex-col flex-auto items-center justify-center animated fadeIn'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full px-5 sm:w-96 sm:px-0 mx-auto'>
        <Card className='shadow-xl p-5 !rounded-lg w-full'>
          <CardContent className='!pb-0'>
            <div className='flex flex-col items-center justify-center w-full mb-10'>
              <Typography variant='h1' noWrap component='div' color='text-secondary'>
                ▢
              </Typography>

              <Typography variant='h4' fontWeight='500' color='text.primary'>
                Register
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
                    autoFocus
                    className='w-full !mb-3'
                  />
                )}
              />

              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField {...field} label='Email' variant='outlined' className='w-full !mb-3' />
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
              >
                Register
              </Button>
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
