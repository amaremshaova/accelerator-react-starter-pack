import ProductCard from '../product-card/product-card';
import { useSelector } from 'react-redux';
import { getGuitars } from '../../store/guitar-data/selectors';
import Filters from '../filters/filters';
import Sorting from '../sorting/sorting';
import Pagination from '../pagination/pagination';


function ProductList():JSX.Element{

  const guitars = useSelector(getGuitars);

  return(
    <div className="catalog">
      <Filters/>
      <Sorting/>
      <div className="cards catalog__cards">
        {guitars.map((guitar) =>
          <ProductCard key={guitar.id} product={guitar}/>)}
      </div>
      <Pagination/>
    </div>
  );
}

export default ProductList;
