import { Request, Response, NextFunction } from 'express';

type Cb = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const catchAsync = (cb: Cb) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  cb(req, res, next).catch(next);
};

export default catchAsync;
