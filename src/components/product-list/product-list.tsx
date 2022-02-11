import ProductCard from '../product-card/product-card';
import { useDispatch, useSelector } from 'react-redux';
import { getGuitars, getMinPrice, getMaxPrice, getIsLoadData} from '../../store/guitar-data/selectors';
import Filters from '../filters/filters';
import Sorting from '../sorting/sorting';
import Pagination from '../pagination/pagination';
import { useEffect, useState } from 'react';
import {useLocation, useParams, useSearchParams } from 'react-router-dom';
import {fetchGuitarsAction } from '../../store/api-actions';
import { COUNT_CARDS } from '../catalog/catalog';
import LoadingScreen from '../loading-screen/loading-screen';

export enum SortType {
  Price = 'price',
  Rating = 'rating',
}

export enum SortOrder {
  Up = 'asc',
  Down = 'desc'
}

const TEXT_LOADING = 'Загрузка товаров...';


function ProductList():JSX.Element{

  const guitars = useSelector(getGuitars);
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);
  const isLoadData = useSelector(getIsLoadData);

  const dispatch = useDispatch();

  const {id} = useParams<{id?: string}>();
  const pageId = Number(id);
  const [page, setPage] = useState(pageId);

  const startCard = (page - 1) * COUNT_CARDS;
  const endCard = startCard + COUNT_CARDS;

  const [searchParams] = useSearchParams();

  const history = useLocation();

  const [sortType, setSortType] = useState<string | null>(null);
  const [sortOrder, setSortDirect] = useState<string>(SortOrder.Up);

  const [minPriceInput, setMinPriceInput] = useState<number>(
    Number(searchParams.get('price_gte')));
  const [maxPriceInput, setMaxPriceInput] = useState<number>(
    Number(searchParams.get('price_lte')));

  const [guitarsTypes, setGuitarsTypes] = useState<string[]>(searchParams.getAll('type'));
  const [stringsCount, setStringsCount] = useState<number[]>(searchParams.getAll('stringCount')
    .map((item) => Number(item)));

  useEffect(() => {
    if (history.search === ''){
      setGuitarsTypes([]);
      setStringsCount([]);
    }
  }, [history.search]);

  useEffect(() => {
    dispatch(fetchGuitarsAction(
      {
        sortType: sortType,
        order: sortOrder,
        start: startCard,
        end: endCard,
        min: minPriceInput === 0 ? minPrice : minPriceInput,
        max: maxPriceInput === 0 ? maxPrice : maxPriceInput,
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
          isLoadData ? guitars.map((guitar) =>
            <ProductCard key={guitar.id} product={guitar} />,
          ) :  <LoadingScreen textLoading={TEXT_LOADING}/>
        }
      </div>
      <Pagination pageActive={page} onSetPage = {setPage}/>
    </div>
  );
}

export default ProductList;


