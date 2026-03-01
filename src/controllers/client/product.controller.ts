import { Request, Response } from 'express';
import { handelGetProductById } from 'services/admin/product.service';
import { getCardIdWithUser } from 'services/client/auth.service';
import {
  addProductToCart,
  getcartDetailWithId,
  handelDeleteCart,
  handelPlaceOrder,
  updateCartDetailBeforeCheckout,
} from 'services/client/item.service';
import { number } from 'zod';

const getProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await handelGetProductById(id as string);
  const factoryOptions = [
    { name: 'Apple (MacBook)', value: 'APPLE' },
    { name: 'Asus', value: 'ASUS' },
    { name: 'Lenovo', value: 'LENOVO' },
    { name: 'Dell', value: 'DELL' },
    { name: 'LG', value: 'LG' },
    { name: 'Acer', value: 'ACER' },
  ];

  const targetOptions = [
    { name: 'Gaming', value: 'GAMING' },
    { name: 'Sinh viên - Văn phòng', value: 'SINHVIEN-VANPHONG' },
    { name: 'Thiết kế đồ họa', value: 'THIET-KE-DO-HOA' },
    { name: 'Mỏng nhẹ', value: 'MONG-NHE' },
    { name: 'Doanh nhân', value: 'DOANH-NHAN' },
  ];

  res.render('client/product/details', {
    product,
    targetOptions,
    factoryOptions,
  });
};
const postAddProductToCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  await addProductToCart(1, +id, user);
  return res.redirect('/');
};
const getCartPage = async (req: Request, res: Response) => {
  const user = req.user;
  const cartId = await getCardIdWithUser(user.id);
  const cartDetails = await getcartDetailWithId(cartId);
  const totalPrice = cartDetails
    ?.map((item) => +item.price * +item.quantity)
    ?.reduce((a, b) => a + b, 0);
  const cardId = cartDetails.length ? cartDetails[0].cartId : 0;
  return res.render('client/product/cart', {
    cartDetails,
    totalPrice,
    user,
    cardId,
  });
};
const postDeleteCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  await handelDeleteCart(+id);
  return res.redirect('/cart');
};
const getCheckOutPage = async (req: Request, res: Response) => {
  const user = req.user;
  const cartId = await getCardIdWithUser(user.id);
  const cartDetails = await getcartDetailWithId(cartId);
  const totalPrice = cartDetails
    ?.map((item) => +item.price * +item.quantity)
    ?.reduce((a, b) => a + b, 0);
  return res.render('client/product/checkout', {
    cartDetails,
    totalPrice,
  });
};
const postHandelCartToCheckout = async (req: Request, res: Response) => {
  const currentCartDetail: { id: string; quantity: string }[] =
    req.body?.cartDetails ?? [];
  const { cartId } = req.body;
  await updateCartDetailBeforeCheckout(currentCartDetail, cartId);
  return res.redirect('/checkout');
};
const postPlaceOrder = async (req: Request, res: Response) => {
  const user = req.user;
  const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body;

  const result = await handelPlaceOrder(
    user.id,
    receiverName,
    receiverAddress,
    receiverPhone,
    +totalPrice,
  );
  if (result) {
    console.log('>>>> check message: ', result);
    return res.redirect('/checkout');
  }
  return res.redirect('/thanks');
};
const postAddToCartFromDetailPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const user = req.user;
  if (!user) return res.redirect('/login');
  await addProductToCart(+quantity, +id, user);
  return res.redirect(`/product/${id}`);
};
const getThanksPage = async (req: Request, res: Response) => {
  return res.render('client/product/thanks');
};
export {
  getProductPage,
  postAddProductToCart,
  getCartPage,
  postDeleteCart,
  getCheckOutPage,
  postHandelCartToCheckout,
  postPlaceOrder,
  getThanksPage,
  postAddToCartFromDetailPage,
};
