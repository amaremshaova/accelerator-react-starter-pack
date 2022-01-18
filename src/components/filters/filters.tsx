import { ChangeEvent,  useEffect, useState} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { AppRoute } from '../../const';


const FIRST_PAGE = 1;

export enum GuitarType {
  Ukulele = 'ukulele',
  Acoustic = 'acoustic',
  Electric = 'electric',
}

export enum StringsCount {
  Four = 4,
  Six = 6,
  Seven = 7,
  Twelve = 12
}

export const GuitarStrings = {
  [GuitarType.Ukulele]: [StringsCount.Four],
  [GuitarType.Acoustic] : [StringsCount.Six, StringsCount.Seven, StringsCount.Twelve],
  [GuitarType.Electric] : [StringsCount.Four, StringsCount.Six, StringsCount.Seven],
};


export type FiltersProps = {
  minPrice: number | null,
  maxPrice: number | null,
  minPriceInput: number | null,
  maxPriceInput: number | null,
  onSetMinPriceInput: (min: number | null) => void,
  onSetMaxPriceInput: (max: number | null) => void,
  guitarTypes: string[],
  onSetGuitarType: (type: string[]) => void,
  stringsCount: number[],
  onSetStringsCount: (count: number[]) => void,
  onSetPage: (page: number) => void,
}

