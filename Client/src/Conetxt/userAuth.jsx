
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = Cookies.get('accessToken');
    if (storedToken) {
      setToken(storedToken);
      // You might need to fetch the user data using the token
      // fetchUser(storedToken).then(setUser);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setToken(null);
    setUser(null);
  };

  if (loading) {
    return null; // You might want to return a loading spinner here
  }

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const userAuth = () => useContext(UserContext);

export default UserProvider;
