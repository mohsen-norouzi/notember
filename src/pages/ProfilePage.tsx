import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, CardActions, CardContent, Icon, TextField, Typography } from '@mui/material';
import {
  UpdateMutation,
  UsersPermissionsUserInput,
  useUpdateMutation
} from 'graphql/generated/graphql-types';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useAppSelector } from 'redux/hooks';
import * as yup from 'yup';

const schema = yup.object({
  password: yup
    .string()
    .default('')
    .min(5)
    .required()
    .matches(/^(?=.*[A-Z])/, 'password must contain at least one uppercase')
    .matches(/^(?=.*[a-z])/, 'password must contain at least one lowercase')
    .matches(/^(?=.*[0-9])^/, 'password must contain at least one number')
    .matches(/^(?=.*[!@#\$%\^&\*])^/, 'password must contain at least one character')
});

export const ProfilePage = () => {
  const { userId, username } = useAppSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const { error, isLoading, mutate } = useUpdateMutation<UpdateMutation, Error>(
    getGraphQLRequestClient(),
    {
      onSuccess: () => {
        reset();
        enqueueSnackbar('Password successfully updated!.', { variant: 'success' });
      },
      onError: (error) => {
        enqueueSnackbar('Failed to update.', { variant: 'error' });
      }
    }
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isValidating }
  } = useForm<UsersPermissionsUserInput>({
    defaultValues: { username: '', email: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = (input: UsersPermissionsUserInput) => {
    const data: UsersPermissionsUserInput = {
      password: input.password
    };

    mutate({ data, id: userId });
  };

  return (
    <div className='w-full flex flex-col flex-auto items-center justify-center animated fadeIn'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full px-5 sm:w-96 sm:px-0 mx-auto'>
        <Card className='shadow-xl p-5 !rounded-lg w-full'>
          <CardContent className='!pb-0'>
            <div className='flex flex-col items-center justify-center w-full mb-10'>
              <Icon fontSize='large' className='mb-5'>
                person
              </Icon>

              <Typography variant='h4' fontWeight='500' color='text.primary'>
                {username}
              </Typography>
            </div>

            <div className='flex flex-col justify-center items-center'>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='password'
                    label='New Password'
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
                disabled={!isValid}
                loading={isLoading}
              >
                Change
              </LoadingButton>
            </div>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};
