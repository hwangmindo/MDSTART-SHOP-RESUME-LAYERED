import { prisma } from '../utils/prisma.util.js';

export class UsersRepository {
  // auth findUser
  findUser = async (email) => {
    const findedUser = await prisma.user.findUnique({ where: { email } });

    return findedUser;
  };

  // auth createData
  createData = async (email, hashedPassword, name) => {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const data = await prisma.user.findFirst({ where: { email } });

    return data;
  };

  // require-access-token findUser blind password
  findUserBpw = async (id) => {
    const findedUserBpw = await prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });

    return findedUserBpw;
  };
}
