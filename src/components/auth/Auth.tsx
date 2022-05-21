import { MeQuery, useMeQuery } from 'graphql/generated/graphql-types';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appActions } from 'redux/app-slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

type AuthProps = {
  children?: React.ReactNode;
};

export const Auth: FC<AuthProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.app.token);

  const { data, error, isLoading } = useMeQuery<MeQuery, Error>(
    getGraphQLRequestClient(),
    {},
    {
      onError: (err) => {
        const errorObject = JSON.parse(JSON.stringify(error));
        console.log('ME On Error --->', errorObject);
      },
      retry: (failureCount, error) => {
        const errorObject = JSON.parse(JSON.stringify(error));

        // unauthorized access
        if (errorObject.response.error && errorObject.response.error.status === 401) {
          console.log('ME On Error ---> unauthorized access');
          dispatch(appActions.logout());
          navigate('/login');
          return false;
        }

        console.log('retrying', error);
        return true;
      },
      onSuccess: () => {
        navigate('/');
      }
    }
  );

  useEffect(() => {
    if (token === '') {
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    dispatch(appActions.authenticate());
  }, []);

  if (isLoading) {
    return <p>Authenticating...</p>;
  }

  return <>{props.children}</>;
};
