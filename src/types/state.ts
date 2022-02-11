import { RootState } from '../store/root-reducer';
import { Guitar, Comment } from './guitar';

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
  comments: Comment[],
  commentsCount: CommentCountType[],
  isLoadData: boolean,
  isLoadComments: boolean,
  activeGuitar: Guitar
};

export type AppProcess = {
  responseStatus: number
}

export type State = RootState;
