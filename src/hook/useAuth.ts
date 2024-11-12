import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

const useAuth = () => {
  const { loginWithRedirect, logout, getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState<boolean>(false);
  const [authErr, setAuthErr] = useState<any>(null);

  const getToken = async () => {
    setLoading(true);
    setAuthErr(null);

    try {
      const token = await getAccessTokenSilently();
      // console.log(token);
      return token;
    } catch (error: any) {
      console.error(`Error occurs while getting token: ${error}`);
      setAuthErr(error);
    } finally {
      setLoading(false);
    }
  }

  const login = async () => {
    setLoading(true);
    setAuthErr(null);

    try {
      await loginWithRedirect();
    } catch (error: any) {
      console.error(`Error occurs while logging in: ${error}`);
      setAuthErr(error);
    } finally {
      setLoading(false);
    }
  }

  const signup = async () => {
    setLoading(true);
    setAuthErr(null);

    try {
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup'
        }
      });
    } catch (error: any) {
      console.error(`Error occurs while signing up: ${error}`);
      setAuthErr(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    authErr,
    user,
    isAuthenticated,
    login,
    signup,
    getToken,
    logout
  }

}

export default useAuth;