import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bid } from 'src/entities/bid.entity';
import { BidDto } from './dto/bid.dto';
import { Job } from '../../entities/job.entity';


@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private bidRepository: Repository<Bid>,

    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) { }

  async createBid(dto: BidDto, userId: number): Promise<Bid> {
    try {

      const futureBid = { ...dto, userId: userId };
      const job = await this.jobRepository.findOne({
        where: { id: dto.jobId },
      });
      if (job.status != 'notStarted')
        throw new HttpException(
          'This job has been already starting other user',
          HttpStatus.BAD_GATEWAY,
        );

      const bid = await this.bidRepository.save(futureBid);
      return bid;
    } catch (e) {
      console.log('++')
      console.log(e)
      return e;
    }
  }

  async getBidId(id: number): Promise<Bid> {
    try {
      const bid = await this.bidRepository.findOne({ where: { id } });
      return bid;
    } catch (e) {
      return e;
    }
  }

  async deleteBid(id: number): Promise<string> {
    try {
      const bid = await this.getBidId(id);
      if (!bid) {
        throw new HttpException('error, try again', HttpStatus.BAD_REQUEST);
      }
      await this.bidRepository
        .createQueryBuilder()
        .delete()
        .from(Bid)
        .where('id = :id', { id })
        .execute();
      return 'Success';
    } catch (e) {
      return e;
    }
  }

  async getCountBidUser(userId: number): Promise<number> {
    try {
      const bids = await this.jobRepository
        .createQueryBuilder('job')
        .where('job.userId = :userId', {
          userId: userId,
        })
        .leftJoinAndSelect('job.bids', 'Bid')
        .select('COUNT(Bid.id) AS count')
        .andWhere('Bid.id')
        .andWhere('Bid.isApproved = 0')
        .getRawMany();


      return bids[0].count;
    } catch (e) {
      return e;
    }
  }

  async getCountBid(jobId: number): Promise<number> {
    try {
      const bids = await this.bidRepository
        .createQueryBuilder('bid')
        .where('bid.jobId = :jobId', {
          jobId
        })
        .getCount();

      return bids;
    } catch (e) {
      return e;
    }
  }

  // берем роботи з ід юзера і  витаскує bid
  async getAllBids(userId: number, isApproved = 0): Promise<Bid[]> {
    try {
      const bids = await this.jobRepository
        .createQueryBuilder('job')
        .where('job.userId = :userId', {
          userId: userId,
        })
        .leftJoinAndSelect('job.bids', 'Bid')
        .leftJoinAndSelect('Bid.user', 'user')
        .andWhere('Bid.isApproved = :isApproved', { isApproved })
        // .andWhere('Bid.id')
        .andWhere('user.id = Bid.userId')
        .select(['Bid', 'user.firstName', 'user.email', 'user.phoneNumber'])
        .addSelect('COUNT(user.marks)', 'total')
        .addSelect('SUM(user.marks)/COUNT(user.marks)', 'rating')
        .groupBy('Bid.id')
        .getRawMany();

      return bids;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async approveBid(dto): Promise<string> {
    try {
      const { id, jobId } = dto;

      const job = await this.jobRepository
        .createQueryBuilder("job")
        .leftJoinAndSelect("job.tags", "Tags")
        .leftJoinAndSelect('job.bids', 'bid', 'bid.isApproved = 1')
        .where("job.id = :id", { id: jobId })
        .getOne();

      if (job.bids.length > 0) throw new HttpException('помилка, ця робота вже виконується іншим працівником', HttpStatus.BAD_REQUEST);
      console.log('-')

      await this.bidRepository
        .createQueryBuilder('bid')
        .update(Bid)
        .where('bid.id = :id', { id })
        .set({ isApproved: true })
        .execute();

      await this.jobRepository
        .createQueryBuilder('job')
        .update(Job)
        .where('job.id = :jobId', { jobId })
        .set({ status: 'atProcess' })
        .execute();

      return 'success';
    } catch (e) {
      console.log(e)
      throw new HttpException(e.message, e.status);
    }
  }
}
