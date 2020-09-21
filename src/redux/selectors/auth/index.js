export const getLoginErrorMessage = store => store.auth.loginError;
export const getLoginSuccess = store => store.auth.loginSuccess;
export const isFetchUserInProgress = store => store.auth.fetchUserInProgress;
export const getJwt = store => store.auth.jwt;
export const getMyUserInfo = store => {
  const { name, email, avatarUrl } = store.auth;
  return {
    name,
    email,
    avatarUrl
  };
};
