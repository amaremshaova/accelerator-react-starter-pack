import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Router} from 'react-router-dom';
import { Provider} from 'react-redux';
import { guitars } from '../../utils/mocks/guitars';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';
import CartItem from './cart-item';
import { GuitarTypeRU } from '../filters/filters';
import { Store, AnyAction } from '@reduxjs/toolkit';
import { ProductsInCart } from '../../types/cart';


const mockStore = configureMockStore();
const history = createMemoryHistory();

const setActiveProduct = jest.fn();
const setOpenModalDelete = jest.fn();

const fakeApp = (store: Store<unknown, AnyAction>, productItem: ProductsInCart)=>(
  <Provider store = {store}>
    <Router location={history.location} navigator={history} >
      <CartItem productItem={productItem}
        onSetActiveProduct={setActiveProduct}
        onSetOpenModalDelete={setOpenModalDelete}
      />
    </Router>
  </Provider>
);

describe('Component: CartItem', () => {
  it('should render correctly', () => {

    history.push(AppRoute.Catalog);
    const productItem = {product: guitars[0], count: 1};

    const store = mockStore({
      APP : {
        productsInCart: [productItem]},
    });


    const {product} = productItem;

    render(fakeApp(store, productItem));

    expect(screen.getByText(product.name, {exact: false})).toBeInTheDocument();
    expect(screen.getByText(product.vendorCode, {exact: false})).toBeInTheDocument();
    expect(screen.getByText(GuitarTypeRU[product.type], {exact: false})).toBeInTheDocument();
    expect(screen.getByText(`${product.stringCount} струнная`, {exact: false})).toBeInTheDocument();
  });

  it('should work correctly the button-plus', async () => {
    history.push(AppRoute.CatalogStartPage);
    const productItem = {product: guitars[0], count: 1};
    const store = mockStore({
      APP : {
        productsInCart: [productItem]},
    });

    render(fakeApp(store, productItem));
    userEvent.click(screen.getByTestId('button-delete'));
    expect(setActiveProduct).toBeCalled();
    expect(setOpenModalDelete).toBeCalled();

    userEvent.click(screen.getByTestId('button-plus'));
    render(fakeApp(store, productItem));
    expect(screen.getByDisplayValue(productItem.count + 1)).toBeInTheDocument();

  });

  it('should work correctly the button-minus', async () => {
    history.push(AppRoute.CatalogStartPage);

    const productItem = {product: guitars[0], count: 3};

    const store = mockStore({
      APP : {
        productsInCart: [productItem]},
    });

    render(fakeApp(store, productItem));
    userEvent.click(screen.getByTestId('button-minus'));
    render(fakeApp(store, productItem));
    expect(screen.getByDisplayValue(productItem.count - 1)).toBeInTheDocument();

  });
});

