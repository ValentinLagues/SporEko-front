import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { HiEye, HiOutlineUserRemove } from 'react-icons/hi';
import { ImKey } from 'react-icons/im';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

const CreateAccount = () => {
  const [hiEye, setHiEye] = useState(true);
  // const [hiEyeConfirm, setHiEyeConfirm] = useState(true);

  return (
    <div className="create-account">
      <h2>Créez votre compte</h2>
      <form className="create-account__form" action="">
        <div className="create-account__form__inputsContainer">
          <div className="create-account__form__inputsContainer__input">
            <HiOutlineUserRemove className="inputIcon" />
            <input
              name="Pseudo"
              type="text"
              id="pseudo"
              placeholder="Choisissez un pseudo"
            />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <CgProfile className="inputIcon" />
            <input name="Prénom" type="text" id="prenom" placeholder="Votre prénom" />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <CgProfile className="inputIcon" />
            <input name="Nom" type="text" id="nom" placeholder="Votre nom" />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <MdOutlineEmail className="inputIcon" />
            <input name="email" type="email" id="email" placeholder="Votre email" />
          </div>
          <div className="create-account__form__inputsContainer__input">
            <RiLockPasswordLine className="inputIcon" />
            <input
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
              name="confirmation mot de passe"
              type={`${hiEye ? 'password' : 'text'}`}
              id="password"
              placeholder="Confirmation mot de passe"
            />
            <HiEye className="inputIcon right" onClick={() => setHiEye(!hiEye)} />
          </div>
        </div>
      </form>
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
        <p>
          Vous avez déjà un compte? <a href="/Connection">Connectez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
