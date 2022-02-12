import { changeStatus } from '../actions';
import { appProcess } from './app-process';

describe('Reducer: appProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(appProcess(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({ responseStatus: 0 });
  });

  it('should update status', () => {
    const state = {responseStatus: 0};

    expect(appProcess(state, changeStatus(200)))
      .toEqual({responseStatus : 200});
  });
});
