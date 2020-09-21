export const getLoginErrorMessage = store => store.auth.loginError;
export const getLoginSuccess = store => store.auth.loginSuccess;
export const getMyUserInfo = store => {
  const { name, email, avatarUrl } = store.auth;
  return {
    name,
    email,
    avatarUrl
  };
};
