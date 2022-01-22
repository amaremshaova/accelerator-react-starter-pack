import { RootState } from '../store/root-reducer';
import { Guitar } from './guitar';

export type CommentCountType = {
  id : number;
  count: number;
}

export type GuitarData = {
  guitars: Guitar[],
  likeGuitars: Guitar[],
  guitarsCount: number,
  minPrice: number | null,
  maxPrice: number | null,
  commentsCount: CommentCountType[],
  isLoadData: boolean
};

export type State = RootState;
