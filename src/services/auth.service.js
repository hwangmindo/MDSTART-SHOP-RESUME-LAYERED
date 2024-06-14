import { UsersRepository } from '../repositories/users.repository.js';

export class AuthService {
  usersRepository = new UsersRepository();

  findUsers = async (email) => {
    const findedUser = await this.usersRepository.findUser(email);

    return findedUser;
  };

  createDatas = async (email, hashedPassword, name) => {
    const createdData = await this.usersRepository.createData(
      email,
      hashedPassword,
      name,
    );

    return {
      id: createdData.id,
      email: createdData.email,
      name: createdData.name,
      role: createdData.role,
      createdAt: createdData.createdAt,
      updatedAt: createdData.updatedAt,
    };
  };
}
