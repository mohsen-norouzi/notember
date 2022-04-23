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

export const LoginPage = () => {
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
      <Card sx={{ borderRadius: '1rem' }} className='shadow-xl animated fadeInUp'>
        <CardContent>
          <div className='flex flex-col items-center justify-center gap-5 w-full mb-5'>
            <CardMedia component='img' src={logoImage} alt='logo' sx={{ width: 45 }}></CardMedia>
            <Typography variant='h5'>Login to your account</Typography>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white flex flex-col justify-center items-center gap-2'
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
          </form>
        </CardContent>

        <CardActions className='justify-center'>
          <Button type='submit' size='medium'>
            Login
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
