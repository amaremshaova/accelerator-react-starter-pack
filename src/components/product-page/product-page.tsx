import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams} from 'react-router-dom';
import { AppRoute } from '../../const';
import { fetchGuitarAction} from '../../store/api-actions';
import { getResponseStatus } from '../../store/app-process/selectors';
import { getGuitar } from '../../store/guitar-data/selectors';
import BreadCrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import Header from '../header/header';
import ModalReview from '../modal-review/modal-review';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import ProductInfo from '../product-info/product-info';
import ReviewList from '../review-list/review-list';

export const COUNT_CARDS = 9;
const ERROR_STATUS = 404;


const CRUMBS = [{name: 'Главная', link: AppRoute.Main},
  {name: 'Каталог', link: AppRoute.CatalogStartPage}];

export const enum StartScroll{
    X = 0,
    Y = 0
  }

function ProductPage():JSX.Element{

  const dispatch = useDispatch();
  const guitar = useSelector(getGuitar);

  const {id} = useParams();
  const [isOpenModalReview, setOpenModalReview] = useState(false);
  const [isOpenModalSuccessReview, setOpenModalSuccessReview] = useState(false);

  const crumbs = CRUMBS.slice();
  const status = useSelector(getResponseStatus);
  const history = useNavigate();

  if (guitar){
    crumbs.push({name: guitar.name, link: AppRoute.Empty});
  }

  useEffect(() => {
    window.scroll(StartScroll.X, StartScroll.Y);
    dispatch(fetchGuitarAction(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (status === ERROR_STATUS){
      history(AppRoute.Undefined);

    }
  }, [guitar, history, status]);


  const body = document.querySelector('body');

  useEffect(()=>{
    if (body !== null) {
      body.style.overflow = isOpenModalReview || isOpenModalSuccessReview ? 'hidden' : 'visible';
    }
  }, [body, isOpenModalReview, isOpenModalSuccessReview]);

  if (status === ERROR_STATUS) {
    return (<Navigate to = {AppRoute.Undefined}/>);
  }
  return(

    <>
      <Header />
      <main className="page-content"
        onKeyDown={(evt)=> {
          if (evt.code === 'Escape') {
            if (isOpenModalSuccessReview) {
              setOpenModalSuccessReview(false);
            }
          }
        }}
      >
        <div className="container">
          <h1 className="page-content__title title title--bigger">{guitar?.name}</h1>
          <BreadCrumbs crumbs={crumbs}/>
          <ProductInfo product={guitar} />
          <ReviewList
            isOpenModalSuccessReview = {isOpenModalSuccessReview}
            onSetOpenModalReview = {setOpenModalReview}
          />
        </div>
      </main>
      <Footer/>
      {
        isOpenModalReview && guitar?
          <ModalReview
            product = {guitar}
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
    </> );
}

export default ProductPage;
