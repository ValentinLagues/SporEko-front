import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BiRun } from 'react-icons/bi';
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
import IAthletic from '../../../interfaces/IAthletic';
import ICountry from '../../../interfaces/ICountry';
import IGender from '../../../interfaces/IGender';
import IUser from '../../../interfaces/IUser';
import IUserLog from '../../../interfaces/IUser';
import HeaderProfil from '../layout/HeaderProfil';

const UpdateProfile = () => {
  // User context
  const { idUser } = useContext(CurrentUserContext);
  // Icon eye to password
  const [hiEye, setHiEye] = useState<boolean>(true);
  const [hiEye2, setHiEye2] = useState<boolean>(true);
  // Array of axios response
  const [genders, setGender] = useState<IGender[]>([]);
  const [athletics, setAthletic] = useState<IAthletic[]>([]);
  const [countries, setCountry] = useState<ICountry[]>([]);
  // Variable of Form to update user
  const [pseudo, setPseudo] = useState<string>();
  const [lastname, setLastname] = useState<string>();
  const [firstname, setFirstname] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [addressComplement, setAddressComplement] = useState<string>();
  const [zipcode, setZipcode] = useState<number>();
  const [city, setCity] = useState<string>();
  const [idCountry, setIdCountry] = useState<number>();
  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [idGender, setIdGender] = useState<number>();
  const [idAthletic, setIdAthletic] = useState<number>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  // Display icon to good entry between password and confirm password
  const [goodEntryVerifyPassword, setGoodEntryVerifyPassword] = useState<number>(0);
  const [goodEntryPassword, setGoodEntryPassword] = useState<number>(0);
  // Display error or confirmation message
  const [messageError, setMessageError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  // Object send to axios put
  const [updateUser, setUpdateUser] = useState<IUser>();
  const [displayBirthday, setDisplayBirthday] = useState<string>();

  // Url to axios call
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

  // Axios call to user informations
  useEffect(() => {
    axios.get<IUser>(`${urlBack}/users/${idUser}`).then((res) => {
      setPseudo(res.data.pseudo);
      setFirstname(res.data.firstname);
      setLastname(res.data.lastname);
      setAddress(res.data.address);
      setAddressComplement(res.data.address_complement);
      setZipcode(res.data.zipcode);
      setEmail(res.data.email);
      setCity(res.data.city);
      setDisplayBirthday(res.data.birthday);
      setPhone(res.data.phone);
      setIdAthletic(res.data.id_athletic);
      setIdGender(res.data.id_gender);
      setIdCountry(res.data.id_country);
    });
  }, []);

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

  // Function axios to change picture of user
  const handleFileInput = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const formData = new FormData();
    formData.append('imageUser', file);
    axios
      .put<IUserLog>(
        `${urlBack}/users/${idUser}/image`,
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
        err;
        setMessage('');
        setMessageError(
          "Le fichier est trop volumineux ou n'est pas au bon format (jpeg/jpg/png)",
        );
      });
  };
  // Function to update user
  const updatedUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const newUpdateUser = {
        pseudo,
        lastname,
        firstname,
        address,
        zipcode,
        city,
        email,
        password,
        id_gender: idGender,
        id_country: idCountry,
        address_complement: addressComplement,
        id_athletic: idAthletic,
        birthday: birthday,
        phone,
      } as unknown as IUser;
      setUpdateUser(newUpdateUser);
    }
  };

  // Axios call for update user informations
  useEffect(() => {
    updateUser &&
      axios
        .put<IUser>(
          `${urlBack}/users/${idUser}`,
          updateUser,

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
  }, [updateUser]);

  // Axios call to display select
  useEffect(() => {
    axios.get<IGender[]>(`${urlBack}/genders`).then((res) => setGender(res.data));
    axios.get<IAthletic[]>(`${urlBack}/athletics`).then((res) => setAthletic(res.data));
    axios.get<ICountry[]>(`${urlBack}/countries`).then((res) => setCountry(res.data));
  }, []);

  return (
    <div className="updateProfile">
      <HeaderProfil />
      <form onSubmit={(e) => updatedUser(e)} className="updateProfile__container">
        {/*------------------------Input pseudo----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="pseudo">Pseudo :</label>
          <FiUserMinus className="updateProfile__container__content__icons" />
          <input
            id="pseudo"
            placeholder={pseudo ? pseudo : 'Votre pseudo'}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input Firstname----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="prenom">Prénom :</label>
          <FiMeh className="updateProfile__container__content__icons" id="prenom" />
          <input
            type="text"
            placeholder={firstname ? firstname : 'Votre Prénom'}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input Lastname----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="nom">Nom :</label>
          <FiMeh className="updateProfile__container__content__icons" />
          <input
            type="text"
            id="nom"
            placeholder={lastname ? lastname : 'Votre nom'}
            onChange={(e) => setLastname(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input address----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="adresse">Adresse :</label>
          <FiHome className="updateProfile__container__content__icons" />
          <input
            id="adresse"
            type="text"
            placeholder={address ? address : 'Votre adresse'}
            onChange={(e) => setAddress(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input address complement----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="address-complement">Complément d&apos;adresse :</label>
          <div className="updateProfile__container__content__icons">
            <FiHome />
            <FiPlus />
          </div>

          <input
            type="text"
            id="address-complement"
            placeholder={addressComplement}
            onChange={(e) => setAddressComplement(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input City----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="ville">Ville :</label>
          <FiMapPin className="updateProfile__container__content__icons" />
          <input
            type="text"
            id="ville"
            placeholder={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input Zip code----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="zip-code">Code postal :</label>
          <FiMapPin className="updateProfile__container__content__icons" />
          <input
            type="number"
            id="zip-code"
            min="0"
            max="99999"
            placeholder={zipcode ? `${zipcode}` : 'Code postal'}
            onChange={(e) => setZipcode(Number(e.target.valueAsNumber))}
          />
          <hr />
        </div>
        {/*------------------------Select Country----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="pays">Pays :</label>
          <FiMap className="updateProfile__container__content__icons" />
          <select onChange={(e) => setIdCountry(Number(e.target.value))} id="pays">
            {countries
              .filter((el) => el.id_country == idCountry)
              .map((el, index) => (
                <option key={index} defaultValue={el.id_country}>
                  {el.name}
                </option>
              ))}
            {countries.map((el, index) => (
              <option key={index} value={el.id_country}>
                {el.name}
              </option>
            ))}
          </select>
          <hr />
        </div>
        {/*------------------------Input email----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="email">Email :</label>
          <FiMail className="updateProfile__container__content__icons" />
          <input
            type="email"
            id="email"
            placeholder={email ? email : 'Entrez votre email'}
            onChange={(e) => setEmail(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input password----------------------------- */}
        <div className="updateProfile__container__content">
          {goodEntryPassword === 1 && (
            <ImCheckmark
              style={{
                right: '16vw',
                bottom: '2.2vh',
                position: 'absolute',
                color: 'green',
              }}
            />
          )}
          {goodEntryPassword === 2 && (
            <ImCancelCircle
              style={{
                right: '16vw',
                bottom: '2.2vh',
                position: 'absolute',
                color: 'red',
              }}
            />
          )}
          <label htmlFor="password">Mot de passe :</label>
          <FiLock className="updateProfile__container__content__icons" />
          <input
            placeholder="Modifier votre mot de passe"
            id="password"
            type={`${hiEye ? 'password' : 'text'}`}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
          />
          <HiEye className="inputIcon right" onClick={() => setHiEye(!hiEye)} />
          <hr />
        </div>
        {/*------------------------Input password verification----------------------------- */}
        <div className="updateProfile__container__content">
          {goodEntryVerifyPassword === 1 && (
            <ImCheckmark
              style={{
                right: '16vw',
                bottom: '2.2vh',
                position: 'absolute',
                color: 'green',
              }}
            />
          )}
          {goodEntryVerifyPassword === 2 && (
            <ImCancelCircle
              style={{
                right: '16vw',
                bottom: '2.2vh',
                position: 'absolute',
                color: 'red',
              }}
            />
          )}
          <label htmlFor="password">Confirmation mot de passe :</label>
          <FiKey className="updateProfile__container__content__icons" />
          <input
            placeholder="Confirmer votre mot de passe"
            type={`${hiEye2 ? 'password' : 'text'}`}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setConfirmPassword(e.currentTarget.value)
            }
          />
          <HiEye className="inputIcon right" onClick={() => setHiEye2(!hiEye2)} />
          <hr />
        </div>
        {/*------------------------Input Phone----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="phone">Téléphone : Ex -&gt; 01-02-03-04-05 </label>
          <FiPhone className="updateProfile__container__content__icons" />
          <input
            type="tel"
            id="phone"
            pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}"
            placeholder={phone ? phone : 'Entrer votre téléphone'}
            onChange={(e) => setPhone(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Input birthday date----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="birthday">
            Date de naissance : {new Date(displayBirthday || '').toLocaleDateString()}
          </label>
          <FiCalendar className="updateProfile__container__content__icons" />
          <input
            id="birthday"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          <hr />
        </div>
        {/*------------------------Select athletics style----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="birthday">Quel genre de sportifs êtes-vous ?</label>
          <BiRun className="updateProfile__container__content__icons" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select onChange={(e) => setIdAthletic(Number(e.target.value))}>
            {athletics
              .filter((el) => el.id_athletic == idAthletic)
              .map((el, index) => (
                <option key={index} defaultValue={el.id_athletic}>
                  {el.name}
                </option>
              ))}
            {athletics.map((el, index) => (
              <option key={index} value={Number(el.id_athletic)}>
                {el.name}
              </option>
            ))}
          </select>
          <hr />
        </div>
        {/*------------------------Select genders----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="gender">Genre :</label>
          <div className="updateProfile__container__content__icons">
            <BsGenderFemale />
            <BsGenderMale />
            <BsGenderAmbiguous />
          </div>
          <select onChange={(e) => setIdGender(Number(e.currentTarget.value))}>
            {genders
              .filter((el) => el.id_gender == idGender)
              .map((el, index) => (
                <option key={index} defaultValue={el.id_gender}>
                  {el.adult_name}
                </option>
              ))}
            {genders.map((el, index) => (
              <option key={index} value={el.id_gender}>
                {el.adult_name}
              </option>
            ))}
          </select>
          <hr />
        </div>
        {/*------------------------Input add or change imageUser----------------------------- */}
        <div className="updateProfile__container__content">
          <label htmlFor="imageUser">Modifier votre photo de profil :</label>
          <FiFile className="updateProfile__container__content__icons" />
          <input
            id="imageUser"
            type="file"
            style={{ height: 'auto', fontSize: '2.2vh', marginBottom: '2vh' }}
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

export default UpdateProfile;
