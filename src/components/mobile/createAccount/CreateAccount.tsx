// import axios from 'axios';
import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { HiEye, HiOutlineUserRemove } from 'react-icons/hi';
import { ImKey } from 'react-icons/im';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

// import IUserLog from '../../../interfaces/IUser';

// const urlBack = 'http://localhost:8000/';

const CreateAccount = () => {
  const [hiEye, setHiEye] = useState(true);
  const [pseudo, setPseudo] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [country, setCountry] = useState('');
  // const [profil, setProfil] = useState('');
  // const [gender, setGender] = useState('');
  // const [user, setUser] = useState('');

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const newUser = {
  //     pseudo,
  //     lastname,
  //     firstname,
  //     email,
  //     password,
  //   } as IUserLog;
  //   console.log(newUser);
  //   setUser(IUser);
  // };

  // useEffect(() => {
  //   user && axios.post<IUserLog>(`${urlBack}users`, user).then((rep) => console.log(rep));
  // }, [user]);

  return (
    <div className="create-account">
      <h2>Créez votre compte</h2>
      <form id="create-account" className="create-account__form" action="">
        <div className="create-account__form__inputsContainer">
          <div className="create-account__form__inputsContainer__input">
            <HiOutlineUserRemove className="inputIcon" />
            <input
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              name="Pseudo"
              type="text"
              id="pseudo"
              placeholder="Choisissez un pseudo"
            />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <CgProfile className="inputIcon" />
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              name="Prénom"
              type="text"
              id="prenom"
              placeholder="Votre prénom"
            />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <CgProfile className="inputIcon" />
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              name="Nom"
              type="text"
              id="nom"
              placeholder="Votre nom"
            />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <MdOutlineEmail className="inputIcon" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              id="email"
              placeholder="Votre email"
            />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <RiLockPasswordLine className="inputIcon" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="mot de passe"
              type={`${hiEye ? 'password' : 'text'}`}
              id="password"
              placeholder="Mot de passe"
            />
            <HiEye className="inputIcon right" onClick={() => setHiEye(!hiEye)} />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <ImKey className="inputIcon" />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmation mot de passe"
              type={`${hiEye ? 'password' : 'text'}`}
              id="password"
              placeholder="Confirmation mot de passe"
            />
            <HiEye className="inputIcon right" onClick={() => setHiEye(!hiEye)} />
          </div>
        </div>
      </form>
      <div>
        <select
          // onChange={(e) => setCountry(e.target.value)}
          // value={country}
          className="offerForm__select"
          name="countries"
          id="countries">
          <option value="">Pays</option>
        </select>
      </div>
      <div className="btn__container">
        <h3 className="btn__container__title">Profil</h3>
        <div className="btn__container__profil">
          <input type="radio" id="" name="profil" checked />
          <label htmlFor="radio-one">Particulier</label>
        </div>
        <div className="btn__container__profil">
          <input type="radio" id="" name="profil" />
          Professionnel
        </div>
      </div>
      <div className="btn__container">
        <h3 className="btn__container__title">Genre</h3>
        <div className="btn__container__genre">
          <input type="radio" id="" name="genre" /> Homme
        </div>
        <div className="btn__container__genre">
          <input type="radio" id="" name="genre" /> Femme
        </div>
        <div className="btn__container__genre">
          <input type="radio" id="" name="genre" /> Neutre
        </div>
      </div>
      <div className="checkboxCgv__createAccount">
        <input className="checkboxCgv__createAccount__input" type="checkbox" />
        <label className="checkboxCgv__createAccount__label">
          {' '}
          En créant votre compte vous acceptez notre{' '}
          <a href="#!">politique de confidentialité</a>
        </label>
      </div>
      <button type="submit" className="btn__createAccount">
        S&rsquo;inscrire
      </button>
      <div className="containerSignin">
        Vous avez déjà un compte? <Link to="/connection">Connectez-vous</Link>
      </div>
    </div>
  );
};

export default CreateAccount;
