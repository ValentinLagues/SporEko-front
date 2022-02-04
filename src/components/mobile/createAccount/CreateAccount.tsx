import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiMap } from 'react-icons/fi';
import { HiEye, HiOutlineUserRemove } from 'react-icons/hi';
import { ImKey } from 'react-icons/im';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import ICountry from '../../../interfaces/ICountry';
import IUserLog from '../../../interfaces/IUser';

const urlBack = import.meta.env.VITE_URL_BACK;

const CreateAccount = () => {
  const [hiEye, setHiEye] = useState(true);
  const [hiEye2, setHiEye2] = useState(true);
  const [pseudo, setPseudo] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [profil, setProfil] = useState<Number>(0);
  const [gender, setGender] = useState<Number>();
  const [countriesList, setCountriesList] = useState<ICountry[]>([]);
  const [user, setUser] = useState<IUserLog>();

  useEffect(() => {
    axios.get(`${urlBack}/countries`).then((res) => setCountriesList(res.data));
  }, []);

  const handleSubmit = () => {
    const newUser = {
      pseudo,
      lastname,
      firstname,
      email,
      password,
      id_country: Number(country),
      id_gender: Number(gender),
      is_professional: Number(profil),
    } as IUserLog;
    setUser(newUser);
  };

  useEffect(() => {
    user &&
      axios
        .post<IUserLog>(`${urlBack}/users`, user)
        .then((res) => res)
        .catch((err) => console.log(err));
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
            <input
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
            <input
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
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              title="Ce champ est obligatoire"
              name="countries"
              id="countries">
              <option value="">Pays*</option>
              {countriesList &&
                countriesList.map((country, index) => (
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
            />{' '}
            Femme
          </div>
          <div className="btn__container__genre">
            <input
              value="Homme"
              onChange={() => setGender(Number(2))}
              type="radio"
              id=""
              name="genre"
            />{' '}
            Homme
          </div>
          <div className="btn__container__genre">
            <input
              value="Neutre"
              onChange={() => setGender(Number(3))}
              type="radio"
              id=""
              name="genre"
            />{' '}
            Neutre
          </div>
        </div>
        <div className="checkboxCgv__createAccount">
          <input className="checkboxCgv__createAccount__input" type="checkbox" />
          <div className="checkboxCgv__createAccount__label">
            En créant votre compte vous acceptez notre
            <a href="#!">politique de confidentialité</a>
          </div>
        </div>
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
