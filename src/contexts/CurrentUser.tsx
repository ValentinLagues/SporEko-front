import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

type UserContent = {
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
  pseudo: string;
  setPseudo: React.Dispatch<React.SetStateAction<string>>;
  admin: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
};

type Props = { children: Element };

const CurrentUserContext = createContext<UserContent>({
  id: 0,
  setId: () => {},
  pseudo: '',
  setPseudo: () => {},
  logout: () => {},
  admin: false,
  setAdmin: () => {},
});

export const CurrentUserContextProvider: React.FC<Props> = ({ children }) => {
  const [id, setId] = useState<number>(0);
  const [pseudo, setPseudo] = useState<string>('');
  const [admin, setAdmin] = useState<boolean>(false);
  const removeCookie = useCookies(['user_token'])[2];
  const logout = (): void => {
    setId(0);
    setPseudo('');
    setAdmin(false);
    removeCookie('user_token');
  };

  return (
    <CurrentUserContext.Provider
      value={{
        id,
        setId,
        pseudo,
        setPseudo,
        logout,
        admin,
        setAdmin,
      }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
