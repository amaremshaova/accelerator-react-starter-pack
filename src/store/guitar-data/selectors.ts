import { NameSpace } from '../root-reducer';
import {CommentCountType, State} from '../../types/state';
import { Guitar } from '../../types/guitar';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.Data].guitars;
export const getLikeGuitars = (state: State): Guitar[] => state[NameSpace.Data].likeGuitars;
export const getGuitarsCount = (state: State): number => state[NameSpace.Data].guitarsCount;
export const getMinPrice = (state: State): number | null => state[NameSpace.Data].minPrice;
export const getMaxPrice = (state: State): number | null => state[NameSpace.Data].maxPrice;
export const getCommentsCount = (state: State): CommentCountType[] => state[NameSpace.Data].commentsCount;
