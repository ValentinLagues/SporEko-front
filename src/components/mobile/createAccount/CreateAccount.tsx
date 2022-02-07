import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiMap } from 'react-icons/fi';
import { HiEye, HiOutlineUserRemove } from 'react-icons/hi';
import { ImCancelCircle, ImCheckmark, ImKey } from 'react-icons/im';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

import ICountry from '../../../interfaces/ICountry';
import IUser from '../../../interfaces/IUser';
import IUserLog from '../../../interfaces/IUser';

const urlBack = import.meta.env.VITE_URL_BACK;

const CreateAccount = () => {
  const [hiEye, setHiEye] = useState<boolean>(true);
  const [hiEye2, setHiEye2] = useState<boolean>(true);
  const [pseudo, setPseudo] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [goodEntryVerifyPassword, setGoodEntryVerifyPassword] = useState<number>(0);
  const [goodEntryPassword, setGoodEntryPassword] = useState<number>(0);
  const [messageError, setMessageError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [profil, setProfil] = useState<Number>(0);
  const [gender, setGender] = useState<Number>();
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [user, setUser] = useState<IUserLog>();
  const navigate = useNavigate();

  // UseEffect to admin right format of password .
  useEffect(() => {
    if (password?.length != undefined && password.length > 7) {
      setGoodEntryPassword(1);
    } else if (password?.length != undefined && password.length > 0) {
      setGoodEntryPassword(2);
    } else {
      setGoodEntryPassword(0);
    }
  }, [password]);

  // UseEffect for verify the concordance of password
  useEffect(() => {
    if (
      password === confirmPassword &&
      confirmPassword?.length != undefined &&
      confirmPassword.length > 0
    ) {
      setGoodEntryVerifyPassword(1);
    } else if (
      confirmPassword?.length != undefined &&
      password != confirmPassword &&
      confirmPassword.length > 0
    ) {
      setGoodEntryVerifyPassword(2);
    } else {
      setGoodEntryVerifyPassword(0);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    axios.get<ICountry[]>(`${urlBack}/countries`).then((res) => setCountries(res.data));
  }, []);

  const handleSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    const newUser = {
      pseudo,
      lastname,
      firstname,
      email,
      password,
      id_country: Number(country),
      id_gender: Number(gender),
      is_professional: Number(profil),
    } as IUser;
    setUser(newUser);
  };

  useEffect(() => {
    user &&
      axios
        .post<IUser>(`${urlBack}/users`, user)
        .then((res) => res && navigate('/'))
        .catch((err) => {
          if (err.response.data.message === 'Pseudo already exists') {
            setMessage('');
            setMessageError("Ce pseudo n'est pas disponible!");
          } else if (err.response.data.message === 'Email already exists') {
            setMessage('');
            setMessageError('Cette adresse e-mail est déjà utilisée');
          } else {
            console.log({ ...err });
          }
        });
  }, [user]);

  return (
    <div className="create-account">
      <h2>Créez votre compte</h2>
      <form
        id="create-account"
        onSubmit={(e: React.FormEvent) => handleSubmit(e)}
        className="create-account__form"
        action="">
        <div className="create-account__form__inputsContainer">
          <div className="create-account__form__inputsContainer__input">
            <HiOutlineUserRemove className="inputIcon" />
            <input
              required
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              name="Pseudo"
              title="Ce champ est obligatoire"
              type="text"
              id="pseudo"
              placeholder="Choisissez un pseudo*"
            />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <CgProfile className="inputIcon" />
            <input
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              name="Prénom"
              title="Ce champ est obligatoire"
              type="text"
              id="prenom"
              placeholder="Votre prénom*"
            />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <CgProfile className="inputIcon" />
            <input
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              name="Nom"
              title="Ce champ est obligatoire"
              type="text"
              id="nom"
              placeholder="Votre nom*"
            />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <MdOutlineEmail className="inputIcon" />
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              title="Ce champ est obligatoire"
              type="email"
              id="email"
              placeholder="Votre email*"
            />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <RiLockPasswordLine className="inputIcon" />
            {goodEntryPassword === 1 && (
              <ImCheckmark
                style={{
                  zIndex: 1,
                  right: '10vw',
                  position: 'absolute',
                  color: 'green',
                }}
              />
            )}
            {goodEntryPassword === 2 && (
              <ImCancelCircle
                style={{
                  zIndex: 1,
                  right: '10vw',
                  position: 'absolute',
                  color: 'red',
                }}
              />
            )}
            <input
              required
              value={password}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPassword(e.currentTarget.value)
              }
              name="mot de passe"
              minLength={8}
              type={`${hiEye ? 'password' : 'text'}`}
              id="password"
              title="Ce champ est obligatoire"
              placeholder="Mot de passe*"
            />
            <HiEye className="inputIcon right" onClick={() => setHiEye(!hiEye)} />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <ImKey className="inputIcon" />
            {goodEntryVerifyPassword === 1 && (
              <ImCheckmark
                style={{
                  zIndex: 1,
                  right: '10vw',
                  position: 'absolute',
                  color: 'green',
                }}
              />
            )}
            {goodEntryVerifyPassword === 2 && (
              <ImCancelCircle
                style={{
                  zIndex: 1,
                  right: '10vw',
                  position: 'absolute',
                  color: 'red',
                }}
              />
            )}
            <input
              required
              value={confirmPassword}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setConfirmPassword(e.currentTarget.value)
              }
              name="confirmation mot de passe"
              type={`${hiEye2 ? 'password' : 'text'}`}
              id="confirmPassword"
              title="Ce champ est obligatoire"
              placeholder="Confirmation mot de passe*"
            />
            <HiEye className="inputIcon right" onClick={() => setHiEye2(!hiEye2)} />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <FiMap className="inputIcon" />
            <select
              required
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              title="Ce champ est obligatoire"
              name="countries"
              id="countries">
              <option value="">Pays*</option>
              {countries &&
                countries.map((country, index) => (
                  <option key={index} value={country.id_country}>
                    {country.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="btn__container">
          <h3 className="btn__container__title" title="Ce champ est obligatoire">
            Profil
          </h3>
          <div className="btn__container__profil">
            <input
              defaultChecked
              required
              value="Particulier"
              onChange={() => setProfil(Number(0))}
              type="radio"
              id=""
              name="profil"
            />
            Particulier
          </div>
          <div className="btn__container__profil">
            <input
              value="Professionnel"
              onChange={() => setProfil(Number(1))}
              type="radio"
              id=""
              name="profil"
            />
            Professionnel
          </div>
        </div>
        <div className="btn__container">
          <h3 className="btn__container__title" title="Ce champ est obligatoire">
            Genre
          </h3>
          <div className="btn__container__genre">
            <input
              value="Femme"
              onChange={() => setGender(Number(1))}
              type="radio"
              id=""
              name="genre"
            />
            Femme
          </div>
          <div className="btn__container__genre">
            <input
              value="Homme"
              onChange={() => setGender(Number(2))}
              type="radio"
              id=""
              name="genre"
            />
            Homme
          </div>
          <div className="btn__container__genre">
            <input
              defaultChecked
              value="Neutre"
              onChange={() => setGender(Number(3))}
              type="radio"
              id=""
              name="genre"
            />
            Neutre
          </div>
        </div>
        <div className="checkboxCgv__createAccount">
          <input className="checkboxCgv__createAccount__input" required type="checkbox" />
          <div className="checkboxCgv__createAccount__label">
            En créant votre compte vous acceptez notre
            <a href="#!">politique de confidentialité</a>
          </div>
        </div>
        {message != '' && <p style={{ color: 'green' }}>{message}</p>}
        {messageError != '' && <p style={{ color: 'red' }}>{messageError}</p>}
        <button type="submit" className="btn__createAccount">
          S&rsquo;inscrire
        </button>
        <div className="containerSignin">
          Vous avez déjà un compte ? <Link to="/connection">Connectez-vous</Link>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
