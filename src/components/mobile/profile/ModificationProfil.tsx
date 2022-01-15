import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BiRun } from 'react-icons/Bi';
import { BsGenderAmbiguous, BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import {
  FiCalendar,
  FiFile,
  FiHome,
  FiKey,
  FiLock,
  FiMail,
  FiMap,
  FiMapPin,
  FiMeh,
  FiPhone,
  FiPlus,
  FiUserMinus,
} from 'react-icons/fi';
import { HiEye } from 'react-icons/hi';

import CurrentUserContext from '../../../contexts/CurrentUser';
import IUserLog from '../../../interfaces/IUser';
import HeaderProfil from '../layout/HeaderProfil';

const ModificationProfil = () => {
  const { user, id } = useContext(CurrentUserContext);
  const [gender, setGender] = useState<Array<any>>([]);
  const [athletic, setAthletic] = useState<Array<any>>([]);
  const [country, setCountry] = useState<Array<any>>([]);
  const [pseudo, setPseudo] = useState<string | undefined>();
  const [lastname, setLastName] = useState<string | undefined>();
  const [firstname, setFirstname] = useState<string | undefined>();
  const [adress, setAdress] = useState<string | undefined>();
  const [adress_complement, setAdress_complement] = useState<string>();
  const [zipcode, setZipcode] = useState<number | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [picture, setPicture] = useState<number | undefined>();
  const [id_country, setId_country] = useState<string | undefined>();
  const [phone, setPhone] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [birthday, setBirthday] = useState<string | undefined>();
  const [id_gender, setId_gender] = useState<string | undefined>();
  const [id_athletic, setId_athletic] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [verifyPassword, setVerifyPassword] = useState<string | undefined>();
  const [hiEye, setHiEye] = useState<boolean>(true);
  const [hiEye2, setHiEye2] = useState<boolean>(true);

  const urlBack = import.meta.env.VITE_URL_BACK;

  const updatedUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === verifyPassword) {
      axios
        .put<IUserLog>(
          `${urlBack}/users/${id}`,
          {
            pseudo,
            lastname,
            firstname,
            adress,
            adress_complement,
            city,
            zipcode,
            picture,
            id_country,
            email,
            password,
            phone,
            birthday,
            id_gender,
            id_athletic,
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => res.data)
        .catch((err) => err);
    } else {
      <p>Mot de passe incorrect</p>;
    }
  };

  useEffect(() => {
    axios.get(`${urlBack}/genders`).then((res) => setGender(res.data));
    axios.get(`${urlBack}/athletics`).then((res) => setAthletic(res.data));
    axios.get(`${urlBack}/countries`).then((res) => setCountry(res.data));
  }, []);

  return (
    <div className="modificationProfil">
      <HeaderProfil />
      <form
        action=""
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => updatedUser(e)}
        className="modificationProfil__container">
        <div className="modificationProfil__container__content">
          <FiUserMinus className="modificationProfil__container__content__icons" />
          <input
            name="Pseudo"
            type="text"
            placeholder={user.pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <FiMeh className="modificationProfil__container__content__icons" />
          <input
            name="Prénom"
            type="text"
            placeholder={user.firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <FiMeh className="modificationProfil__container__content__icons" />
          <input
            name="Nom"
            type="text"
            placeholder={user.lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <FiHome className="modificationProfil__container__content__icons" />
          <input
            name="Adresse"
            type="text"
            placeholder={user.adress}
            onChange={(e) => setAdress(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <FiHome className="modificationProfil__container__content__icons" />
          <FiPlus className="modificationProfil__container__content__icons" />
          <input
            name="Adresse complément"
            type="text"
            placeholder={user.adress_complement}
            onChange={(e) => setAdress_complement(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <FiMapPin className="modificationProfil__container__content__icons" />
          <input
            name="Ville"
            type="text"
            placeholder={user.city}
            onChange={(e) => setCity(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <FiMapPin className="modificationProfil__container__content__icons" />
          <input
            name="Code postal"
            type="number"
            min="0"
            max="99999"
            placeholder={user.zipcode}
            onChange={(e) => setZipcode(e.target.valueAsNumber)}
          />
          <hr />
        </div>

        <div className="modificationProfil__container__content">
          <FiMap className="modificationProfil__container__content__icons" />
          <select name="Pays" onChange={(e) => setId_country(e.target.value)}>
            {country
              .filter((el) => el.id_country == user.id_country)
              .map((el, index) => (
                <option key={index} defaultValue={el.id_country}>
                  {el.name}
                </option>
              ))}
            {country.map((el, index) => (
              <option key={index} value={el.id_country}>
                {el.name}
              </option>
            ))}
          </select>
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <FiMail className="modificationProfil__container__content__icons" />
          <input
            name="Email"
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <FiLock className="modificationProfil__container__content__icons" />
          <input
            name="MDP"
            placeholder="***********"
            type={`${hiEye ? 'password' : 'text'}`}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
          />
          <HiEye className="inputIcon right" onClick={() => setHiEye(!hiEye)} />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <FiKey className="modificationProfil__container__content__icons" />
          <input
            name="MDP verification"
            placeholder="***********"
            type={`${hiEye2 ? 'password' : 'text'}`}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setVerifyPassword(e.currentTarget.value)
            }
          />
          <HiEye className="inputIcon right" onClick={() => setHiEye2(!hiEye2)} />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <FiPhone className="modificationProfil__container__content__icons" />
          <input
            name="Téléphone"
            type="tel"
            placeholder={user.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <FiCalendar className="modificationProfil__container__content__icons" />
          <input
            name="Date de naissance"
            type="date"
            onChange={(e) => setBirthday(e.target.value)}
          />
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <BiRun className="modificationProfil__container__content__icons" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select name="Sportif" onChange={(e) => setId_athletic(e.target.value)}>
            {athletic
              .filter((el) => el.id_athletic == user.id_athletic)
              .map((el, index) => (
                <option key={index} defaultValue={el.id_athletic}>
                  {el.name}
                </option>
              ))}
            {athletic.map((el, index) => (
              <option key={index} value={el.id_athletic}>
                {el.name}
              </option>
            ))}
          </select>
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <div className="modificationProfil__container__content__icons">
            <BsGenderFemale />
            <BsGenderMale />
            <BsGenderAmbiguous />
          </div>
          <select name="Genre" onChange={(e) => setId_gender(e.currentTarget.value)}>
            {gender
              .filter((el) => el.id_gender == user.id_gender)
              .map((el, index) => (
                <option key={index} defaultValue={el.id_gender}>
                  {el.adult_name}
                </option>
              ))}
            {gender.map((el, index) => (
              <option key={index} value={el.id_gender}>
                {el.adult_name}
              </option>
            ))}
          </select>
          <hr />
        </div>
        <div className="modificationProfil__container__content">
          <FiFile className="modificationProfil__container__content__icons" />
          <input name="Photo" type="file" onClick={(e) => setPicture(e.target.value)} />
          <hr />
        </div>
        <button type="submit">Modifier vos données</button>
      </form>
    </div>
  );
};

export default ModificationProfil;
