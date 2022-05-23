import { MeQuery, useMeQuery } from 'graphql/generated/graphql-types';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';
import React, { FC, useEffect } from 'react';
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
  const token = useAppSelector((state) => state.user.token);

  const { data, error, isLoading } = useMeQuery<MeQuery, Error>(
    getGraphQLRequestClient(),
    {},
    {
      onError: (err) => {
        const errorObject = JSON.parse(JSON.stringify(error));
      },
      retry: (failureCount, error) => {
        const errorObject = JSON.parse(JSON.stringify(error));

        // unauthorized access
        if (errorObject.response.error && errorObject.response.error.status === 401) {
          dispatch(userActions.logout());

          if (shouldRetryOnFocus(location.pathname)) {
            navigate('/login');
          }

          return false;
        }

        console.log('retrying', error);
        return true;
      },
      onSuccess: (data) => {
        if (data && data.me) {
          dispatch(userActions.setUserData(data.me));
        }
        navigate('/');
    },
      refetchOnWindowFocus: shouldRetryOnFocus(location.pathname)
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

  if (isLoading) {
    return <p>Authenticating...</p>;
  }

  return <>{props.children}</>;
};
