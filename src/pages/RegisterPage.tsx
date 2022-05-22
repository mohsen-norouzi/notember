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
    <div className='h-full w-full flex flex-col flex-auto items-center justify-center animated fadeInUp'>
      <Card sx={{ borderRadius: '1rem' }} className='shadow-xl'>
        <CardContent>
          <div className='flex flex-col items-center justify-center gap-5 w-full mb-5'>
            <CardMedia component='img' src={logoImage} alt='logo' sx={{ width: 45 }}></CardMedia>
            <Typography variant='h5'>Create an account</Typography>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white flex flex-col justify-center items-center gap-2'
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
          </form>
        </CardContent>

        <CardActions className='justify-center'>
          <Button type='submit' size='medium'>
            Register
          </Button>
        </CardActions>
      </Card>

      <div className='mt-5'>
        <span>Already have an account? </span>
        <Link to='/login'>Sign in!</Link>
      </div>
    </div>
  );
};
