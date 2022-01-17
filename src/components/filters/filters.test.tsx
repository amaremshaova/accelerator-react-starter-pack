import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import { Provider } from 'react-redux';
import { configureMockStore} from '@jedmao/redux-mock-store';
import { AnyAction, Store } from '@reduxjs/toolkit';
import Filters, { FiltersProps, GuitarStrings, GuitarType, StringsCount } from './filters';
import { guitars, maxPrice as maxPriceMock, minPrice as  minPriceMock} from '../../utils/mocks/guitars';
import { commentsCountArray } from '../../utils/mocks/comments';
import userEvent from '@testing-library/user-event';


const history = createMemoryHistory();

const setGuitarType = jest.fn(()=> 'setGuitarType');
const setStringsCount = jest.fn(()=>'setStringsCount');
const setPage = jest.fn(()=>'setPage');
const setMinPriceInput = jest.fn(()=>'setMinPriceInput');
const setMaxPriceInput = jest.fn(()=>'setMaxPriceInput');

const fakeApp = (store: Store<unknown, AnyAction>, props: FiltersProps) => {

  const {
    maxPrice,
    minPrice,
    maxPriceInput,
    minPriceInput,
    guitarTypes,
    onSetGuitarType,
    stringsCount,
    onSetStringsCount,
    onSetPage,
    onSetMinPriceInput,
    onSetMaxPriceInput} = props;

  return(
    <Provider store = {store}>
      <Router navigator={history} location={history.location}>
        <Routes>
          <Route path={AppRoute.Catalog}
            element={
              <Filters minPrice={minPrice}
                maxPrice={maxPrice}
                minPriceInput={minPriceInput}
                maxPriceInput={maxPriceInput}
                onSetMinPriceInput={onSetMinPriceInput}
                onSetMaxPriceInput={onSetMaxPriceInput}
                guitarTypes={guitarTypes}
                onSetGuitarType={onSetGuitarType}
                stringsCount={stringsCount}
                onSetStringsCount={onSetStringsCount}
                onSetPage={onSetPage}
              />
            }
          />
        </Routes>
      </Router>
    </Provider>);
};

const mockStore = configureMockStore();
const store = mockStore({
  DATA: {guitars: guitars,
    likeGuitars: guitars,
    guitarsCount: 27,
    minPrice: minPriceMock,
    maxPrice: maxPriceMock,
    commentsCount: commentsCountArray},
});

