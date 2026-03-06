import { NextFunction, Request, Response } from 'express';

const checkValidJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // format: Bearer <token>
  console.log(token);
  next();
};

export { checkValidJWT };
