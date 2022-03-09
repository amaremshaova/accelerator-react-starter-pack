import { MouseEvent, useState } from 'react';
import {useSelector } from 'react-redux';
import { AppRoute } from '../../const';
import { getCommentsCount} from '../../store/product-data/selectors';
import { Guitar } from '../../types/guitar';
import { GuitarTypeRU } from '../filters/filters';
import LoadingScreen from '../loading-screen/loading-screen';
import Rating from '../rating/rating';

type ProductInfoProps = {
  product: Guitar | undefined,
  onSetOpenModalAdd:(open: boolean) => void;
}

const enum Tab {
  Specifications = 'Характеристики',
  Description = 'Описание'
}

const enum RatingProperty {
  Width = 14,
  Height = 14
}

const TEXT_LOADING = 'Загрузка информации о товаре...';

function ProductInfo({product, onSetOpenModalAdd} : ProductInfoProps) : JSX.Element {

  const [activeTab, setActiveTab] = useState<Tab>(Tab.Specifications);

  const handleTabClick = (evt: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, tab: Tab) => {
    evt.preventDefault();
    setActiveTab(tab);
  };

  const isLoad = product !== undefined;
  const commentsCount = useSelector(getCommentsCount).filter((item) => item.id === product?.id)[0]?.count;

  return (
    isLoad ?
      <div className="product-container">
        <img className="product-container__img" src={product.previewImg} width="90" height="235" alt=""/>
        <div className="product-container__info-wrapper">
          <h2 className="product-container__title title title--big title--uppercase">{product.name}</h2>
          <div className="rate product-container__rating" aria-hidden="true">
            <span className="visually-hidden">Рейтинг:</span>
            <Rating
              rating={product.rating}
              id={String(product.id)}
              width={RatingProperty.Width}
              height={RatingProperty.Height}
            />
            <span className="rate__count">{commentsCount}</span>
            <span className="rate__message"></span>
          </div>
          <div className="tabs">
            <a className={`button button--medium tabs__button
            ${activeTab !== Tab.Specifications ? 'button--black-border' : ''}`}
            href="#characteristics"
            onClick={(evt) => handleTabClick(evt, Tab.Specifications)}
            >
                Характеристики
            </a>
            <a className={`button button--medium tabs__button
              ${activeTab !== Tab.Description ? 'button--black-border' : ''}`}
            href="#description"
            onClick={(evt) => handleTabClick(evt, Tab.Description)}
            >
                Описание
            </a>
            <div className="tabs__content" id="characteristics">
              <table className={`tabs__table ${activeTab !== Tab.Specifications ? 'hidden' : ''}`}>
                <thead>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Артикул:</td>
                    <td className="tabs__value">{product.vendorCode}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Тип:</td>
                    <td className="tabs__value">{GuitarTypeRU[product.type]}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Количество струн:</td>
                    <td className="tabs__value">{product.stringCount} струнная</td>
                  </tr>
                </thead>
              </table>
              <p className={`tabs__product-description  ${activeTab !== Tab.Description ? 'hidden' : ''}`}>
                {product.description}
              </p>
            </div>
          </div>
        </div>
        <div className="product-container__price-wrapper">
          <p className="product-container__price-info product-container__price-info--title">Цена:</p>
          <p className="product-container__price-info product-container__price-info--value">
            {new Intl.NumberFormat('ru').format(product.price)} ₽
          </p>
          <a className="button button--red button--big product-container__button" href={AppRoute.Empty}
            onClick={(evt) => {
              evt.preventDefault();
              evt.currentTarget.blur();
              onSetOpenModalAdd(true);
              evt.currentTarget.blur();
            }}
          >
            Добавить в корзину
          </a>
        </div>
      </div>
      : <LoadingScreen textLoading={TEXT_LOADING}/>
  );
}


export default ProductInfo;
