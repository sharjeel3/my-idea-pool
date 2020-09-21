import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshToken } from '../../redux/actions/auth';

export const Auth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  return null;
};
