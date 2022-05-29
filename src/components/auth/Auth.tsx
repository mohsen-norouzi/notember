import { CircularProgress } from '@mui/material';
import { MeQuery, useMeQuery } from 'graphql/generated/graphql-types';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';
import React, { FC, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { userActions } from 'redux/slices/user-slice';

type AuthProps = {
  children?: React.ReactNode;
};

const noRetryPages = ['/register', '/login'];
const shouldRetryOnFocus = (pathName: string) => {
  if (noRetryPages.indexOf(pathName) === -1) {
    return true;
  }

  return false;
};

export const Auth: FC<AuthProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { token, authenticated } = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();

  const { error, isFetching, refetch } = useMeQuery<MeQuery, Error>(
    getGraphQLRequestClient(),
    {},
    {
      onError: () => {},
      retry: (failureCount, error) => {
        const errorObject = JSON.parse(JSON.stringify(error));

        // unauthorized access
        if (errorObject.response.error && errorObject.response.error.status === 401) {
          dispatch(userActions.logout());

          if (shouldRetryOnFocus(location.pathname)) {
            navigate('/login');
          }
        }

        return false;
      },
      onSuccess: (data) => {
        if (data && data.me) {
          dispatch(userActions.setUserData(data.me));
        }

        navigate('/');
      },
      refetchOnWindowFocus: false
    }
  );

  useEffect(() => {
    if (token === '' && shouldRetryOnFocus(location.pathname)) {
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    dispatch(userActions.authenticate());
  }, []);

  useEffect(() => {
    queryClient.cancelQueries(['Me']);
    refetch();
  }, [authenticated]);

  if (isFetching) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <CircularProgress />
      </div>
    );
  }

  return <>{props.children}</>;
};