describe('Component: Filters', () => {
  it('should render correctly', () => {


    const props = {
      maxPrice: null,
      minPrice: null,
      maxPriceInput: null,
      minPriceInput: null,
      guitarTypes: [],
      onSetGuitarType: setGuitarType,
      stringsCount: [],
      onSetStringsCount: setStringsCount,
      onSetPage : setPage,
      onSetMinPriceInput : setMinPriceInput,
      onSetMaxPriceInput : setMaxPriceInput};

    history.push(AppRoute.Catalog);

    render(fakeApp(store, props));

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByText('Тип гитар')).toBeInTheDocument();
    expect(screen.getByTestId('acoustic')).not.toBeChecked();
    expect(screen.getByText('Акустические гитары')).toBeInTheDocument();
    expect(screen.getByTestId('electric')).not.toBeChecked();
    expect(screen.getByText('Электрогитары')).toBeInTheDocument();
    expect(screen.getByTestId('ukulele')).not.toBeChecked();
    expect(screen.getByText('Укулеле')).toBeInTheDocument();
    expect(screen.getByText('Количество струн')).toBeInTheDocument();
    expect(screen.getByTestId('4-strings')).not.toBeChecked();
    expect(screen.getByLabelText('4')).toBeInTheDocument();
    expect(screen.getByTestId('6-strings')).not.toBeChecked();
    expect(screen.getByLabelText('6')).toBeInTheDocument();
    expect(screen.getByTestId('7-strings')).not.toBeChecked();
    expect(screen.getByLabelText('7')).toBeInTheDocument();
    expect(screen.getByTestId('12-strings')).not.toBeChecked();
    expect(screen.getByLabelText('12')).toBeInTheDocument();
  });

  it('displaying the correct number of strings for a given acoustic type of guitar', () => {

    const props = {
      maxPrice: null,
      minPrice: null,
      maxPriceInput: null,
      minPriceInput: null,
      guitarTypes: [GuitarType.Acoustic],
      onSetGuitarType: setGuitarType,
      stringsCount: GuitarStrings[GuitarType.Acoustic],
      onSetStringsCount: setStringsCount,
      onSetPage : setPage,
      onSetMinPriceInput : setMinPriceInput,
      onSetMaxPriceInput : setMaxPriceInput};

    history.push(AppRoute.Catalog);

    render(fakeApp(store, props));

    expect(screen.getByTestId('acoustic')).toBeChecked();
    expect(screen.getByTestId('electric')).not.toBeChecked();
    expect(screen.getByTestId('ukulele')).not.toBeChecked();


    expect(screen.getByTestId('4-strings')).toBeDisabled();
    expect(screen.getByTestId('6-strings')).toBeChecked();
    expect(screen.getByTestId('7-strings')).toBeChecked();
    expect(screen.getByTestId('12-strings')).toBeChecked();
  });

  it('displaying the correct number of strings for a given electric type of guitar', () => {

    const props = {
      maxPrice: null,
      minPrice: null,
      maxPriceInput: null,
      minPriceInput: null,
      guitarTypes: [GuitarType.Electric],
      onSetGuitarType: setGuitarType,
      stringsCount: GuitarStrings[GuitarType.Electric],
      onSetStringsCount: setStringsCount,
      onSetPage : setPage,
      onSetMinPriceInput : setMinPriceInput,
      onSetMaxPriceInput : setMaxPriceInput};

    history.push(AppRoute.Catalog);

    render(fakeApp(store, props));

    expect(screen.getByTestId('acoustic')).not.toBeChecked();
    expect(screen.getByTestId('electric')).toBeChecked();
    expect(screen.getByTestId('ukulele')).not.toBeChecked();


    expect(screen.getByTestId('4-strings')).toBeChecked();
    expect(screen.getByTestId('6-strings')).toBeChecked();
    expect(screen.getByTestId('7-strings')).toBeChecked();
    expect(screen.getByTestId('12-strings')).toBeDisabled();
  });


  it('displaying the correct number of strings for a given ukulele type of guitar', () => {


    const props = {
      maxPrice: null,
      minPrice: null,
      maxPriceInput: null,
      minPriceInput: null,
      guitarTypes: [GuitarType.Ukulele],
      onSetGuitarType: setGuitarType,
      stringsCount: GuitarStrings[GuitarType.Ukulele],
      onSetStringsCount: setStringsCount,
      onSetPage : setPage,
      onSetMinPriceInput : setMinPriceInput,
      onSetMaxPriceInput : setMaxPriceInput};

    history.push(AppRoute.Catalog);

    render(fakeApp(store, props));

    expect(screen.getByTestId('acoustic')).not.toBeChecked();
    expect(screen.getByTestId('electric')).not.toBeChecked();
    expect(screen.getByTestId('ukulele')).toBeChecked();


    expect(screen.getByTestId('4-strings')).toBeChecked();
    expect(screen.getByTestId('6-strings')).toBeDisabled();
    expect(screen.getByTestId('7-strings')).toBeDisabled();
    expect(screen.getByTestId('12-strings')).toBeDisabled();
  });

  it('displaying the correct number of strings for a given all types of guitar', () => {

    const props = {
      maxPrice: null,
      minPrice: null,
      maxPriceInput: 12,
      minPriceInput: null,
      guitarTypes: [GuitarType.Ukulele, GuitarType.Acoustic, GuitarType.Electric],
      onSetGuitarType: setGuitarType,
      stringsCount: [StringsCount.Four, StringsCount.Six, StringsCount.Seven, StringsCount.Twelve],
      onSetStringsCount: setStringsCount,
      onSetPage : setPage,
      onSetMinPriceInput : setMinPriceInput,
      onSetMaxPriceInput : setMaxPriceInput};

    history.push(AppRoute.Catalog);

    render(fakeApp(store, props));

    expect(screen.getByTestId('acoustic')).toBeChecked();
    expect(screen.getByTestId('electric')).toBeChecked();
    expect(screen.getByTestId('ukulele')).toBeChecked();

    expect(screen.getByTestId('4-strings')).toBeChecked();
    expect(screen.getByTestId('6-strings')).toBeChecked();
    expect(screen.getByTestId('7-strings')).toBeChecked();
    expect(screen.getByTestId('12-strings')).toBeChecked();
  });

  it('should displaying the correct number of strings for a given all types of guitar', () => {

    const props = {
      maxPrice: null,
      minPrice: null,
      maxPriceInput: null,
      minPriceInput: null,
      guitarTypes: [GuitarType.Ukulele, GuitarType.Acoustic, GuitarType.Electric],
      onSetGuitarType: setGuitarType,
      stringsCount: [StringsCount.Four, StringsCount.Six, StringsCount.Seven, StringsCount.Twelve],
      onSetStringsCount: setStringsCount,
      onSetPage : setPage,
      onSetMinPriceInput : setMinPriceInput,
      onSetMaxPriceInput : setMaxPriceInput};

    history.push(AppRoute.Catalog);


    render(fakeApp(store, props));

    expect(screen.getByTestId('acoustic')).toBeChecked();
    expect(screen.getByTestId('electric')).toBeChecked();
    expect(screen.getByTestId('ukulele')).toBeChecked();

    expect(screen.getByTestId('4-strings')).toBeChecked();
    expect(screen.getByTestId('6-strings')).toBeChecked();
    expect(screen.getByTestId('7-strings')).toBeChecked();
    expect(screen.getByTestId('12-strings')).toBeChecked();
  });

  it('should redirect when changing the filter', () => {

    const props = {
      maxPrice: null,
      minPrice: null,
      maxPriceInput: null,
      minPriceInput: null,
      guitarTypes: [],
      onSetGuitarType: setGuitarType,
      stringsCount: [],
      onSetStringsCount: setStringsCount,
      onSetPage : setPage,
      onSetMinPriceInput : setMinPriceInput,
      onSetMaxPriceInput : setMaxPriceInput};

    history.push(`${AppRoute.Page}2?&type=acoustic`);

    render(fakeApp(store, props));

    const testChange = () => {
      expect(setPage).toBeCalled();

      expect(history.location.pathname ===`${AppRoute.StartPage}/`).toBeTruthy();
      expect(history.location.search === '?&type=acoustic').toBeTruthy();
    };

    userEvent.click(screen.getByTestId('acoustic'));
    testChange();
    expect(setGuitarType).toBeCalled();
    history.push(`${AppRoute.Page}2?&type=acoustic`);

    userEvent.click(screen.getByTestId('electric'));
    testChange();
    expect(setGuitarType).toBeCalled();
    history.push(`${AppRoute.Page}2?&type=acoustic`);

    userEvent.click(screen.getByTestId('ukulele'));
    testChange();
    expect(setGuitarType).toBeCalled();
    history.push(`${AppRoute.Page}2?&type=acoustic`);


    userEvent.click(screen.getByTestId('4-strings'));
    testChange();
    expect(setStringsCount).toBeCalled();
    history.push(`${AppRoute.Page}2?&type=acoustic`);

    userEvent.click(screen.getByTestId('6-strings'));
    testChange();
    expect(setStringsCount).toBeCalled();
    history.push(`${AppRoute.Page}2?&type=acoustic`);

    userEvent.click(screen.getByTestId('7-strings'));
    testChange();
    expect(setStringsCount).toBeCalled();
    history.push(`${AppRoute.Page}2?&type=acoustic`);

    userEvent.click(screen.getByTestId('12-strings'));
    testChange();
    expect(setStringsCount).toBeCalled();
    history.push(`${AppRoute.Page}2?&type=acoustic`);


    userEvent.type(screen.getByTestId('priceMin'), String(minPriceMock));
    expect(screen.getByDisplayValue(minPriceMock)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('priceMin'));
    testChange();
    expect(setMinPriceInput).toBeCalled();
    expect(setMaxPriceInput).not.toBeCalled();
    history.push(`${AppRoute.Page}2?&type=acoustic`);

    userEvent.type(screen.getByTestId('priceMax'), String(maxPriceMock));
    expect(screen.getByDisplayValue(maxPriceMock)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('priceMax'));
    testChange();
    expect(setMaxPriceInput).toBeCalled();
    expect(setMinPriceInput).toBeCalled();


  });

});
