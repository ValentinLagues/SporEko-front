import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaRunning } from 'react-icons/fa';
import { FaWalking } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import { IoFitness } from 'react-icons/io5';
import { MdDirectionsBike } from 'react-icons/md';

const OfferForm = () => {
  const display = (val) => {
    const classes = val.split(' ');
    const selected = classes[classes.length - 1];
    console.log(selected);
    const selectToDisplay = document.getElementById(selected);
    selectToDisplay.classList.remove('displayNone');
  };

  return (
    <div className="offerForm">
      <form className="offerForm__form" action="">
        <div className="offerForm__sportIcons">
          <FaRunning className="offerForm__sportIcons__icon" />
          <MdDirectionsBike className="offerForm__sportIcons__icon" />
          <FaWalking className="offerForm__sportIcons__icon" />
          <IoFitness className="offerForm__sportIcons__icon" />
        </div>
        <div id="addPhotoContainer">
          <label id="labelPhoto1" htmlFor="photo1">
            <BsPlusLg /> AJOUTER PHOTOS
          </label>
          <input type="file" id="photo1" />
        </div>
        <div>
          <label className="offerForm__label" htmlFor="title">
            Titre
          </label>
          <input className="offerForm__input" type="text" id="title" />
        </div>
        <div>
          <label className="offerForm__label" htmlFor="description">
            Description
          </label>
          <textarea className="offerForm__input" rows={5} id="description" />
        </div>
        <div
          role="button"
          onKeyPress={(e) => display(e.target.className)}
          onClick={(e) => display(e.target.className)}
          tabIndex={0}
          className="offerForm__selectContainer">
          <label className="offerForm__selectLabel categories" htmlFor="category">
            Categorie <FaChevronRight className="chevronRight" />
          </label>
          <select
            className="offerForm__select displayNone"
            name="category"
            id="categories">
            <option value="">Categorie</option>
            <option value="1">Autre</option>
            <option value="2">Homme</option>
            <option value="3">Femme</option>
            <option value="4">Enfant</option>
            <option value="5">Accessoire</option>
          </select>
        </div>
        <div>
          <label className="offerForm__selectLabel" htmlFor="brand">
            Marque <FaChevronRight className="chevronRight" />
          </label>
          <select className="offerForm__select displayNone" name="brand" id="brand">
            <option value=""></option>
            <option value="1">Autre</option>
            <option value="2">Homme</option>
            <option value="3">Femme</option>
            <option value="4">Enfant</option>
            <option value="5">Accessoire</option>
          </select>
        </div>
        <div>
          <label className="offerForm__selectLabel" htmlFor="textile">
            Matière <FaChevronRight className="chevronRight" />
          </label>
          <select className="offerForm__select displayNone" name="textile" id="textile">
            <option value=""></option>
            <option value="1">Autre</option>
            <option value="2">Cuir</option>
            <option value="3">Coton</option>
          </select>
        </div>
        <div>
          <label className="offerForm__selectLabel" htmlFor="conditions">
            État <FaChevronRight className="chevronRight" />
          </label>
          <select
            className="offerForm__select displayNone"
            name="condition"
            id="conditions">
            <option value=""></option>
            <option value="1">Comme neuf</option>
            <option value="2">Bon état</option>
            <option value="3">État moyen</option>
            <option value="4">Mauvais état</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default OfferForm;
