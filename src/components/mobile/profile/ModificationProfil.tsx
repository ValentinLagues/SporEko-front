import axios from 'axios';
import React, { useContext, useState } from 'react';

import CurrentUserContext from '../../../contexts/CurrentUser';
import IUserLog from '../../../interfaces/IUser';
import HeaderProfil from '../layout/HeaderProfil';

const ModificationProfil = () => {
  const { user, id } = useContext(CurrentUserContext);
  const [pseudo, setPseudo] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [adress, setAdress] = useState<string>('');
  const [adress_complement, setAdress_complement] = useState<string>('');
  const [zipcode, setZipcode] = useState<number>();
  const [city, setCity] = useState<string>('');
  const [picture, setPicture] = useState<string>('');
  const [id_country, setId_country] = useState<string>('');
  const [phone, setPhone] = useState<number>();
  const [email, setEmail] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [id_gender, setId_gender] = useState<string>('');
  const [id_athletic, setId_athletic] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyPassword, setVerifyPassword] = useState<string>('');
  const [hiEye, setHiEye] = useState<boolean>(true);
  const urlBack = 'http://localhost:8000/';

  const updatedUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === verifyPassword) {
      axios
        .post<IUserLog>(
          `${urlBack}users/${id}`,
          {
            lastname,
            firstname,
            adress,
            zipcode,
            city,
            email,
            password,
            picture,
            id_gender,
            id_country,
            adress_complement,
            id_athletic,
            birthday,
            picture,
            phone,
            pseudo,
          },
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        )
        .then((response) => response.data)
        .catch((err) => console.error(err));
    } else {
      <p>le mot de passe ne correspond pas</p>;
    }
  };

  return (
    <div className="modificationProfil">
      <HeaderProfil />
      <form
        action=""
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => updatedUser(e)}
        className="modificationProfil__container">
        <div className="modificationProfil__container__content">
          <label htmlFor="Pseudo">Pseudo:&nbsp;</label>
          <input
            name="Pseudo"
            type="text"
            placeholder={user.pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="Prénom">Prénom:&nbsp;</label>
          <input
            name="Prénom"
            type="text"
            placeholder={user.firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="Nom">Nom:&nbsp;</label>
          <input
            name="Nom"
            type="text"
            placeholder={user.lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="Adresse">Adresse:&nbsp;</label>
          <input
            name="Adresse"
            type="text"
            placeholder={user.adress}
            onChange={(e) => setAdress(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="Adresse complément">Adresse bis:&nbsp;</label>
          <input
            name="Adresse complément"
            type="text"
            placeholder={user.adress_complement}
            onChange={(e) => setAdress_complement(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="Code postal">Code postal:&nbsp;</label>
          <input
            name="Code postal"
            type="text"
            placeholder={user.zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="Ville">Ville:&nbsp;</label>
          <input
            name="Ville"
            type="text"
            placeholder={user.city}
            onChange={(e) => setCity(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="Pays">Pays:&nbsp;</label>
          <select
            name="Pays"
            defaultValue={user.country}
            onChange={(e) => setId_country(e.target.value)}>
            <option>Pays</option>
          </select>
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="email">Email:&nbsp;</label>
          <input
            name="Email"
            type="text"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="MDP">MDP:&nbsp;</label>
          <input
            name="MDP"
            placeholder="***********"
            type={`${hiEye ? 'password' : 'text'}`}
            value={user.password}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="MDP verification">MDP(2):&nbsp;</label>
          <input
            name="MDP verification"
            placeholder="***********"
            type={`${hiEye ? 'password' : 'text'}`}
            value={user.password}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setVerifyPassword(e.currentTarget.value)
            }
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="Téléphone">Téléphone:&nbsp;</label>
          <input
            name="Téléphone"
            type="text"
            placeholder={user.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="Date de naissance">Date de naissance:&nbsp;</label>
          <input
            name="Date de naissance"
            type="date"
            onChange={(e) => setBirthday(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="Genre">Sportif:&nbsp;</label>
          <select name="Genre" defaultValue={user.id_gender}>
            <option
              value={user.id_gender}
              onChange={(e) => setId_athletic(e.target.value)}>
              {user.id_gender}
            </option>
          </select>
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <label htmlFor="Genre">Genre:&nbsp;</label>
          <select name="Genre" defaultValue={user.id_athletic}>
            <option
              value={user.id_athletic}
              onChange={(e) => setId_gender(e.target.value)}>
              {user.id_athletic}
            </option>
          </select>
          <hr />
        </div>
        <button type="submit">Modifier vos données</button>
      </form>
    </div>
  );
};

export default ModificationProfil;
