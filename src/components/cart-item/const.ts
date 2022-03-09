import { ProductsInCart } from '../../types/cart';

export const getTotal = (guitarsInCart : ProductsInCart[]) => {
  let total = 0;
  guitarsInCart.forEach((item) => total += item.product.price * item.count);

  return total;
};
