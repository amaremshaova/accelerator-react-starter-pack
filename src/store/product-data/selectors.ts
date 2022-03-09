import { NameSpace } from '../root-reducer';
import {CommentCountType, State} from '../../types/state';
import { Guitar} from '../../types/guitar';
import { Comment } from '../../types/comment';

export const getProducts = (state: State): Guitar[] => state[NameSpace.Data].products;
export const getLikeProducts = (state: State): Guitar[] => state[NameSpace.Data].likeProducts;
export const getProductsCount = (state: State): number => state[NameSpace.Data].productsCount;
export const getMinPrice = (state: State): number | null => state[NameSpace.Data].minPrice;
export const getMaxPrice = (state: State): number | null => state[NameSpace.Data].maxPrice;
export const getCommentsCount = (state: State): CommentCountType[] => state[NameSpace.Data].commentsCount;
export const getIsLoadData = (state: State): boolean => state[NameSpace.Data].isLoadData;
export const getIsLoadComments = (state: State): boolean => state[NameSpace.Data].isLoadComments;
export const getComments = (state: State): Comment[] => state[NameSpace.Data].comments;
