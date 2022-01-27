import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';

// import { MdStarRate } from 'react-icons/md';
import CurrentOfferContext from '../../../../contexts/Offer';
import IBrand from '../../../../interfaces/IBrand';
import ICategory from '../../../../interfaces/ICategory';
import IColor from '../../../../interfaces/IColor';
import ICondition from '../../../../interfaces/ICondition';
import IDeliverer from '../../../../interfaces/IDeliverer';
import IGender from '../../../../interfaces/IGender';
import IItem from '../../../../interfaces/IItem';
import IOffer from '../../../../interfaces/IOffer';
import IOffer_Deliverer from '../../../../interfaces/IOffer_deliverer';
import ISize from '../../../../interfaces/ISize';
import ISport from '../../../../interfaces/ISport';
import ITextile from '../../../../interfaces/ITextile';

const urlBack = import.meta.env.VITE_URL_BACK;

const UpdateOffer = () => {
  // Context id for offer
  const { idOfferSell } = useContext(CurrentOfferContext);
  // UseState for dispaly informations
  const [sportList, setSportList] = useState<ISport[]>([]);
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [itemList, setItemList] = useState<IItem[]>([]);
  const [brandList, setBrandList] = useState<IBrand[]>([]);
  const [textileList, setTextileList] = useState<ITextile[]>([]);
  const [colorList, setColorList] = useState<IColor[]>([]);
  const [conditionList, setConditionList] = useState<ICondition[]>([]);
  const [sizeList, setSizeList] = useState<ISize[]>([]);
  const [delivererList, setDelivererList] = useState<IDeliverer[]>([]);
  const [offerSell, setOfferSell] = useState<IOffer | any>([]);
  const [gendersList, setGendersList] = useState<IGender[]>([]);
  // useState for update offer
  const [pictures, setPictures] = useState<Array<string>>([]);
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [sport, setSport] = useState<string | undefined>();
  const [gender, setGender] = useState<number | null>(null);
  const [genderAdult, setGenderAdult] = useState<number | null>(null);
  const [genderChild, setGenderChild] = useState<number | null>(null);
  const [genderIsChild, setGenderIsChild] = useState<boolean>(false);
  const [category, setCategory] = useState<string | undefined>();
  const [item, setItem] = useState<string | undefined>();
  const [categoryIsClothes, setCategoryIsClothes] = useState(false);
  const [brand, setBrand] = useState<string | undefined>();
  const [textile, setTextile] = useState<string | undefined>();
  const [color1, setColor1] = useState<string | undefined>();
  const [color2, setColor2] = useState<string | undefined>();
  const [condition, setCondition] = useState<string | undefined>();
  const [price, setPrice] = useState<string | undefined>();
  const [size, setSize] = useState<string | undefined>();
  const [weight, setWeight] = useState<string | undefined>();
  const [handDelivery, setHandDelivery] = useState<number>();
  const [chosenDeliverers, setChosenDeliverers] = useState<Array<number>>([]);
  const [isDraft, setIsDraft] = useState(0);
  const [offer, setOffer] = useState<IOffer>();
  // axios call for display informations
  useEffect(() => {
    axios.get(`${urlBack}/sports`).then((res) => setSportList(res.data));
    axios.get(`${urlBack}/categories`).then((res) => setCategoryList(res.data));
    axios.get(`${urlBack}/items`).then((res) => setItemList(res.data));
    axios.get(`${urlBack}/brands`).then((res) => setBrandList(res.data));
    axios.get(`${urlBack}/textiles`).then((res) => setTextileList(res.data));
    axios.get(`${urlBack}/colors`).then((res) => setColorList(res.data));
    axios.get(`${urlBack}/conditions`).then((res) => setConditionList(res.data));
    axios.get(`${urlBack}/sizes`).then((res) => setSizeList(res.data));
    axios.get(`${urlBack}/deliverers`).then((res) => setDelivererList(res.data));
    axios.get(`${urlBack}/genders`).then((res) => setGendersList(res.data));

    axios
      .get(`${urlBack}/offers/${sessionStorage.getItem('idOfferSell')}`)
      .then((res) => {
        setCondition(res.data.id_condition);
        setColor2(res.data.id_color2);
        setColor1(res.data.id_color1);
        setSize(res.data.id_size);
        setBrand(res.data.id_brand);
        setItem(res.data.id_item);
        setGenderChild(res.data.id_gender);
        setGenderAdult(res.data.id_gender);
        setGenderIsChild(res.data.is_child != 0);
        setCategory(res.data.id_category);
        setSport(res.data.id_sport);
        setOfferSell(res.data);
        setHandDelivery(res.data.hand_delivery);
      });
  }, [idOfferSell]);

  useEffect(() => {
    category &&
      axios.get(`${urlBack}/categories/${category}/items`).then((res) => {
        setItemList(res.data);
      });
  }, [category]);

  let deliverersArray: number[] = [];
  const handleChosenDeliverers = (id: number) => {
    if (deliverersArray.includes(id)) {
      deliverersArray.splice(deliverersArray.indexOf(id), 1);
    } else {
      deliverersArray.push(id);
    }
  };

  // function to send form informations to axios call update
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setChosenDeliverers(deliverersArray);
    deliverersArray = [];
    const newOffer = {
      title,
      picture1: pictures[0],
      description,
      id_sport: sport,
      id_gender: Number(gender),
      is_child: genderIsChild ? 1 : 0,
      id_category: category,
      id_item: item,
      id_brand: brand ? brand : null,
      id_textile: textile ? textile : null,
      id_size: size ? size : null,
      id_color1: color1 ? color1 : null,
      id_color2: color2 ? color2 : null,
      id_condition: condition,
      price: price,
      weight: weight,
      hand_delivery: handDelivery,
      is_archived: 0,
      is_draft: isDraft,
      picture2: pictures[1],
      picture3: pictures[2],
      picture4: pictures[3],
      picture5: pictures[4],
      picture6: pictures[5],
      picture7: pictures[6],
      picture8: pictures[7],
      picture9: pictures[8],
      picture10: pictures[9],
      picture11: pictures[10],
      picture12: pictures[11],
      picture13: pictures[12],
      picture14: pictures[13],
      picture15: pictures[14],
      picture16: pictures[15],
      picture17: pictures[16],
      picture18: pictures[17],
      picture19: pictures[18],
      picture20: pictures[19],
    } as unknown as IOffer;
    setOffer(newOffer);
  };

  // Function axios to add pictures on offer.
  const handleFileInput = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList;
    const formData = new FormData();
    const arrayFiles = Array.from(file);
    arrayFiles.map((el) => formData.append('imagesOffers', el));
    // formData.append('imagesOffers', file);

    axios
      .post(
        `${urlBack}/offers/images`,
        formData,

        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((res) => setPictures(res.data))
      .catch((err) => console.error({ ...err }));
  };
  // Axios call to update offer
  useEffect(() => {
    offer &&
      axios
        .put<IOffer>(`${urlBack}/offers/${idOfferSell}`, offer)
        .then((rep) => {
          const id_offer = rep.data.id_offer;
          chosenDeliverers.map((deliverer) => {
            const id_deliverer = deliverer;
            axios.put<IOffer_Deliverer>(`${urlBack}/offer_deliverers`, {
              id_offer,
              id_deliverer,
            });
          });
        })
        .catch((err) => console.log({ ...err }));
  }, [offer]);

  console.log(pictures.map((picture) => picture));

  return (
    <div className="offerFormUpdate">
      <form
        encType="multipart/form-data"
        id="offerForm"
        onSubmit={(e: React.FormEvent) => handleSubmit(e)}
        className="offerFormUpdate__form"
        action=""
      >
        {/* ---------------------------Input for updated pictures------------------------ */}
        <div id="addPhotoContainer">
          <label id="labelPhoto1" htmlFor="photo1">
            <BsPlusLg /> AJOUTER PHOTOS
          </label>
          <input
            multiple
            type="file"
            id="photo1"
            name="imagesOffers"
            onChange={(e) => handleFileInput(e)}
          />
          {pictures.length != 0 &&
            Object.keys(pictures).map((picture, index) => (
              <img key={index} src={picture} alt="annonce" />
            ))}
          {offerSell.length &&
            offerSell.map((picture: { picture: string | undefined }, index: number) => (
              <img key={index} src={picture.picture} alt="annonce" />
            ))}
        </div>
        {/* ---------------------------Input for title offer------------------------ */}

        <div>
          <label className="offerFormUpdate__label" htmlFor="title">
            Titre
          </label>
          <input
            placeholder={offerSell.title}
            onChange={(e) => setTitle(e.target.value)}
            className="offerFormUpdate__input"
            type="text"
            id="title"
            name="title"
          />
        </div>
        {/* ---------------------------Input for description offer------------------------ */}
        <div>
          <label className="offerFormUpdate__label" htmlFor="description">
            Description
          </label>
          <textarea
            placeholder={offerSell.description}
            onChange={(e) => setDescription(e.target.value)}
            className="offerFormUpdate__input"
            rows={5}
            id="description"
            name="description"
          />
        </div>
        {/* ---------------------------Select for sports------------------------ */}
        <div className="offerFormUpdate__items">
          <div className="offerFormUpdate__items__asterisk"></div>
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className="offerFormUpdate__select"
          >
            {sportList.map((sport, index) => (
              <option key={index} value={sport.id_sport}>
                {sport.name}
              </option>
            ))}
          </select>
        </div>
        {/* ---------------------------Select for genders------------------------ */}

        <div className="offerFormUpdate__items">
          <div className="offerFormUpdate__items__asterisk"></div>
          <select
            onChange={(e) => {
              setGenderAdult(Number(e.target.value));
              e.target.value === '4'
                ? (setGenderIsChild(true), setGender(null))
                : (setGenderIsChild(false), setGender(Number(e.target.value)));
            }}
            value={Number(genderAdult)}
            className="offerFormUpdate__select"
            name="genders"
            id="genders"
          >
            <option value="">Genre</option>
            {gendersList.map((gender, index) => (
              <option key={index} value={gender.id_gender}>
                {gender.adult_name}
              </option>
            ))}
            <option value={4}>Enfant</option>
          </select>
        </div>
        {genderIsChild && (
          <div>
            <select
              onChange={(e) => {
                setGenderChild(Number(e.target.value)), setGender(Number(e.target.value));
              }}
              value={Number(genderChild)}
              className="offerFormUpdate__select conditionnal"
            >
              {gendersList.map((child, index) => (
                <option key={index} value={child.id_gender}>
                  {child.child_name}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* ---------------------------Select for categories------------------------ */}

        <div className="offerFormUpdate__items">
          <select
            onChange={(e) => {
              setCategory(e.target.value);
              e.target.value === '1'
                ? setCategoryIsClothes(true)
                : setCategoryIsClothes(false);
            }}
            value={category}
            className="offerFormUpdate__select"
          >
            {categoryList.length &&
              categoryList.map((category, index) => (
                <option key={index} value={category.id_category}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for items------------------------ */}

        <div className="offerFormUpdate__items">
          <select
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="offerFormUpdate__select"
          >
            {itemList.length &&
              itemList.map((item, index) => (
                <option key={index} value={item.id_item}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for category is clothes------------------------ */}

        {categoryIsClothes && (
          <div>
            <select
              onChange={(e) => setTextile(e.target.value)}
              value={textile}
              className="offerFormUpdate__select conditionnal"
              name="textile"
              id="textile"
            >
              {textileList &&
                textileList.map((textile, index) => (
                  <option key={index} value={textile.id_textile}>
                    {textile.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        {/* ---------------------------Select for brands------------------------ */}

        <div>
          <select
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            className="offerFormUpdate__select"
            name="brands"
            id="brands"
          >
            <option value="">Marque</option>
            {brandList &&
              brandList.map((brand, index) => (
                <option key={index} value={brand.id_brand}>
                  {brand.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for sizes------------------------ */}

        <div>
          <select
            onChange={(e) => setSize(e.target.value)}
            value={size}
            className="offerFormUpdate__select"
            name="sizes"
            id="sizes"
          >
            <option value="">Taille</option>
            {sizeList &&
              sizeList.map((size, index) => (
                <option key={index} value={size.id_size}>
                  {size.size_fr}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for color1------------------------ */}

        <div>
          <select
            onChange={(e) => setColor1(e.target.value)}
            value={color1}
            className="offerFormUpdate__select"
            name="color1"
            id="color1"
          >
            <option value="">Couleur 1</option>
            {colorList &&
              colorList.map((color, index) => (
                <option key={index} value={color.id_color}>
                  {color.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for color2------------------------ */}

        <div>
          <select
            onChange={(e) => setColor2(e.target.value)}
            value={color2}
            className="offerFormUpdate__select"
            name="color2"
            id="color2"
          >
            {colorList.length &&
              colorList.map((color, index) => (
                <option key={index} value={color.id_color}>
                  {color.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for conditions------------------------ */}

        <div className="offerFormUpdate__items">
          <select
            onChange={(e) => setCondition(e.target.value)}
            value={condition}
            className="offerFormUpdate__select"
            name="conditions"
            id="conditions"
          >
            <option value="">État du produit</option>
            {conditionList &&
              conditionList.map((condition, index) => (
                <option key={index} value={condition.id_condition}>
                  {condition.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for price------------------------ */}

        <div className="offerFormUpdate__price">
          <label className="offerFormUpdate__label" htmlFor="price">
            Prix hors frais de port
          </label>
          <input
            value={price}
            placeholder={offerSell.price}
            onChange={(e) => setPrice(e.target.value)}
            className="offerFormUpdate__input"
            type="number"
            step={0.01}
            id="price"
            name="price"
          />
          €
        </div>
        {/* ---------------------------Input for weight------------------------ */}

        <div className="offerFormUpdate__weight">
          <label className="offerFormUpdate__label" htmlFor="weight">
            Poids du produit
          </label>
          <input
            value={weight}
            placeholder={offerSell.weight}
            onChange={(e) => setWeight(e.target.value)}
            className="offerFormUpdate__input"
            type="number"
            step={1}
            id="weight"
            name="weight"
          />
        </div>
        {/* ---------------------------Input for handDelivery------------------------ */}

        <div className="offerFormUpdate__deliveries">
          <div className="delivererList">
            <div className="offerFormUpdate__switchContainer">
              <span className="offerFormUpdate__switchContainer__span">
                Remise en main propre:
              </span>
              <label className="switch">
                <input
                  checked={handDelivery ? true : false}
                  onChange={() => {
                    handDelivery ? setHandDelivery(0) : setHandDelivery(1);
                  }}
                  type="checkbox"
                  name="handDelivery"
                />
                <span className="slider round"></span>
              </label>
            </div>
            {/* ---------------------------Input for deliverer list------------------------ */}

            {delivererList &&
              delivererList.map((deliverer) => (
                <div key={deliverer.id_deliverer} className="offerForm__switchContainer">
                  <span className="offerFormUpdate__switchContainer__span">
                    {deliverer.name}
                  </span>
                  <label className="switch">
                    <input
                      onChange={() => handleChosenDeliverers(deliverer.id_deliverer)}
                      id={deliverer.name}
                      type="checkbox"
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              ))}
          </div>
        </div>
        {/* ---------------------------Input for draft------------------------ */}

        <div className="offerFormUpdate__switchContainer">
          <span className="offerFormUpdate__switchContainer__span">
            Enregistrer comme brouillon et mettre en vente plus tard
          </span>
          <label className="switch">
            <input
              checked={isDraft ? true : false}
              onChange={() => {
                isDraft ? setIsDraft(0) : setIsDraft(1);
              }}
              type="checkbox"
              name="isDraft"
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="offerFormUpdate__submitContainer">
          <button className="btn" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOffer;
