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
import { ImCancelCircle, ImCheckmark } from 'react-icons/im';

import CurrentUserContext from '../../../contexts/CurrentUser';
import IUserLog from '../../../interfaces/IUser';
import HeaderProfil from '../layout/HeaderProfil';

const ModificationProfil = () => {
  const { user, idUser } = useContext(CurrentUserContext);

  const [gender, setGender] = useState<Array<any>>([]);
  const [athletic, setAthletic] = useState<Array<any>>([]);
  const [country, setCountry] = useState<Array<any>>([]);
  const [pseudo, setPseudo] = useState<string | undefined>(user.pseudo);
  const [lastname, setLastName] = useState<string | undefined>(user.lastname);
  const [firstname, setFirstname] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [address_complement, setAddress_complement] = useState<string>();
  const [zipcode, setZipcode] = useState<number | undefined>();
  const [city, setCity] = useState<string | undefined>();
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
  const [goodEntryVerifyPassword, setGoodEntryVerifyPassword] = useState<number>(0);
  const [goodEntryPassword, setGoodEntryPassword] = useState<number>(0);
  const [messageError, setMessageError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const urlBack = import.meta.env.VITE_URL_BACK;
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
      password === verifyPassword &&
      verifyPassword?.length != undefined &&
      verifyPassword.length > 0
    ) {
      setGoodEntryVerifyPassword(1);
    } else if (
      verifyPassword?.length != undefined &&
      password != verifyPassword &&
      verifyPassword.length > 0
    ) {
      setGoodEntryVerifyPassword(2);
    } else {
      setGoodEntryVerifyPassword(0);
    }
  }, [password, verifyPassword]);

  // Function axios to change picture of user
  const handleFileInput = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const formData = new FormData();
    formData.append('imageUser', file);
    axios
      .put<IUserLog>(
        `${urlBack}/users/image/${idUser}`,
        formData,

        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        res.data;
        setMessage('Photo sauvegardée');
        setMessageError('');
      })
      .catch((err) => {
        console.error(err);
        setMessage('');
        setMessageError(
          "Le fichier est trop volumineux ou n'est pas au bon format (jpeg/jpg/png)",
        );
      });
  };

  // Axios call for update user informations
  const updatedUser = (e: React.FormEvent<HTMLFormElement>) => {
    if (password === verifyPassword) {
      e.preventDefault;
      axios
        .put<IUserLog>(
          `${urlBack}/users/${idUser}`,
          {
            lastname: lastname,
            firstname: firstname,
            address: address,
            zipcode: zipcode,
            city: city,
            email: email,
            password: password,
            id_gender: id_gender,
            id_country: id_country,
            address_complement: address_complement,
            id_athletic: id_athletic,
            birthday: birthday,
            phone: phone,
            pseudo: pseudo,
          },

          {
            withCredentials: true,
          },
        )
        .then((res) => {
          res;
          setMessageError('');
          setMessage('Vos données, on été mise à jour');
        })
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
      <form onSubmit={(e) => updatedUser(e)} className="modificationProfil__container">
        {/*------------------------Input pseudo----------------------------- */}
        <div className="modificationProfil__container__content">
          <FiUserMinus className="modificationProfil__container__content__icons" />
          <input
            type="text"
            placeholder={user.pseudo ? user.pseudo : 'Votre pseudo'}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input Firstname----------------------------- */}
        <div className="modificationProfil__container__content">
          <FiMeh className="modificationProfil__container__content__icons" />
          <input
            type="text"
            placeholder={user.firstname ? user.firstname : 'Votre Prénom'}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input Lastname----------------------------- */}
        <div className="modificationProfil__container__content">
          <FiMeh className="modificationProfil__container__content__icons" />
          <input
            type="text"
            placeholder={user.lastname ? user.lastname : 'Votre nom'}
            onChange={(e) => setLastName(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input adress----------------------------- */}
        <div className="modificationProfil__container__content">
          <FiHome className="modificationProfil__container__content__icons" />
          <input
            type="text"
            placeholder={user.address ? user.address : 'Votre adresse'}
            onChange={(e) => setAddress(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input adresse complement----------------------------- */}
        <div className="modificationProfil__container__content">
          <div className="modificationProfil__container__content__icons">
            <FiHome />
            <FiPlus />
          </div>

          <input
            type="text"
            placeholder={
              user.address_complement ? user.address_complement : "Complément d'adresse"
            }
            onChange={(e) => setAddress_complement(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input City----------------------------- */}
        <div className="modificationProfil__container__content">
          <FiMapPin className="modificationProfil__container__content__icons" />
          <input
            type="text"
            placeholder={user.city ? user.city : 'Ville'}
            onChange={(e) => setCity(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input Zip code----------------------------- */}
        <div className="modificationProfil__container__content">
          <FiMapPin className="modificationProfil__container__content__icons" />
          <input
            type="number"
            min="0"
            max="99999"
            placeholder={user.zipcode ? user.zipcode : 'Code postal'}
            onChange={(e) => setZipcode(e.target.valueAsNumber)}
          />
          <hr />
        </div>
        {/*------------------------Select Country----------------------------- */}
        <div className="modificationProfil__container__content">
          <FiMap className="modificationProfil__container__content__icons" />
          <select onChange={(e) => setId_country(e.target.value)}>
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
        {/*------------------------Input email----------------------------- */}
        <div className="modificationProfil__container__content">
          <FiMail className="modificationProfil__container__content__icons" />
          <input
            type="email"
            placeholder={user.email ? user.email : 'Entrez votre email'}
            onChange={(e) => setEmail(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input password----------------------------- */}
        <div className="modificationProfil__container__content">
          {goodEntryPassword === 1 && (
            <ImCheckmark
              style={{ right: '16vw', position: 'absolute', color: 'green' }}
            />
          )}
          {goodEntryPassword === 2 && (
            <ImCancelCircle
              style={{ right: '16vw', position: 'absolute', color: 'red' }}
            />
          )}
          <FiLock className="modificationProfil__container__content__icons" />
          <input
            placeholder="Modifier votre mot de passe"
            type={`${hiEye ? 'password' : 'text'}`}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
          />
          <HiEye className="inputIcon right" onClick={() => setHiEye(!hiEye)} />
          <hr />
        </div>
        {/*------------------------Input password verification----------------------------- */}
        <div className="modificationProfil__container__content">
          {goodEntryVerifyPassword === 1 && (
            <ImCheckmark
              style={{ right: '16vw', position: 'absolute', color: 'green' }}
            />
          )}
          {goodEntryVerifyPassword === 2 && (
            <ImCancelCircle
              style={{ right: '16vw', position: 'absolute', color: 'red' }}
            />
          )}
          <FiKey className="modificationProfil__container__content__icons" />
          <input
            placeholder="Confirmer votre mot de passe"
            type={`${hiEye2 ? 'password' : 'text'}`}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setVerifyPassword(e.currentTarget.value)
            }
          />
          <HiEye className="inputIcon right" onClick={() => setHiEye2(!hiEye2)} />
          <hr />
        </div>
        {/*------------------------Input Phone----------------------------- */}
        <div className="modificationProfil__container__content">
          <FiPhone className="modificationProfil__container__content__icons" />
          <input
            type="tel"
            placeholder={user.phone ? user.phone : 'Entrer votre téléphone'}
            onChange={(e) => setPhone(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input birthday date----------------------------- */}
        <div className="modificationProfil__container__content">
          <FiCalendar className="modificationProfil__container__content__icons" />
          <input
            placeholder={user.birthday}
            type="date"
            onChange={(e) => setBirthday(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Select athletic style----------------------------- */}
        <div className="modificationProfil__container__content">
          <BiRun className="modificationProfil__container__content__icons" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select onChange={(e) => setId_athletic(e.target.value)}>
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
          {/*------------------------Select gender----------------------------- */}
          <select onChange={(e) => setId_gender(e.currentTarget.value)}>
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
        {/*------------------------Input add or change imageUser----------------------------- */}
        <div className="modificationProfil__container__content">
          <label htmlFor="imageUser">Modifier votre photo</label>
          <FiFile className="modificationProfil__container__content__icons" />
          <input
            id="imageUser"
            type="file"
            style={{ height: 'auto', fontSize: '2.2vh' }}
            onChange={(e) => handleFileInput(e)}
          />
        </div>

        <button type="submit">Modifier vos données</button>
        {message != '' && <p style={{ color: 'green' }}>{message}</p>}
        {messageError != '' && <p style={{ color: 'red' }}>{messageError}</p>}
      </form>
    </div>
  );
};

export default ModificationProfil;
