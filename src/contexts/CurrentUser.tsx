import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

import IUserLog from '../interfaces/IUser';

type UserContent = {
  user: string[] | any;
  setUser: React.Dispatch<React.SetStateAction<object>>;
  accepted: boolean;
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>;
  pseudo: string | null;
  id: string | null;
  admin: string | null;
  logout: () => void;
};

type Props = { children: Element };

const CurrentUserContext = createContext<UserContent>({
  user: {},
  setUser: () => {},
  accepted: false,
  setAccepted: () => {},
  pseudo: '',
  id: '',
  admin: '',
  logout: () => {},
});

export const CurrentUserContextProvider: React.FC<Props> = ({ children }) => {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [user, setUser] = useState<IUserLog | any>('');
  const pseudo = sessionStorage.getItem('pseudo');
  const id = sessionStorage.getItem('id');
  const admin = sessionStorage.getItem('admin');
  const deleteCookie = useCookies(['user_token'])[2];

  const logout = (): void => {
    localStorage.clear();
    sessionStorage.clear();
    setAccepted(false);
    deleteCookie('user_token');
  };

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        setUser,
        accepted,
        setAccepted,
        pseudo,
        id,
        admin,
        logout,
      }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
