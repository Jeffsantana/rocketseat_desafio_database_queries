import { getRepository, In, Repository } from 'typeorm';
import { Game } from '../../../games/entities/Game';

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
    const user = await this.repository.findOneOrFail(user_id, { relations: ["games"] });
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(`SELECT * FROM Users ORDER BY first_name `); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query('SELECT * FROM Users WHERE first_name ILIKE $1 AND last_name ILIKE $2', [first_name, last_name]); // Complete usando raw query
  }
}
