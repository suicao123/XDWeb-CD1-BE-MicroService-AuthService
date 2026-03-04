import { Request, Response } from 'express';
import {
  handelGetAllUser,
  handelGetUserById,
  handelUpdateUserById,
} from 'services/client/api.service';
import { registerNewUser } from 'services/client/auth.service';
import { addProductToCart } from 'services/client/item.service';
import {
  RegisterSchema,
  TRegisterSchema,
} from 'src/validation/register.schema';

const postAddProductToCartAPI = async (req: Request, res: Response) => {
  const { quantity, productId } = req.body;
  const user = req.user;

  const currentSum = req?.user?.sumCart ?? 0;
  const newSum = currentSum + +quantity;

  await addProductToCart(quantity, productId, user);

  res.status(200).json({
    data: newSum,
  });
};

const getAllUserAPI = async (req: Request, res: Response) => {
  const users = await handelGetAllUser();

  res.status(200).json({
    data: users,
  });
};
const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await handelGetUserById(+id);

  res.status(200).json({
    data: user,
  });
};
const createUserAPI = async (req: Request, res: Response) => {
  const { fullname, username, password } = req.body as TRegisterSchema;
  const validate = await RegisterSchema.safeParseAsync(req.body);
  if (!validate.success) {
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map(
      (item) => `${item.message} (${item.path[0]})`,
    );
    res.status(400).json({
      erros: errors,
    });
    return;
  }

  //success
  await registerNewUser(fullname, username, password);
  res.status(201).json({
    data: 'create user succeed',
  });
};
const updateUserById = async (req: Request, res: Response) => {
  const { fullName, address, phone } = req.body;
  const { id } = req.params;
  //success
  await handelUpdateUserById(+id, fullName, address, phone);
  res.status(201).json({
    data: 'Update user succeed',
  });
};
export {
  postAddProductToCartAPI,
  getAllUserAPI,
  getUserById,
  createUserAPI,
  updateUserById,
};
