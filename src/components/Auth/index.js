import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshAccessToken } from '../../redux/actions/auth';

export const Auth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);
  return null;
};
