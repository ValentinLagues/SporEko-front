import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaQuestionCircle } from 'react-icons/fa';
import { MdStarRate } from 'react-icons/md';
import { useParams } from 'react-router-dom';

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
  // Take id to params url
  const { id } = useParams();

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
  const [gendersList, setGendersList] = useState<IGender[]>([]);

  // useState for update offer
  const [pictures, setPictures] = useState<Array<string>>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sport, setSport] = useState('');
  const [gender, setGender] = useState<number | null>(null);
  const [genderAdult, setGenderAdult] = useState<number | null>(null);
  const [genderChild, setGenderChild] = useState<number | null>(null);
  const [genderIsChild, setGenderIsChild] = useState(0);
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [itemInfos, setItemInfos] = useState<IItem>();
  const [categoryIsClothes, setCategoryIsClothes] = useState(false);
  const [brand, setBrand] = useState('');
  const [textile, setTextile] = useState('');
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState<number | null>(null);
  const [weightRequired, setWeightRequired] = useState(false);
  const [handDelivery, setHandDelivery] = useState(0);
  const [chosenDeliverers, setChosenDeliverers] = useState<Array<number>>([]);
  const [isDraft, setIsDraft] = useState(0);
  const [offer, setOffer] = useState<IOffer>();
  const [deliverersArray, setDeliverersArray] = useState<Array<number>>([]);
  // Axios call to display select
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

    axios.get(`${urlBack}/offers/${id}`).then((res) => {
      setTitle(res.data.title);
      setDescription(res.data.description);
      setSport(res.data.id_sport);
      setGenderChild(res.data.id_gender);
      setGenderAdult(res.data.id_gender);
      setGenderIsChild(res.data.is_child);
      setCategory(res.data.id_category);
      setItem(res.data.id_item);
      setBrand(res.data.id_brand);
      setSize(res.data.id_size);
      setColor1(res.data.id_color1);
      setColor2(res.data.id_color2);
      setCondition(res.data.id_condition);
      setPrice(res.data.price);
      setWeight(res.data.weight);
      setHandDelivery(res.data.hand_delivery);
      setIsDraft(res.data.is_draft);
      setPictures({
        picture1: res.data.picture1,
        picture2: res.data.picture2,
        picture3: res.data.picture3,
        picture4: res.data.picture4,
        picture5: res.data.picture5,
        picture6: res.data.picture6,
        picture7: res.data.picture7,
        picture8: res.data.picture8,
        picture9: res.data.picture9,
        picture10: res.data.picture10,
        picture11: res.data.picture11,
        picture12: res.data.picture12,
        picture13: res.data.picture13,
        picture14: res.data.picture14,
        picture15: res.data.picture15,
        picture16: res.data.picture16,
        picture17: res.data.picture17,
        picture18: res.data.picture18,
        picture19: res.data.picture19,
        picture20: res.data.picture20,
      });
    });
  }, [id]);

  useEffect(() => {
    category &&
      axios.get(`${urlBack}/categories/${category}/items`).then((res) => {
        setItemList(res.data);
      });
  }, [category]);

  useEffect(() => {
    let filters = ``;
    let oneValue = false;

    if (gender) {
      filters += `?id_gender=${gender}`;
      oneValue = true;
    }
    if (genderIsChild) {
      filters += oneValue ? `&is_child=1` : `?is_child=1`;
      oneValue = true;
    }
    item
      ? axios.get(`${urlBack}/items/${item}/sizes${filters}`).then((res) => {
          setSizeList(res.data);
        })
      : category
      ? axios.get(`${urlBack}/categories/${category}/sizes${filters}`).then((res) => {
          setSizeList(res.data);
        })
      : (setSizeList([]), setShowSizes(false));
  }, [item, gender, genderIsChild, category]);

  const togglePhotoTipsContent = () => {
    const photoTipsContent = document.getElementById('photoTipsContent');
    photoTipsContent?.classList.contains('invisible')
      ? photoTipsContent.classList.remove('invisible')
      : photoTipsContent?.classList.add('invisible');
  };

  const toggleDescriptionTipsContent = () => {
    const descriptionTipsContent = document.getElementById('descriptionTipsContent');
    descriptionTipsContent?.classList.contains('invisible')
      ? descriptionTipsContent.classList.remove('invisible')
      : descriptionTipsContent?.classList.add('invisible');
  };

  const toggleWeightTipsContent = () => {
    const weightTipsContent = document.getElementById('weightTipsContent');
    weightTipsContent?.classList.contains('invisible')
      ? weightTipsContent.classList.remove('invisible')
      : weightTipsContent?.classList.add('invisible');
  };

  const handleItemSelected = (id: string) => {
    axios
      .get(`${urlBack}/items/${id}`)
      .then((item) => {
        setItemInfos(item.data);
        return item.data;
      })
      .then((item) =>
        item.id_size_type === 1 ||
        item.id_size_type === 2 ||
        item.id_size_type === 3 ||
        item.id_size_type === 6
          ? setShowSizes(true)
          : setShowSizes(false),
      );
  };

  const handleChosenDeliverers = (id: number) => {
    if (deliverersArray.includes(id)) {
      setDeliverersArray(deliverersArray.filter((elem) => elem !== id));
    } else {
      setDeliverersArray(deliverersArray.concat([id]));
    }
  };

  useEffect(() => {
    if (deliverersArray.length != 0) {
      setWeightRequired(true);
    } else {
      setWeightRequired(false);
    }
  }, [deliverersArray]);

  const handleSubmit = (e: React.FormEvent) => {
    let errors = false;
    let errorsDescription: HTMLElement | null =
      document.getElementById('errorsDescription');
    errorsDescription && (errorsDescription.innerHTML = '');
    let errorsMessage = [];

    if (title === '') {
      errorsMessage.push('Veuillez ajouter un titre');
      errors = true;
    }
    if (description === '') {
      errorsMessage.push('Veuillez ajouter une description');
      errors = true;
    }
    if (sport === '') {
      errorsMessage.push('Veuillez préciser un sport');
      errors = true;
    }
    // if (gender === null) {
    //   errorsMessage.push('Veuillez préciser un genre');
    //   errors = true;
    // }
    if (category === '') {
      errorsMessage.push('Veuillez préciser une catégorie');
      errors = true;
    }
    if (item === '') {
      errorsMessage.push('Veuillez selectionner un article');
      errors = true;
    }
    if (showSizes && size === '') {
      errorsMessage.push('Veuillez renseigner une taille');
      errors = true;
    }
    if (condition === '') {
      errorsMessage.push("Veuillez préciser l'état de l'article");
      errors = true;
    }
    if (price === null) {
      errorsMessage.push("Veuillez renseigner le prix de l'article");
      errors = true;
    }
    if (deliverersArray.length === 0 && !handDelivery) {
      errorsMessage.push('Veuillez sélectionner au moins un mode de livraison');
      errors = true;
    }
    if (deliverersArray.length != 0 && weight === null) {
      errorsMessage.push("Veuillez renseigner le poids de l'article");
      errors = true;
    }

    if (errors) {
      e.preventDefault();
      console.log(errorsMessage);
      errorsMessage.map((message) => {
        const p = document.createElement('p');
        p.append(message);
        errorsDescription?.append(p);
      });
      errorsDescription?.setAttribute('display', 'bloc');
    }
    if (!errors) {
      errorsDescription?.setAttribute('display', 'none');
      setChosenDeliverers(deliverersArray);
      setDeliverersArray([]);
      const newOffer = {
        title,
        picture1: pictures[0],
        description,
        id_sport: sport,
        id_gender: gender,
        is_child: genderIsChild,
        id_category: category,
        id_item: item,
        id_brand: brand ? brand : null,
        id_textile: textile ? textile : null,
        id_size: size ? size : null,
        id_color1: color1 ? color1 : null,
        id_color2: color2 ? color2 : null,
        id_condition: condition,
        price: Number(Number(price).toFixed(2)),
        weight: Number(Number(weight).toFixed(0)),
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
    }
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

  let images = Object.keys(pictures).map(function (key: any) {
    return [Number(key), pictures[key]];
  });

  useEffect(() => {
    offer &&
      axios
        .put<IOffer>(`${urlBack}/offers/${id}`, offer)
        .then((rep) => {
          const id_offer = rep.data.id_offer;
          chosenDeliverers.map((deliverer) => {
            const id_deliverer = deliverer;
            axios.post<IOffer_Deliverer>(`${urlBack}/offer_deliverers`, {
              id_offer,
              id_deliverer,
            });
          });
        })
        .catch((err) => console.log({ ...err }));
  }, [offer]);
  console.log(chosenDeliverers);
  return (
    <div className="offerForm">
      <form
        encType="multipart/form-data"
        id="offerForm"
        onSubmit={(e: React.FormEvent) => handleSubmit(e)}
        className="offerForm__form"
        action="">
        {/* ---------------------------Input for updated pictures------------------------ */}
        <div>Ajoute jusqu&apos;à 20 photos</div>
        <div id="addPhotoContainer">
          <label id="labelPhoto1" htmlFor="photo1">
            <BsPlusLg /> AJOUTER PHOTOS
          </label>
          <input multiple type="file" id="photo1" onChange={(e) => handleFileInput(e)} />
          <div
            tabIndex={0}
            role="button"
            onKeyPress={() => togglePhotoTipsContent()}
            onClick={() => togglePhotoTipsContent()}
            className="photoTips">
            Nos astuces photos
          </div>
          <div id="photoTipsContent" className="invisible">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda vero
            ratione cum voluptatibus, omnis sit magnam possimus eligendi blanditiis, ab
            quas facilis quod neque porro totam dolorum provident repellendus cupiditate.
          </div>
        </div>

        <div className="photosContainer">
          {images.map((image: Array<any>, index) => (
            <img
              className={image[1] !== null ? 'image' : 'invisible'}
              key={index}
              src={image[1]}
              alt={`n°${index} de l'annonce`}
            />
          ))}
        </div>
        {/* ---------------------------Input for title offer------------------------ */}
        <div>
          <label className="offerForm__label" htmlFor="title">
            <MdStarRate className="iconRequired" /> Titre
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="offerForm__input"
            type="text"
            id="title"
          />
        </div>
        {/* ---------------------------Input for description offer------------------------ */}
        <div>
          <label className="offerForm__label" htmlFor="description">
            <MdStarRate className="iconRequired" /> Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="offerForm__input"
            rows={5}
            id="description"
          />
          <div
            tabIndex={0}
            role="button"
            onKeyPress={() => toggleDescriptionTipsContent()}
            onClick={() => toggleDescriptionTipsContent()}
            className="descriptionTips">
            Conseils pour bien décrire votre article
          </div>
          <div id="descriptionTipsContent" className="invisible">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda vero
            ratione cum voluptatibus, omnis sit magnam possimus eligendi blanditiis, ab
            quas facilis quod neque porro totam dolorum provident repellendus cupiditate.
          </div>
        </div>
        {/* ---------------------------Select for sports------------------------ */}
        <div className="offerForm__items">
          <label className="offerForm__label" htmlFor="sports">
            <MdStarRate className="iconRequired" /> Sport
          </label>
          <select
            onChange={(e) => setSport(e.target.value)}
            value={sport}
            className="offerForm__select"
            id="sports">
            <option value="" id="sport"></option>
            {sportList &&
              sportList.map((sport, index) => (
                <option key={index} value={sport.id_sport}>
                  {sport.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for genders------------------------ */}
        <div className="offerForm__items">
          <label className="offerForm__label" htmlFor="genders">
            <MdStarRate className="iconRequired" /> Genre
          </label>
          <select
            onChange={(e) => {
              setGenderAdult(Number(e.target.value));
              e.target.value === '4'
                ? (setGenderIsChild(1), setGender(null))
                : (setGenderIsChild(0), setGender(Number(e.target.value)));
            }}
            value={Number(genderAdult)}
            className="offerForm__select"
            id="genders">
            {gendersList.map((gender, index) => (
              <option key={index} value={gender.id_gender}>
                {gender.adult_name}
              </option>
            ))}
            <option value={4}>Enfant</option>
          </select>
        </div>
        {genderIsChild === 1 && (
          <div className="offerForm__items conditionnal">
            <select
              onChange={(e) => {
                setGenderChild(Number(e.target.value)), setGender(Number(e.target.value));
              }}
              value={Number(genderChild)}
              className="offerForm__select">
              {gendersList
                .filter((children) => children.child_name)
                .map((gender, index) => (
                  <option key={index} value={gender.id_gender}>
                    {gender.child_name === 'Neutre' ? 'Tous' : gender.child_name}
                  </option>
                ))}
            </select>
          </div>
        )}
        {/* ---------------------------Select for categories------------------------ */}
        <div className="offerForm__items">
          <label className="offerForm__label" htmlFor="categories">
            <MdStarRate className="iconRequired" /> Catégorie
          </label>

          <select
            onChange={(e) => {
              setItem('');
              setCategory(e.target.value);
              e.target.value === '1'
                ? (setCategoryIsClothes(true), setShowSizes(true))
                : setCategoryIsClothes(false);
              e.target.value === '2' && setShowSizes(true);
              e.target.value === '3' && setShowSizes(false);
            }}
            value={category}
            className="offerForm__select"
            id="categories">
            <option value=""></option>
            {categoryList &&
              categoryList.map((category, index) => (
                <option key={index} value={category.id_category}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for category is clothes------------------------ */}
        {categoryIsClothes && (
          <div className="offerForm__items conditionnal">
            <label className="offerForm__label" htmlFor="textile">
              Matière
            </label>
            <select
              onChange={(e) => setTextile(e.target.value)}
              value={textile}
              className="offerForm__select"
              id="textile">
              <option value=""></option>
              {textileList &&
                textileList.map((textile, index) => (
                  <option key={index} value={textile.id_textile}>
                    {textile.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        {/* ---------------------------Select for items------------------------ */}
        <div className="offerForm__items">
          <label className="offerForm__label" htmlFor="items">
            <MdStarRate className="iconRequired" /> Article
          </label>
          <select
            onChange={(e) => {
              handleItemSelected(e.target.value);
              setItem(e.target.value);
              itemInfos?.id_size_type === 1 ||
              itemInfos?.id_size_type === 2 ||
              itemInfos?.id_size_type === 3 ||
              itemInfos?.id_size_type === 6
                ? setShowSizes(true)
                : setShowSizes(false);
            }}
            value={item}
            className="offerForm__select"
            id="items">
            <option value=""></option>
            {itemList &&
              itemList.map((item, index) => (
                <option key={index} value={item.id_item}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for brands------------------------ */}
        <div className="offerForm__items">
          <label className="offerForm__label" htmlFor="brands">
            Marque
          </label>
          <select
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            className="offerForm__select"
            id="brands">
            <option value=""></option>
            {brandList &&
              brandList.map((brand, index) => (
                <option key={index} value={brand.id_brand}>
                  {brand.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for sizes------------------------ */}
        {showSizes && (
          <div className="offerForm__items">
            <label className="offerForm__label" htmlFor="sizes">
              <MdStarRate className="iconRequired" /> Taille
            </label>
            <select
              onChange={(e) => setSize(e.target.value)}
              value={size}
              className="offerForm__select"
              id="sizes">
              <option value=""></option>
              {sizeList &&
                sizeList.map((size, index) => (
                  <option key={index} value={size.id_size}>
                    {(category === '1' && genderIsChild) || itemInfos?.id_size_type === 6
                      ? `${size.age_child}`
                      : category === '1' ||
                        itemInfos?.id_size_type === 2 ||
                        itemInfos?.id_size_type === 3
                      ? size.size_int !== null
                        ? `${size.size_int}/${size.size_eu}/${size.size_uk}`
                        : `${size.age_child}`
                      : category === '2' || itemInfos?.id_size_type === 1
                      ? `${size.size_eu}`
                      : ''}
                  </option>
                ))}
            </select>
          </div>
        )}
        {/* ---------------------------Select for color1------------------------ */}
        <div className="offerForm__items">
          <label className="offerForm__label" htmlFor="color1">
            Couleur 1
          </label>
          <select
            onChange={(e) => setColor1(e.target.value)}
            value={color1}
            className="offerForm__select"
            id="color1">
            <option value=""></option>
            {colorList &&
              colorList.map((color, index) => (
                <option key={index} value={color.id_color}>
                  {color.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for color2------------------------ */}
        <div className="offerForm__items">
          <label className="offerForm__label" htmlFor="color2">
            Couleur 2
          </label>
          <select
            onChange={(e) => setColor2(e.target.value)}
            value={color2}
            className="offerForm__select"
            id="color2">
            <option value=""></option>
            {colorList &&
              colorList.map((color, index) => (
                <option key={index} value={color.id_color}>
                  {color.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for conditions------------------------ */}
        <div className="offerForm__items">
          <label className="offerForm__label" htmlFor="conditions">
            <MdStarRate className="iconRequired" /> État du produit
          </label>
          <select
            onChange={(e) => setCondition(e.target.value)}
            value={condition}
            className="offerForm__select"
            id="conditions">
            <option value=""></option>
            {conditionList &&
              conditionList.map((condition, index) => (
                <option key={index} value={condition.id_condition}>
                  {condition.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for price------------------------ */}
        <div className="offerForm__price">
          <label className="offerForm__label" htmlFor="price">
            <MdStarRate className="iconRequired" /> Prix hors frais de port
          </label>
          <input
            value={price || ''}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="offerForm__input"
            type="number"
            step={0.01}
            id="price"
          />
          €
        </div>
        {/* ---------------------------Input for weight------------------------ */}
        <div className="offerForm__weight">
          <label className="offerForm__label" htmlFor="weight">
            {weightRequired && <MdStarRate className="iconRequired" />} Format du colis{' '}
            <FaQuestionCircle
              className="questionIcon"
              onClick={() => toggleWeightTipsContent()}
            />
          </label>
          <input
            value={weight || ''}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="offerForm__input"
            type="number"
            step={1}
            id="weight"
          />
          g
        </div>
        <div id="weightTipsContent" className="invisible">
          <p>
            Estimez au mieux le poids de votre colis. Si votre colis a été sous-évalué, il
            pourrait se retrouver bloqué et engendrer un coût supplémentaire
            <br />
            <span className="bold">Besoin d&apos;aide ?</span>
            <br />
            Pas de pèse personne ou balance de cuisine chez vous? Pas de panique ! Voici
            quelques exemples de poids moyens
          </p>
          <div>
            <table className="offerForm__weight__table">
              <thead>
                <tr>
                  <th>Exemple de produit</th>
                  <th>Poids</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Vêtement léger (Tee shirt, Maillot, Short, Chaussette, Legging,
                    Casquette)
                  </td>
                  <td>500g</td>
                </tr>
                <tr>
                  <td>Ballon de foot</td>
                  <td>500g</td>
                </tr>
                <tr>
                  <td>Ballon de basket</td>
                  <td>1000g</td>
                </tr>
                <tr>
                  <td>Survêtement, pull, vêtement de montagne (1 pièce)</td>
                  <td>1000g</td>
                </tr>
                <tr>
                  <td>Basket de running dans une boîte</td>
                  <td>1500g</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* ---------------------------Input for Deliveries------------------------ */}
        <div className="offerForm__deliveries">
          <span className="offerForm__switchContainer__span">
            <MdStarRate className="iconRequired" /> Modes de livraison :
          </span>
          <div className="delivererList">
            <div className="offerForm__switchContainer">
              <span className="offerForm__switchContainer__span">
                Remise en main propre:
              </span>
              <label className="switch">
                <input
                  checked={handDelivery ? true : false}
                  onChange={() => {
                    handDelivery ? setHandDelivery(0) : setHandDelivery(1);
                  }}
                  type="checkbox"
                />
                <span className="slider round"></span>
              </label>
            </div>
            {delivererList &&
              delivererList.map((deliverer) => (
                <div key={deliverer.id_deliverer} className="offerForm__switchContainer">
                  <span className="offerForm__switchContainer__span">
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
        <div className="offerForm__switchContainer">
          <span className="offerForm__switchContainer__span">
            Enregistrer comme brouillon et mettre en vente plus tard
          </span>
          <label className="switch">
            <input
              checked={isDraft ? true : false}
              onChange={() => {
                isDraft ? setIsDraft(0) : setIsDraft(1);
              }}
              type="checkbox"
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div id="errorsDescription" className="offerForm__errorsDescription"></div>
        <div className="offerForm__submitContainer">
          <button className="btn" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOffer;
