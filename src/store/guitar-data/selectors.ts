import { NameSpace } from '../root-reducer';
import {CommentCountType, State} from '../../types/state';
import { Guitar, Comment } from '../../types/guitar';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.Data].guitars;
export const getGuitar = (state: State): Guitar | undefined => state[NameSpace.Data].activeGuitar;
export const getLikeGuitars = (state: State): Guitar[] => state[NameSpace.Data].likeGuitars;
export const getGuitarsCount = (state: State): number => state[NameSpace.Data].guitarsCount;
export const getMinPrice = (state: State): number | null => state[NameSpace.Data].minPrice;
export const getMaxPrice = (state: State): number | null => state[NameSpace.Data].maxPrice;
export const getCommentsCount = (state: State): CommentCountType[] => state[NameSpace.Data].commentsCount;
export const getIsLoadData = (state: State): boolean => state[NameSpace.Data].isLoadData;
export const getIsLoadComments = (state: State): boolean => state[NameSpace.Data].isLoadComments;
export const getComments = (state: State): Comment[] => state[NameSpace.Data].comments;
