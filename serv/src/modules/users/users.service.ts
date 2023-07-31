import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';
import { Repository } from 'typeorm';
import { IUser } from "./users.interface";
import { use } from 'passport';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find();
      return users;
    } catch (e) {
      return e;
    }
  }

  async getOneUser(id: any): Promise<IUser> {
    try {
      const user = await this.usersRepository.findOneBy({id});
  
      let total = 0
      let rating = 0
      if (user.marks != null) {
        total = user.marks.length - 1

        const sum = user.marks.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0);

        rating = sum / total
      }

      return { user, rating, total };
    } catch (e) {
      console.log(e)
      return e;
    }
  }

  async removeUser(id: number): Promise<string> {
    try {
      await this.usersRepository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id })
        .execute();
      return 'User deletion completed successfully';
    } catch (e) {
      return e;
    }
  }

  async updateUser(data, id): Promise<string> {
    try {
      await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .where("id = :id", { id })
        .set(data)
        .execute();

      return "success";
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async addMarks(mark, id): Promise<string> {
    try {
      await this.usersRepository
        .createQueryBuilder()
        .update(User) 
        .where("id = :id", { id:id.id })
        .set({ marks: () => `CONCAT(marks, '${mark.mark},')` })
        .execute();
      return "success";
    } catch (e) {
      console.log(e)
      return e;
    }
  }
}