function Filters(props: FiltersProps):JSX.Element{

  const {
    minPrice,
    maxPrice,
    minPriceInput,
    maxPriceInput,
    onSetMinPriceInput,
    onSetMaxPriceInput,
    guitarTypes,
    onSetGuitarType,
    stringsCount,
    onSetStringsCount,
    onSetPage} = props;

  const [stringsType, setStringsType] = useState<StringsCount[]>([]);

  const history = useNavigate();
  const location = useLocation();

  const handleChangeValidateMinPrice = (target : EventTarget & HTMLInputElement) => {
    target.value = String(Math.abs(Number(target.value)));
  };

  const handleChangeValidateMaxPrice = (target : EventTarget & HTMLInputElement) => {
    target.value = String(Math.abs(Number(target.value)));
  };

  const handleValidateMinPrice = (target : EventTarget & HTMLInputElement) => {

    if ((minPrice !== null && maxPrice !== null)
     && (Number(target.value) < minPrice ||
      (maxPriceInput !== 0 && Number(target.value) > Number(maxPriceInput)) ||
       Number(target.value) > maxPrice)){
      target.value = String(minPrice);
      onSetMinPriceInput(minPrice);
    }
    else{
      onSetMinPriceInput(Number(target.value));
      onSetPage(FIRST_PAGE);

      if (Number(maxPriceInput) === 0) {
        onSetMaxPriceInput(maxPrice);
      }
    }
  };

  const handleValidateMaxPrice = (target : EventTarget & HTMLInputElement ) => {
    if ((minPrice !== null && maxPrice !== null)
     && (Number(target.value) > maxPrice ||
     Number(target.value) < minPrice ||

     (minPriceInput !== 0 && Number(target.value) < Number(minPriceInput)))){
      target.value = String(maxPrice);
      onSetMaxPriceInput(maxPrice);
    }
    else{
      onSetMaxPriceInput(Number(target.value));
      onSetPage(FIRST_PAGE);

      if (Number(minPriceInput) === 0) {
        onSetMinPriceInput(minPrice);
      }
    }
  };

  const handleAddGuitarType = (evt: ChangeEvent<HTMLInputElement>, name: string) => {
    onSetPage(FIRST_PAGE);
    if (evt.target.checked && !guitarTypes.includes(name)){
      onSetGuitarType([...guitarTypes, name]);
    }
    if (!evt.target.checked && guitarTypes.includes(name)){
      const guitars = guitarTypes.filter((item) => item !== name);
      onSetGuitarType(guitars);
    }
    onSetStringsCount(stringsCount.filter((count) => stringsType.includes(count)));
  };

  const handleAddStringsCount = (evt: ChangeEvent<HTMLInputElement>, count: number) => {
    onSetPage(FIRST_PAGE);
    if (evt.target.checked && !stringsCount.includes(count)){
      onSetStringsCount([...stringsCount, count]);
    }
    if (!evt.target.checked && stringsCount.includes(count)){
      const strings = stringsCount.filter((item) => item !== count);
      onSetStringsCount(strings);
    }
  };

  useEffect(() =>{
    let typeFilter = guitarTypes.length !== 0 ? guitarTypes.map((item, index) => `type=${item}`).join('&') : '';
    typeFilter = typeFilter !== '' ? `&${typeFilter}` : '';

    let priceFilter = (minPriceInput !== 0) && (maxPriceInput !== 0) ? `price_gte=${minPriceInput}&price_lte=${maxPriceInput}` : '';
    priceFilter = priceFilter !== '' ? `&${priceFilter}` : '';

    let stringsCountFilter = stringsCount.length !== 0 ? stringsCount.map((item) => `stringCount=${item}`).join('&') : '';
    stringsCountFilter = stringsCountFilter !== '' ? `&${stringsCountFilter}` : '';

    const filter = typeFilter + stringsCountFilter + priceFilter;

    history(`${location.pathname }?${  filter}`);

  }, [guitarTypes, history, location.pathname, maxPriceInput, minPriceInput, onSetPage, stringsCount, stringsType]);


  useEffect (() => {
    const strings: StringsCount[] = [];

    if (guitarTypes.length !== 0) {
      guitarTypes.forEach((item) => {
        if (item === GuitarType.Acoustic){
          GuitarStrings[GuitarType.Acoustic].forEach((number) => strings.push(number));
        }
        if (item === GuitarType.Electric){
          GuitarStrings[GuitarType.Electric].forEach((number) => strings.push(number));
        }
        if (item === GuitarType.Ukulele){
          GuitarStrings[GuitarType.Ukulele].forEach((number) => strings.push(number));
        }
      });
    }

    return setStringsType([...new Set(strings)]);
  }, [guitarTypes]);

  return(
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder={Number(minPrice) === 0 ? '' : String(minPrice)}
              data-testid="priceMin"
              id="priceMin"
              name="от"
              onChange={({target}: ChangeEvent<HTMLInputElement>) =>{
                history(`${AppRoute.StartPage}/${  location.search}`);
                handleChangeValidateMinPrice(target);
              }}
              onBlur={({target}: ChangeEvent<HTMLInputElement>) => handleValidateMinPrice(target)}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={Number(maxPrice) === 0  ? '' : String(maxPrice)}
              data-testid="priceMax"
              id="priceMax"
              name="до"
              onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                history(`${AppRoute.StartPage}/${  location.search}`);
                handleChangeValidateMaxPrice(target);
              }}
              onBlur={({target}: ChangeEvent<HTMLInputElement>) => handleValidateMaxPrice(target)}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            data-testid = "acoustic"
            id="acoustic"
            name="acoustic"
            checked={guitarTypes.includes(GuitarType.Acoustic)}
            onChange={(evt)=>{
              history(`${AppRoute.StartPage}/${  location.search}`);
              handleAddGuitarType(evt, GuitarType.Acoustic);
            }}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            data-testid = "electric"
            id="electric"
            name="electric"
            checked={guitarTypes.includes(GuitarType.Electric)}
            onChange={(evt)=>{
              history(`${AppRoute.StartPage}/${  location.search}`);
              handleAddGuitarType(evt, GuitarType.Electric);
            }}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            data-testid = "ukulele"
            id="ukulele"
            name="ukulele"
            checked={guitarTypes.includes(GuitarType.Ukulele)}
            onChange={(evt)=>{
              history(`${AppRoute.StartPage}/${  location.search}`);
              handleAddGuitarType(evt, GuitarType.Ukulele);
            }}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            data-testid = "4-strings"
            id="4-strings"
            name="4-strings"
            checked={stringsCount.includes(StringsCount.Four)}
            onChange={(evt)=> {
              history(`${AppRoute.StartPage}/${  location.search}`);
              handleAddStringsCount(evt, StringsCount.Four);
            }}
            disabled = {guitarTypes.length !== 0 && !stringsType.includes(StringsCount.Four)}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            data-testid = "6-strings"
            id="6-strings"
            name="6-strings"
            checked={stringsCount.includes(StringsCount.Six)}
            onChange={(evt)=> {
              history(`${AppRoute.StartPage}/${  location.search}`);
              handleAddStringsCount(evt, StringsCount.Six);
            }}
            disabled = {guitarTypes.length !== 0 && !stringsType.includes(StringsCount.Six) }
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            data-testid = "7-strings"
            id="7-strings"
            name="7-strings"
            checked={stringsCount.includes(StringsCount.Seven)}
            onChange={(evt)=> {
              history(`${AppRoute.StartPage}/${  location.search}`);
              handleAddStringsCount(evt, StringsCount.Seven);
            }}
            disabled = {guitarTypes.length !== 0 && !stringsType.includes(StringsCount.Seven) }
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            data-testid = "12-strings"
            id="12-strings"
            name="12-strings"
            checked={stringsCount.includes(StringsCount.Twelve)}
            onChange={(evt)=> {
              history(`${AppRoute.StartPage}/${  location.search}`);
              handleAddStringsCount(evt, StringsCount.Twelve);
            }}
            disabled = {guitarTypes.length !== 0 && !stringsType.includes(StringsCount.Twelve) }
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}


export default Filters;
