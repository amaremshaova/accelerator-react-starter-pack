import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams} from 'react-router-dom';
import { AppRoute } from '../../const';
import { fetchGuitarAction} from '../../store/api-actions';
import { getProduct, getResponseStatus } from '../../store/app-process/selectors';
import BreadCrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import Header from '../header/header';
import ModalAddProduct from '../modal-add-product/modal-add-product';
import ModalReview from '../modal-review/modal-review';
import ModalSuccessAdd from '../modal-success-add/modal-success-add';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import ProductInfo from '../product-info/product-info';
import ReviewList from '../review-list/review-list';

export const COUNT_CARDS = 9;
const ERROR_STATUS = 404;
export const INITIAL_REVIEWS_COUNT = 3;

const CRUMBS = [{name: 'Главная', link: AppRoute.Main},
  {name: 'Каталог', link: AppRoute.CatalogStartPage}];

export const enum StartScroll{
    X = 0,
    Y = 0
  }

function ProductPage():JSX.Element{


  const {id} = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProduct);
  const [isOpenModalReview, setOpenModalReview] = useState(false);
  const [isOpenModalSuccessReview, setOpenModalSuccessReview] = useState(false);

  const crumbs = CRUMBS.slice();
  const status = useSelector(getResponseStatus);
  const history = useNavigate();

  const [isOpenModalAdd, setOpenModalAdd] = useState(false);
  const [isOpenModalSuccessAdd, setOpenModalSuccessAdd] = useState(false);

  const body = document.querySelector('body');

  if (product){
    crumbs.push({name: product.name, link: AppRoute.Empty});
  }

  useEffect(() => {
    window.scroll(StartScroll.X, StartScroll.Y);
    dispatch(fetchGuitarAction(Number(id), 0, INITIAL_REVIEWS_COUNT));
  }, [dispatch, id]);

  useEffect(() => {
    if (status === ERROR_STATUS){
      history(AppRoute.Undefined);

    }
  }, [product, history, status]);

  useEffect(()=>{
    if (body !== null) {
      body.style.overflow = isOpenModalReview || isOpenModalSuccessReview || isOpenModalAdd || isOpenModalSuccessAdd
        ? 'hidden' : 'visible';
    }
  }, [body, isOpenModalAdd, isOpenModalReview, isOpenModalSuccessAdd, isOpenModalSuccessReview]);

  if (status === ERROR_STATUS) {
    return (<Navigate to = {AppRoute.Undefined}/>);
  }

  window.onkeydown = function( evt ) {
    if ( evt.code === 'Escape' ) {
      if (isOpenModalSuccessReview) {
        setOpenModalSuccessReview(false);
      }
      if (isOpenModalAdd) {
        setOpenModalAdd(false);
      }
      if (isOpenModalSuccessAdd) {
        setOpenModalSuccessAdd(false);
      }
    }
  };

  return(
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{product?.name}</h1>
          <BreadCrumbs crumbs={crumbs}/>
          <ProductInfo product={product} onSetOpenModalAdd={setOpenModalAdd}/>
          <ReviewList
            id  ={Number(id)}
            isOpenModalSuccessReview = {isOpenModalSuccessReview}
            onSetOpenModalReview = {setOpenModalReview}
          />
        </div>
      </main>
      <Footer/>
      {
        isOpenModalReview && product?
          <ModalReview
            product = {product}
            onSetOpenModalReview={setOpenModalReview}
            onSetOpenModalSuccessReview={setOpenModalSuccessReview}
          /> : ''
      }
      {
        isOpenModalSuccessReview ?
          <ModalSuccessReview
            onSetOpenModalSuccessReview={setOpenModalSuccessReview}
          /> : ''
      }
      {
        isOpenModalAdd && product?
          <ModalAddProduct
            product = {product}
            onSetOpenModalAdd={setOpenModalAdd}
            onSetOpenModalSuccessAdd={setOpenModalSuccessAdd}
          /> : ''
      }
      {
        isOpenModalSuccessAdd ?
          <ModalSuccessAdd
            onSetOpenModalSuccessAdd={setOpenModalSuccessAdd}
          /> : ''
      }
    </> );
}

export default ProductPage;


