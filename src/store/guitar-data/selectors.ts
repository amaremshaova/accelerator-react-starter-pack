import { NameSpace } from '../root-reducer';
import {State} from '../../types/state';
import { Guitar } from '../../types/guitar';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.Data].guitars;
export const getGuitar = (state: State): Guitar | undefined=> state[NameSpace.Data].activeGuitar;
