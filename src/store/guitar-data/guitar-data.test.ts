import { checkingLoadComments, checkingLoadData, loadComments, loadCommentsCount, loadGuitar, loadGuitarsCount, loadLikeGuitars, loadMinMaxPrice, loadPageGuitars } from '../actions';
import { guitarData} from './guitar-data';
import { guitars, guitarsCount, maxPrice, minPrice } from '../../utils/mocks/guitars';
import { comments, commentsCount } from '../../utils/mocks/comments';

describe('Reducer: guitarData', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({  guitars: [],
        likeGuitars: [],
        activeGuitar: undefined,
        guitarsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: false,
        isLoadComments: false,
        comments: [],
      });
  });

  it('should update all guitars by load all guitars', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: guitars[0],
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};

    expect(guitarData(state, loadPageGuitars(guitars)))
      .toEqual({guitars,
        likeGuitars: [],
        activeGuitar: guitars[0],
        guitarsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: false,
        comments: [],
        isLoadComments: false});
  });

  it('should update min-max price by load min-max price', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: guitars[0],
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(guitarData(state, loadMinMaxPrice(minPrice, maxPrice)))
      .toEqual({guitars: [],
        likeGuitars: [],
        activeGuitar: guitars[0],
        guitarsCount: 0,
        minPrice: minPrice,
        maxPrice: maxPrice,
        commentsCount: [],
        isLoadData: false,
        comments: [],
        isLoadComments: false});
  });

  it('should update similar guitars by load similar guitars', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: guitars[0],
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(guitarData(state, loadLikeGuitars(guitars)))
      .toEqual({guitars: [],
        likeGuitars: guitars,
        activeGuitar: guitars[0],
        guitarsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: false,
        comments: [],
        isLoadComments: false});
  });

  it('should update guitars count by load guitars count', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: guitars[0],
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(guitarData(state,loadGuitarsCount(guitarsCount)))
      .toEqual({guitars: [],
        likeGuitars: [],
        activeGuitar: guitars[0],
        guitarsCount: guitarsCount,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: false,
        comments: [],
        isLoadComments: false});
  });

  it('should update comments count by load comments count', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: guitars[0],
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [{id : 1, count: 2}],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(guitarData(state, loadCommentsCount(1, commentsCount)))
      .toEqual({guitars: [],
        likeGuitars: [],
        activeGuitar: guitars[0],
        guitarsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [{id: 1, count: commentsCount}],
        isLoadData: false,
        comments: [],
        isLoadComments: false});
  });


  it('should update comments by load comments', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: guitars[0],
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(guitarData(state, loadComments(comments)))
      .toEqual({guitars: [],
        likeGuitars: [],
        activeGuitar: guitars[0],
        guitarsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: false,
        comments: comments,
        isLoadComments: false});
  });

  it('should update guitar by load guitar', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: guitars[1],
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(guitarData(state, loadGuitar(guitars[0])))
      .toEqual({guitars: [],
        likeGuitars: [],
        activeGuitar: guitars[0],
        guitarsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: false,
        comments: [],
        isLoadComments: false});
  });

  it('should update load data', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: guitars[1],
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(guitarData(state, checkingLoadData(true)))
      .toEqual({guitars: [],
        likeGuitars: [],
        activeGuitar: guitars[1],
        guitarsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: true,
        comments: [],
        isLoadComments: false});
  });

  it('should update load comments', () => {
    const state = {guitars: [],
      likeGuitars: [],
      activeGuitar: guitars[1],
      guitarsCount: 0,
      minPrice: null,
      maxPrice: null,
      commentsCount: [],
      isLoadData: false,
      comments: [],
      isLoadComments: false};
    expect(guitarData(state, checkingLoadComments(true)))
      .toEqual({guitars: [],
        likeGuitars: [],
        activeGuitar: guitars[1],
        guitarsCount: 0,
        minPrice: null,
        maxPrice: null,
        commentsCount: [],
        isLoadData: false,
        comments: [],
        isLoadComments: true});
  });

});
