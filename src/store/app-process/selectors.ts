import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';

export const getResponseStatus = (state: State): number => state[NameSpace.App]?.responseStatus;
