import ProductCard from '../product-card/product-card';
import { useDispatch, useSelector } from 'react-redux';
import { getGuitars, getMinPrice, getMaxPrice} from '../../store/guitar-data/selectors';
import Filters from '../filters/filters';
import Sorting from '../sorting/sorting';
import Pagination from '../pagination/pagination';
import { useEffect, useState } from 'react';
import {useParams, useSearchParams } from 'react-router-dom';
import {fetchCommentsCountAction, fetchGuitarsAction, fetchGuitarsCountAction } from '../../store/api-actions';
import { COUNT_CARDS } from '../catalog/catalog';


export enum SortType {
  Price = 'price',
  Rating = 'rating',
}

export enum SortOrder {
  Up = 'asc',
  Down = 'desc'
}


function ProductList():JSX.Element{

  const guitars = useSelector(getGuitars);
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);

  const dispatch = useDispatch();

  const {id} = useParams<{id?: string}>();
  const pageId = Number(id);
  const [page, setPage] = useState(pageId);

  const startCard = (page - 1) * COUNT_CARDS;
  const endCard = startCard + COUNT_CARDS;

  const [searchParams] = useSearchParams();

  const [sortType, setSortType] = useState<string | null>(null);
  const [sortOrder, setSortDirect] = useState<string>(SortOrder.Up);

  const [minPriceInput, setMinPriceInput] = useState<number | null>(
    Number(null));
  const [maxPriceInput, setMaxPriceInput] = useState<number | null>(
    Number(null));

  const [guitarsTypes, setGuitarsTypes] = useState<string[]>(searchParams.getAll('type'));
  const [stringsCount, setStringsCount] = useState<number[]>(searchParams.getAll('stringCount')
    .map((item) => Number(item)));

  /*guitars.forEach((guitar) =>
    dispatch(fetchCommentsCountAction(guitar.id)));*/

  useEffect(() => {
    guitars.forEach((guitar) =>
      dispatch(fetchCommentsCountAction(guitar.id)));
  }, [dispatch, guitars]);

  useEffect(() => {

    dispatch(fetchGuitarsAction(
      {
        sortType: sortType,
        order: sortOrder,
        start: startCard,
        end: endCard,
        min: minPriceInput,
        max: maxPriceInput,
        types: guitarsTypes,
        strings: stringsCount,
      }));

    dispatch(fetchGuitarsCountAction(
      {
        sortType: sortType,
        order: sortOrder,
        start: startCard,
        end: endCard,
        min: minPriceInput,
        max: maxPriceInput,
        types: guitarsTypes,
        strings: stringsCount,
      }));


  }, [dispatch,
    minPriceInput,
    maxPriceInput,
    endCard,
    startCard,
    sortType,
    sortOrder,
    maxPrice,
    minPrice,
    guitarsTypes,
    stringsCount]);

  return(
    <div className="catalog">
      <Filters
        minPrice = {minPrice}
        maxPrice = {maxPrice}
        minPriceInput = {minPriceInput}
        maxPriceInput = {maxPriceInput}
        onSetMinPriceInput = {setMinPriceInput}
        onSetMaxPriceInput = {setMaxPriceInput}
        guitarTypes={guitarsTypes}
        onSetGuitarType = {setGuitarsTypes}
        stringsCount = {stringsCount}
        onSetStringsCount = {setStringsCount}
        onSetPage = {setPage}
      />
      <Sorting
        sortTypeActive = {sortType}
        sortOrderActive = {sortOrder}
        onSetSortType = {setSortType}
        onSetSortDirect = {setSortDirect}
      />
      <div className="cards catalog__cards">
        {
          guitars.map((guitar) =>
            <ProductCard key={guitar.id} product={guitar}/>,
          )
        }
      </div>
      <Pagination pageActive={page} onSetPage = {setPage}/>
    </div>
  );
}

export default ProductList;
