import { Request, Response } from 'express';
import { handelGetOrderDetailsWithId } from 'services/admin/order.service';
const getViewOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const orderDetails = await handelGetOrderDetailsWithId(+id);
  return res.render('admin/order/detail', {
    orderDetails,
  });
};

export { getViewOrder };
