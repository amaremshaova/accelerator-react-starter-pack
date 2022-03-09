import { RootState } from '../store/root-reducer';
import { ProductsInCart } from './cart';
import { Comment } from './comment';
import { Guitar} from './guitar';

export type CommentCountType = {
  id : number;
  count: number;
}

export type ProductData = {
  products: Guitar[],
  likeProducts: Guitar[],
  productsCount: number,
  minPrice: number | null,
  maxPrice: number | null,
  comments: Comment[],
  commentsCount: CommentCountType[],
  isLoadData: boolean,
  isLoadComments: boolean,

};

export type AppProcess = {
  responseStatus: number,
  activeProduct: Guitar | undefined,
  productsInCart: ProductsInCart[],
  discount: number
}

export type State = RootState;
