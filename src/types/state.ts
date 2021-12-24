import { RootState } from '../store/root-reducer';
import { Guitar } from './guitar';

export type GuitarData = {
  guitars: Guitar[],
  activeGuitar?: Guitar,
};

export type State = RootState;
