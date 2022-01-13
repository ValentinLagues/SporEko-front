import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

type UserContent = {
  accepted: boolean;
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>;
  pseudo: string | null;
  id: string | null;
  admin: string | null;
  logout: () => void;
};

type Props = { children: JSX.Element };

const CurrentUserContext = createContext<UserContent>({
  accepted: false,
  setAccepted: () => {},
  pseudo: '',
  id: '',
  admin: '',
  logout: () => {},
});

export const CurrentUserContextProvider: React.FC<Props> = ({ children }) => {
  const [accepted, setAccepted] = useState<boolean>(false);
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
