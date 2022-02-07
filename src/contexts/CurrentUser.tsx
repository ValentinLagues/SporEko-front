import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

type UserContent = {
  accepted: boolean;
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>;
  pseudo: string;
  setPseudo: React.Dispatch<React.SetStateAction<string>>;
  lastname: string;
  setLastname: React.Dispatch<React.SetStateAction<string>>;
  firstname: string;
  setFirstname: React.Dispatch<React.SetStateAction<string>>;
  picture: string;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
  idUser: number;
  setIdUser: React.Dispatch<React.SetStateAction<number>>;
  admin: number;
  setAdmin: React.Dispatch<React.SetStateAction<number>>;
  logout: () => void;
};

type Props = { children: React.ReactNode };

const CurrentUserContext = createContext<UserContent>({
  accepted: false,
  setAccepted: () => {},
  pseudo: '',
  setPseudo: () => {},
  lastname: '',
  setLastname: () => {},
  firstname: '',
  setFirstname: () => {},
  picture: '',
  setPicture: () => {},
  idUser: 0,
  setIdUser: () => {},
  admin: 0,
  setAdmin: () => {},
  logout: () => {},
});

export const CurrentUserContextProvider: React.FC<Props> = ({ children }) => {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [pseudo, setPseudo] = useState<string>(
    sessionStorage.getItem('pseudo') as string,
  );
  const [idUser, setIdUser] = useState<number>(Number(sessionStorage.getItem('id')));
  const [firstname, setFirstname] = useState<string>(
    sessionStorage.getItem('firstname') as string,
  );
  const [lastname, setLastname] = useState<string>(
    sessionStorage.getItem('lastname') as string,
  );
  const [picture, setPicture] = useState<string>(
    sessionStorage.getItem('picture') as string,
  );
  const [admin, setAdmin] = useState<number>(
    Number(sessionStorage.getItem('admin')) as number,
  );
  const deleteCookie = useCookies(['user_token'])[2];

  const logout = (): void => {
    setPseudo('');
    setAdmin(0);
    setIdUser(0);
    setPicture('');
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
        setPseudo,
        lastname,
        setLastname,
        firstname,
        setFirstname,
        picture,
        setPicture,
        idUser,
        setIdUser,
        admin,
        setAdmin,
        logout,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
