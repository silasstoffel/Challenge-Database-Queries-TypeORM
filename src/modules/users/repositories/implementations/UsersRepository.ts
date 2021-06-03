import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    return this.repository.findOne(
      { id: user_id },
      { relations: ['games'] }
    ) as Promise<User>;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const query = "SELECT * FROM users ORDER BY first_name";
    return this.repository.query(query); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const query = "SELECT * FROM users WHERE first_name ILIKE $1 and last_name ILIKE $2";
    return this.repository.query(query, [first_name, last_name]); // Complete usando raw query
  }
}
