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
import IOfferDeliverer from '../../../../interfaces/IOfferDeliverer';
import ISize from '../../../../interfaces/ISize';
import ISport from '../../../../interfaces/ISport';
import ITextile from '../../../../interfaces/ITextile';

const urlBack = import.meta.env.VITE_URL_BACK;

const UpdateOffer = () => {
  // Take id to params url
  const { id } = useParams();

  // UseState for dispaly informations
  const [sports, setSports] = useState<ISport[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [textiles, setTextiles] = useState<ITextile[]>([]);
  const [colors, setColors] = useState<IColor[]>([]);
  const [conditions, setConditions] = useState<ICondition[]>([]);
  const [sizes, setSizes] = useState<ISize[]>([]);
  const [deliverers, setDeliverers] = useState<IDeliverer[]>([]);
  const [genders, setGenders] = useState<IGender[]>([]);

  // useState for update offer
  const [pictures, setPictures] = useState<Array<string>>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sport, setSport] = useState<number>(0);
  const [gender, setGender] = useState<number>(0);
  const [genderAdult, setGenderAdult] = useState<number>(0);
  const [genderChild, setGenderChild] = useState<number>(0);
  const [genderIsChild, setGenderIsChild] = useState<number>(0);
  const [category, setCategory] = useState<number>(0);
  const [item, setItem] = useState<number>(0);
  const [itemInfos, setItemInfos] = useState<IItem>();
  const [categoryIsClothes, setCategoryIsClothes] = useState<boolean>(false);
  const [brand, setBrand] = useState<number>(0);
  const [textile, setTextile] = useState<string>('');
  const [color1, setColor1] = useState<number>(0);
  const [color2, setColor2] = useState<number>(0);
  const [condition, setCondition] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [showSizes, setShowSizes] = useState<boolean>(false);
  const [size, setSize] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [weightRequired, setWeightRequired] = useState<boolean>(false);
  const [handDelivery, setHandDelivery] = useState<number>(0);
  const [isDraft, setIsDraft] = useState<number>(0);
  const [offer, setOffer] = useState<IOffer>();
  const [deliverersArray, setDeliverersArray] = useState<Array<number>>([]);
  const [deliverersArrayInitial, setDeliverersArrayInitial] = useState<IOfferDeliverer[]>(
    [],
  );

  // Axios call to display select
  useEffect(() => {
    axios.get<ISport[]>(`${urlBack}/sports`).then((res) => setSports(res.data));
    axios
      .get<ICategory[]>(`${urlBack}/categories`)
      .then((res) => setCategories(res.data));
    axios.get<IItem[]>(`${urlBack}/items`).then((res) => setItems(res.data));
    axios.get<IBrand[]>(`${urlBack}/brands`).then((res) => setBrands(res.data));
    axios.get<ITextile[]>(`${urlBack}/textiles`).then((res) => setTextiles(res.data));
    axios.get<IColor[]>(`${urlBack}/colors`).then((res) => setColors(res.data));
    axios
      .get<ICondition[]>(`${urlBack}/conditions`)
      .then((res) => setConditions(res.data));
    axios.get<ISize[]>(`${urlBack}/sizes`).then((res) => setSizes(res.data));
    axios
      .get<IDeliverer[]>(`${urlBack}/deliverers`)
      .then((res) => setDeliverers(res.data));
    axios.get<IGender[]>(`${urlBack}/genders`).then((res) => setGenders(res.data));
    axios.get<IOfferDeliverer[]>(`${urlBack}/offers/${id}/offer_deliv`).then((res) => {
      setDeliverersArray(res.data.map((deliverer) => deliverer.id_deliverer));
      setDeliverersArrayInitial(res.data);
    });
    axios.get<IOffer>(`${urlBack}/offers/${id}`).then((res) => {
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
      setPictures([
        res.data.picture1,
        res.data.picture2,
        res.data.picture3,
        res.data.picture4,
        res.data.picture5,
        res.data.picture6,
        res.data.picture7,
        res.data.picture8,
        res.data.picture9,
        res.data.picture10,
        res.data.picture11,
        res.data.picture12,
        res.data.picture13,
        res.data.picture14,
        res.data.picture15,
        res.data.picture16,
        res.data.picture17,
        res.data.picture18,
        res.data.picture19,
        res.data.picture20,
      ]);
    });
  }, [id]);

  useEffect(() => {
    category &&
      axios.get<IItem[]>(`${urlBack}/categories/${category}/items`).then((res) => {
        setItems(res.data);
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
      ? axios.get<ISize[]>(`${urlBack}/items/${item}/sizes${filters}`).then((res) => {
          setSizes(res.data);
        })
      : category
      ? axios
          .get<ISize[]>(`${urlBack}/categories/${category}/sizes${filters}`)
          .then((res) => {
            setSizes(res.data);
          })
      : (setSizes([]), setShowSizes(false));
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
      .get<IItem>(`${urlBack}/items/${id}`)
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
    if (sport === 0) {
      errorsMessage.push('Veuillez préciser un sport');
      errors = true;
    }
    if (category === 0) {
      errorsMessage.push('Veuillez préciser une catégorie');
      errors = true;
    }
    if (item === 0) {
      errorsMessage.push('Veuillez selectionner un article');
      errors = true;
    }
    if (showSizes && size === 0) {
      errorsMessage.push('Veuillez renseigner une taille');
      errors = true;
    }
    if (condition === 0) {
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
    if (deliverersArray.length !== 0 && weight === null) {
      errorsMessage.push("Veuillez renseigner le poids de l'article");
      errors = true;
    }

    if (errors) {
      e.preventDefault();
      errorsMessage.map((message) => {
        const p = document.createElement('p');
        p.append(message);
        errorsDescription?.append(p);
      });
      errorsDescription?.setAttribute('display', 'bloc');
    }
    if (!errors) {
      errorsDescription?.setAttribute('display', 'none');

      const newOffer = {
        title,
        picture1: pictures[0],
        description,
        id_sport: sport,
        id_gender: gender,
        is_child: genderIsChild,
        id_category: category,
        id_item: item,
        id_brand: brand ? brand : 0,
        id_textile: textile ? textile : 0,
        id_size: size ? size : 0,
        id_color1: color1 ? color1 : 0,
        id_color2: color2 ? color2 : 0,
        id_condition: condition,
        price: Number(Number(price).toFixed(2)),
        weight: Number(Number(weight).toFixed(0)),
        hand_delivery: handDelivery,
        is_archived: 0,
        is_draft: isDraft,
        picture2: pictures[1] ? pictures[1] : 'null',
        picture3: pictures[2] ? pictures[2] : 'null',
        picture4: pictures[3] ? pictures[3] : 'null',
        picture5: pictures[4] ? pictures[4] : 'null',
        picture6: pictures[5] ? pictures[5] : 'null',
        picture7: pictures[6] ? pictures[6] : 'null',
        picture8: pictures[7] ? pictures[7] : 'null',
        picture9: pictures[8] ? pictures[8] : 'null',
        picture10: pictures[9] ? pictures[9] : 'null',
        picture11: pictures[10] ? pictures[10] : 'null',
        picture12: pictures[11] ? pictures[11] : 'null',
        picture13: pictures[12] ? pictures[12] : 'null',
        picture14: pictures[13] ? pictures[13] : 'null',
        picture15: pictures[14] ? pictures[14] : 'null',
        picture16: pictures[15] ? pictures[15] : 'null',
        picture17: pictures[16] ? pictures[16] : 'null',
        picture18: pictures[17] ? pictures[17] : 'null',
        picture19: pictures[18] ? pictures[18] : 'null',
        picture20: pictures[19] ? pictures[19] : 'null',
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

  useEffect(() => {
    offer &&
      axios
        .put<IOffer>(`${urlBack}/offers/${id}`, offer)
        .then((res) => {
          res;
        })
        .catch((err) => console.log({ ...err }));
    {
      deliverersArrayInitial[0] === undefined
        ? deliverersArray.map((deliverer) => {
            const id_deliverer = deliverer;
            const id_offer = id;
            axios.post<IOfferDeliverer>(`${urlBack}/offer_deliverers`, {
              id_offer,
              id_deliverer,
            });
          })
        : axios
            .delete<IOfferDeliverer[]>(`${urlBack}/offers/${id}/offer_deliverers`)
            .then((res) => {
              res &&
                deliverersArray.map((deliverer) => {
                  const id_deliverer = deliverer;
                  const id_offer = id;
                  axios.post<IOfferDeliverer>(`${urlBack}/offer_deliverers`, {
                    id_offer,
                    id_deliverer,
                  });
                });
            })
            .catch((err) => {
              err &&
                deliverersArray.map((deliverer) => {
                  const id_deliverer = deliverer;
                  const id_offer = id;
                  axios.post<IOfferDeliverer>(`${urlBack}/offer_deliverers`, {
                    id_offer,
                    id_deliverer,
                  });
                });
            });
    }
  }, [offer]);

  return (
    <div className="updateOfferForm">
      <form
        encType="multipart/form-data"
        id="updateOfferForm"
        onSubmit={(e: React.FormEvent) => handleSubmit(e)}
        className="updateOfferForm__form"
        action=""
      >
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
            className="photoTips"
          >
            Nos astuces photos
          </div>
          <div id="photoTipsContent" className="invisible">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda vero
            ratione cum voluptatibus, omnis sit magnam possimus eligendi blanditiis, ab
            quas facilis quod neque porro totam dolorum provident repellendus cupiditate.
          </div>
        </div>

        <div className="photosContainer">
          {pictures.map((image, index) => (
            <img
              className={image !== null ? 'image' : 'invisible'}
              key={index}
              src={image}
              alt={`n°${index} de l'annonce`}
            />
          ))}
        </div>
        {/* ---------------------------Input for title offer------------------------ */}
        <div>
          <label className="updateOfferForm__label" htmlFor="title">
            Titre
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="updateOfferForm__input"
            type="text"
            id="title"
          />
        </div>
        {/* ---------------------------Input for description offer------------------------ */}
        <div>
          <label className="updateOfferForm__label" htmlFor="description">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="updateOfferForm__input"
            rows={5}
            id="description"
          />
          <div
            tabIndex={0}
            role="button"
            onKeyPress={() => toggleDescriptionTipsContent()}
            onClick={() => toggleDescriptionTipsContent()}
            className="descriptionTips"
          >
            Conseils pour bien décrire votre article
          </div>
          <div id="descriptionTipsContent" className="invisible">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda vero
            ratione cum voluptatibus, omnis sit magnam possimus eligendi blanditiis, ab
            quas facilis quod neque porro totam dolorum provident repellendus cupiditate.
          </div>
        </div>
        {/* ---------------------------Select for sports------------------------ */}
        <div className="updateOfferForm__items">
          <label className="updateOfferForm__label" htmlFor="sports">
            Sport
          </label>
          <select
            onChange={(e) => setSport(Number(e.target.value))}
            value={sport}
            className="updateOfferForm__select"
            id="sports"
          >
            <option value="" id="sport"></option>
            {sports &&
              sports.map((sport, index) => (
                <option key={index} value={sport.id_sport}>
                  {sport.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for genders------------------------ */}
        <div className="updateOfferForm__items">
          <label className="updateOfferForm__label" htmlFor="genders">
            Genre
          </label>
          <select
            onChange={(e) => {
              setGenderAdult(Number(e.target.value));
              e.target.value === '4'
                ? (setGenderIsChild(1), setGender(0))
                : (setGenderIsChild(0), setGender(Number(e.target.value)));
            }}
            value={Number(genderAdult)}
            className="updateOfferForm__select"
            id="genders"
          >
            {genders.map((gender, index) => (
              <option key={index} value={gender.id_gender}>
                {gender.adult_name}
              </option>
            ))}
            <option value={4}>Enfant</option>
          </select>
        </div>
        {genderIsChild === 1 && (
          <div className="updateOfferForm__items conditionnal">
            <select
              onChange={(e) => {
                setGenderChild(Number(e.target.value)), setGender(Number(e.target.value));
              }}
              value={Number(genderChild) || ''}
              className="updateOfferForm__select"
            >
              {genders
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
        <div className="updateOfferForm__items">
          <label className="updateOfferForm__label" htmlFor="categories">
            Catégorie
          </label>

          <select
            onChange={(e) => {
              setItem(0);
              setCategory(Number(e.target.value));
              e.target.value === '1'
                ? (setCategoryIsClothes(true), setShowSizes(true))
                : setCategoryIsClothes(false);
              e.target.value === '2' && setShowSizes(true);
              e.target.value === '3' && setShowSizes(false);
            }}
            value={category}
            className="updateOfferForm__select"
            id="categories"
          >
            <option value=""></option>
            {categories &&
              categories.map((category, index) => (
                <option key={index} value={category.id_category}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for category is clothes------------------------ */}
        {categoryIsClothes && (
          <div className="updateOfferForm__items conditionnal">
            <label className="updateOfferForm__label" htmlFor="textile">
              Matière
            </label>
            <select
              onChange={(e) => setTextile(e.target.value)}
              value={textile || ''}
              className="updateOfferForm__select"
              id="textile"
            >
              <option value=""></option>
              {textiles &&
                textiles.map((textile, index) => (
                  <option key={index} value={textile.id_textile}>
                    {textile.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        {/* ---------------------------Select for items------------------------ */}
        <div className="updateOfferForm__items">
          <label className="updateOfferForm__label" htmlFor="items">
            Article
          </label>
          <select
            onChange={(e) => {
              handleItemSelected(e.target.value);
              setItem(Number(e.target.value));
              itemInfos?.id_size_type === 1 ||
              itemInfos?.id_size_type === 2 ||
              itemInfos?.id_size_type === 3 ||
              itemInfos?.id_size_type === 6
                ? setShowSizes(true)
                : setShowSizes(false);
            }}
            value={item}
            className="updateOfferForm__select"
            id="items"
          >
            <option value=""></option>
            {items &&
              items.map((item, index) => (
                <option key={index} value={item.id_item}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for brands------------------------ */}
        <div className="updateOfferForm__items">
          <label className="updateOfferForm__label" htmlFor="brands">
            Marque
          </label>
          <select
            onChange={(e) => setBrand(Number(e.target.value))}
            value={brand || ''}
            className="updateOfferForm__select"
            id="brands"
          >
            <option value=""></option>
            {brands &&
              brands.map((brand, index) => (
                <option key={index} value={brand.id_brand}>
                  {brand.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for sizes------------------------ */}
        {showSizes && (
          <div className="updateOfferForm__items">
            <label className="updateOfferForm__label" htmlFor="sizes">
              Taille
            </label>
            <select
              onChange={(e) => setSize(Number(e.target.value))}
              value={size || ''}
              className="updateOfferForm__select"
              id="sizes"
            >
              <option value=""></option>
              {sizes &&
                sizes.map((size, index) => (
                  <option key={index} value={size.id_size}>
                    {(category === 1 && genderIsChild) || itemInfos?.id_size_type === 6
                      ? `${size.age_child}`
                      : category === 1 ||
                        itemInfos?.id_size_type === 2 ||
                        itemInfos?.id_size_type === 3
                      ? size.size_int !== null
                        ? `${size.size_int}/${size.size_eu}/${size.size_uk}`
                        : `${size.age_child}`
                      : category === 2 || itemInfos?.id_size_type === 1
                      ? `${size.size_eu}`
                      : 0}
                  </option>
                ))}
            </select>
          </div>
        )}
        {/* ---------------------------Select for color1------------------------ */}
        <div className="updateOfferForm__items">
          <label className="updateOfferForm__label" htmlFor="color1">
            Couleur 1
          </label>
          <select
            onChange={(e) => setColor1(Number(e.target.value))}
            value={color1 || ''}
            className="updateOfferForm__select"
            id="color1"
          >
            <option value=""></option>
            {colors &&
              colors.map((color, index) => (
                <option key={index} value={color.id_color}>
                  {color.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for color2------------------------ */}
        <div className="updateOfferForm__items">
          <label className="updateOfferForm__label" htmlFor="color2">
            Couleur 2
          </label>
          <select
            onChange={(e) => setColor2(Number(e.target.value))}
            value={color2 || ''}
            className="updateOfferForm__select"
            id="color2"
          >
            <option value=""></option>
            {colors &&
              colors.map((color, index) => (
                <option key={index} value={color.id_color}>
                  {color.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for conditions------------------------ */}
        <div className="updateOfferForm__items">
          <label className="updateOfferForm__label" htmlFor="conditions">
            État du produit
          </label>
          <select
            onChange={(e) => setCondition(Number(e.target.value))}
            value={condition}
            className="updateOfferForm__select"
            id="conditions"
          >
            <option value=""></option>
            {conditions &&
              conditions.map((condition, index) => (
                <option key={index} value={condition.id_condition}>
                  {condition.name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------Select for price------------------------ */}
        <div className="updateOfferForm__price">
          <label className="updateOfferForm__label" htmlFor="price">
            Prix hors frais de port
          </label>
          <input
            value={price || ''}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="updateOfferForm__input"
            type="number"
            step={0.01}
            id="price"
          />
          €
        </div>
        {/* ---------------------------Input for weight------------------------ */}
        <div className="updateOfferForm__weight">
          <label className="updateOfferForm__label" htmlFor="weight">
            {weightRequired && <MdStarRate className="iconRequired" />} Format du colis{' '}
            <FaQuestionCircle
              className="questionIcon"
              onClick={() => toggleWeightTipsContent()}
            />
          </label>
          <input
            value={weight || ''}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="updateOfferForm__input"
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
            <table className="updateOfferForm__weight__table">
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
        <div className="updateOfferForm__deliveries">
          <span className="updateOfferForm__switchContainer__span">
            Modes de livraison :
          </span>
          <div className="deliverers">
            <div className="updateOfferForm__switchContainer">
              <span className="updateOfferForm__switchContainer__span">
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
            {deliverers &&
              deliverersArray &&
              deliverers.map((deliverer) => (
                <div
                  key={deliverer.id_deliverer}
                  className="updateOfferForm__switchContainer"
                >
                  <span className="updateOfferForm__switchContainer__span">
                    {deliverer.name}
                  </span>
                  <label className="switch">
                    <input
                      checked={deliverersArray.includes(deliverer.id_deliverer)}
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
        <div className="updateOfferForm__switchContainer">
          <span className="updateOfferForm__switchContainer__span">
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
        <div id="errorsDescription" className="updateOfferForm__errorsDescription"></div>
        <div className="updateOfferForm__submitContainer">
          <button className="btn" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOffer;
