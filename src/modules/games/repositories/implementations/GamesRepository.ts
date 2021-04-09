import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);

  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("game")
      .where("game.title ilike :title", { title: `%${param}%` })
      .getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const count = await this.repository
      .query('SELECT COUNT(*) FROM Games') // Complete usando raw query

    return count;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = await this.repository
      .createQueryBuilder("Game")
      .select("users.email", "email")
      .addSelect("users.first_name", "first_name")
      .addSelect("users.last_name", "last_name")
      .innerJoinAndSelect("Game.users", "users")
      .where("Game.id = :id", { id: id })
      .getRawMany();
    return users;
    // Complete usando query builder
  }
}
