import { Request, Response } from 'express';
import { handelGetProductById } from 'services/admin/product.service';
import { getCardIdWithUser } from 'services/client/auth.service';
import {
  addProductToCart,
  getcartDetailWithId,
} from 'services/client/item.service';

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
  const cartDetail = await getcartDetailWithId(cartId);
  const totalPrice = cartDetail
    ?.map((item) => +item.price * +item.quantity)
    ?.reduce((a, b) => a + b, 0);
  return res.render('client/product/cart', {
    cartDetail,
    totalPrice,
    user,
  });
};
export { getProductPage, postAddProductToCart, getCartPage };
