import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import User from '../resources/users/user.entity';
import AppError from './errors/AppError';

const createAdmin = async () => {
  const saltRounds = 10;
  const admin = new User();
  bcrypt.hash(
    process.env['ADMIN_PASSWORD'] as string,
    saltRounds,
    async (_err, hash) => {
      try {
        admin.name = process.env['ADMIN_NAME'] as string;
        admin.login = process.env['ADMIN_LOGIN'] as string;
        admin.password = hash;
        await getRepository(User).save(admin);
      } catch {
        throw new AppError(
          'Admin is not created',
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    }
  );
};

export default createAdmin;
