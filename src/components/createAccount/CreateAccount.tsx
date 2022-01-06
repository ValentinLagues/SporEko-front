import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const CreateAccount = () => {
  return (
    <div className="create-account">
      <h2 className="create-account__h2">Créez votre compte</h2>
      <div className="create-account__h2__border"></div>
      <div className="create-account__left">
        <div className='create-account__left__input-radio'>
        <h3 >Profil</h3>
        <input className='create-account__left__input-radio__radio' type="radio" name="profil" />
        Particulier
        <input className='create-account__left__input-radio__radio' type="radio" name="profil" />
        Professionnel
        </div>
        <h3>Genre</h3>
        <input className='create-account__left__input-radio__radio' type="radio" name="genre" /> M
        <input className='create-account__left__input-radio__radio' type="radio" name="genre" /> Mme
        <input className='create-account__left__input-radio__radio' type="radio" name="genre" /> Autre
        
        <div className="create-account__register">
          <div className="create-account__register__title1">
            <label htmlFor="pseudo">Pseudo*</label>
          </div>
          <div className="create-account__register__title2">
            <input
              className="create-account__register__input"
              name="Pseudo"
              type="text"
              id="pseudo"
              placeholder="John64"
            />
          </div>
        </div>      
        <div className="create-account__register">
          <div className="create-account__register__title1">
            <label htmlFor="Prénom">Prénom*</label>
          </div>
          <div className="create-account__register__title2">
            <input
              className="create-account__register__input"
              name="Prénom"
              type="text"
              id="prenom"
              placeholder="John"
            />
          </div>
        </div>
        <div className="create-account__register">
          <div className="create-account__register__title1">
            <label htmlFor="Nom">Nom*</label>
          </div>
          <div className="create-account__register__title2">
            <input
              className="create-account__register__input"
              name="Nom"
              type="text"
              id="nom"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="create-account__register">
          <div className="create-account__register__title1">
            <label htmlFor="Email">Email*</label>
          </div>
          <div className="create-account__register__title2">
            <input
              className="create-account__register__input"
              name="email"
              type="email"
              id="email"
              placeholder="john.doe@live.fr"
            />
          </div>
        </div>
        <div className="create-account__register">
          <div className="create-account__register__title1">
            <label htmlFor="Mot de passe">Mot de passe*</label>
          </div>
          <div className="create-account__register__title2">
            <input
              className="create-account__register__input"
              name="mot de passe"
              type="password"
              id="password"
              placeholder="**********"
            />
          </div>
        </div>
        <div className="create-account__register">
          <div className="create-account__register__title1">
            <label htmlFor="Confirmation mot de passe">Confirmation mot de passe*</label>
          </div>
          <div className="create-account__register__title2">
            <input
              className="create-account__register__input"
              name="confirmation mot de passe"
              type="password"
              id="password"
              placeholder="**********"
            />
          </div>
        </div>
      </div>
      <div className="create-account__right"></div>
      <div className="create-account__register">
        <div className="create-account__register__title1">
          <label htmlFor="Date de naissance">Date de naissance*</label>
        </div>
        <div className="create-account__register__title2">
          <input
            className="create-account__register__input"
            name="date de naissance"
            type="date"
            id="date-of-birth"
            placeholder="01/01/1980"
          />
        </div>
      </div>
      <div className="create-account__register">
        <div className="create-account__register__title1">
          <label htmlFor="Numéro de téléphone">Numéro de téléphone*</label>
        </div>
        <div className="create-account__register__title2">
          <input
            className="create-account__register__input"
            name="numéro de téléphone"
            type="tel"
            id="phone"
            placeholder="06 00 00 00 00"
          />
        </div>
      </div>
      <div className="create-account__register">
        <div className="create-account__register__title1">
          <label htmlFor="Adresse">Adresse*</label>
        </div>
        <div className="create-account__register__title2">
          <input
            className="create-account__register__input"
            name="adresse"
            type="text"
            id="adresse"
            placeholder="5 Rue Marcel Pagnol"
          />
        </div>
      </div>
      <div className="create-account__register">
        <div className="create-account__register__title1">
          <label htmlFor="complement-d-adresse">Complément d&rsquo;adresse</label>
        </div>
        <div className="create-account__register__title2">
          <input
            className="create-account__register__input"
            name="complément d'adresse"
            type="text"
            id="complement-adresse"
            placeholder="Complément d'adresse"
          />
        </div>
      </div>
      <div className="create-account__register">
        <div className="create-account__register__title1">
          <label htmlFor="code postal">Code postal*</label>
        </div>
        <div className="create-account__register__title2">
          <input
            className="create-account__register__input"
            name="code postal"
            type="text"
            id="code-postal"
            placeholder="13012"
          />
        </div>
      </div>
      <div className="create-account__register">
        <div className="create-account__register__title1">
          <label htmlFor="Ville">Ville*</label>
        </div>
        <div className="create-account__register__title2">
          <input
            className="create-account__register__input"
            name="ville"
            type="text"
            id="ville"
            placeholder="Marseille"
          />
        </div>
      </div>
      <button type="submit" className="btn createAccount__form__submit">
        Se connecter
      </button>
    </div>
  );
};

export default CreateAccount;