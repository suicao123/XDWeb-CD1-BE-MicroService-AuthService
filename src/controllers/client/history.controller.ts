import { Request, Response } from 'express';
import { handelTakeHistoryUser } from 'services/client/item.service';

const getHistoryPage = async (req: Request, res: Response) => {
  const user = req.user;
  const history = await handelTakeHistoryUser(user.id);

  return res.render('client/product/history', {
    history,
  });
};
export { getHistoryPage };
