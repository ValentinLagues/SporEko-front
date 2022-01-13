import React from 'react';

import TestImage from '../../../../resources/testFicheProduit.jpg';

const ProductDescription = () => {
  return (
    <div className="product-description">
      <div className="product-description__container-picture">
        <img
          className="product-description__container-picture__big-picture"
          src={TestImage}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={TestImage}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={TestImage}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={TestImage}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={TestImage}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={TestImage}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={TestImage}
          alt=""
        />
        <div className="product-description__container-picture__favorite"></div>
      </div>
      <div className="product-description__container-text">
        <div className="product-description__container-text__container1">
          <div className="product-description__container-text__container1__title">
            <h2>Basket Femme</h2>
          </div>

          <div className="product-description__container-text__container1__price">
            <span>25.00€</span>
          </div>
          {/* <div className='product-description__container-text__container1__btn-buy'>
                        <button>Acheter</button>
                    </div> */}
        </div>
        <div className="product-description__container-text__container2__brand">
          <h2>Nike</h2>
        </div>
        <div className="product-description__container-text__container3">
          <div className="product-description__container-text__container3__size">
            <h3>Taille</h3>
            <p>M</p>
          </div>
          <div className="product-description__container-text__container3__condition">
            <h3>Etat</h3>
            <p>Neuf sans étiquette</p>
          </div>
          <div className="product-description__container-text__container3__color">
            <h3>Couleurs</h3>
            <p>Noir</p>
          </div>
          <div className="product-description__container-text__container3__sport-icon">
            <h3>Sport</h3>
            <p>icon</p>
          </div>
        </div>
        <div className="product-description__container-text__container4">
          <div className="product-description__container-text__container4__detail-product">
            <h3>Description</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
              inventore magnam officiis ducimus eligendi, molestias autem doloremque vero
              minima alias ipsam dignissimos voluptas? Doloremque minima voluptatibus amet
              laborum pariatur assumenda? Atque nostrum, aperiam praesentium vero ipsa ab?
              Magni impedit sequi consequuntur labore, totam, distinctio quidem sit
              molestias illum, ullam similique! Impedit consequuntur similique error
              labore debitis repellendus, harum amet minus.
            </p>
          </div>
          <div className="product-description__container-text__container4__btn-guide-size">
            <button>Guide taille</button>
          </div>
        </div>
        <div className="product-description__container-text__container4">
          <div className="product-description__container-text__container4__delivery">
            <h3>Livraison</h3>
            <p>Le produit est disponible en remise en main propre.</p>
            <h4>Options d&apos;envoi</h4>
            <button>Mondial Relay</button>
            <button>La poste</button>
            <p>Secteur Bordeaux</p>
            <div className="product-description__container-text__container4__delivery__btn">
              <button>Acheter</button>
              <button>Favoris</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDescription;
