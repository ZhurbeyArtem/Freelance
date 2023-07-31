import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "src/entities/job.entity";
import { In, Repository } from "typeorm";
import { TagsService } from "../tags/tags.service";
import { UsersService } from "../users/users.service";
import { FileService } from "../../services/files/files.service";
import { PayService } from "src/services/pay/pay.service";
import { BidService } from "../bid/bid.service";

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private fileService: FileService,
    private tagsService: TagsService,
    private payService: PayService,
    private userService: UsersService,
    private bidService: BidService,
  ) { }

  async createJob(data): Promise<Job | string> {
    try {
      console.log(data);
      const application = await this.jobRepository.findOne({
        where: { title: data.title },
      });
      if (application) {
        throw new HttpException(
          "a job with the same title already exists",
          HttpStatus.BAD_REQUEST,
        );
      }

      data.tags = await this.tagsService.getTagsByName(data.tags);
      const fileName = await this.fileService.createFile(data.file);
      data.file = fileName;
      const job = await this.jobRepository.save(data);

      return job;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async getAllJobs(dto): Promise<[Job[], number]> {
    try {
      const page: number = dto.page || 1;
      const limit: number = dto.limit || 10;
      const offset: number = page * limit - limit;

      const jobsWithTags = await this.jobRepository
        .createQueryBuilder("job")
        .leftJoinAndSelect("job.tags", "tags")
        .take(limit)
        .skip(offset)
        .where("job.status = :status", { status: "notStarted" });

      if (dto.tags) {
        const name = dto.tags.split(",");
        jobsWithTags.andWhere("tags.name IN (:...name)", { name });
      }
      if (dto.tags) {
      }

      return jobsWithTags.getManyAndCount();
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async getAllJobsOwner(dto, userId): Promise<[Job[], number]> {
    try {
      const page: number = dto.page || 1;
      const limit: number = dto.limit || 10;
      const offset: number = page * limit - limit;
      const { status = "notStarted" } = dto;

      const jobsWithTags = await this.jobRepository
        .createQueryBuilder("job")
        .leftJoinAndSelect("job.tags", "Tags")
        .take(limit)
        .skip(offset)
        .where("job.status = :status", { status })
        .andWhere("job.userId = :userId", { userId })
        .getManyAndCount();

      return jobsWithTags;
    } catch (e) {
      console.log(e);
      return e;
    }
  }


  async getAllJobsFreelancer(dto, userId): Promise<[Job[], number]> {
    try {
      const page: number = dto.page || 1;
      const limit: number = dto.limit || 10;
      const offset: number = page * limit - limit;
      const { status = "atProcess" } = dto;

      const jobs = await this.jobRepository
        .createQueryBuilder("job")
        .leftJoin("job.bids", "bids")
        .take(limit)
        .skip(offset)
        .where("bids.userId = :userId", { userId })
        .andWhere("bids.isApproved = :isApproved", { isApproved: 1 })
        .andWhere('job.status = :status', { status })
        .getManyAndCount();

      return jobs;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async getJobById(id: number): Promise<Job> {
    try {
      return await this.jobRepository
        .createQueryBuilder("job")
        .leftJoinAndSelect("job.tags", "Tags")
        .leftJoinAndSelect('job.bids', 'bid', 'bid.isApproved = 1')
        .where("job.id = :id", { id: id })
        .getOne();
    } catch (e) {
      return e;
    }
  }

  async getJobByTitle(title): Promise<Job> {
    try {
      return await this.jobRepository
        .createQueryBuilder("job")
        .where("job.title = :title", { title: title.title })
        .leftJoinAndSelect("job.tags", "Tags")
        .getOne();
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async approveJobOwner(id, userId): Promise<string> {
    try {
      await this.jobRepository
        .createQueryBuilder("job")
        .update(Job)
        .where("job.id = :id", { id })
        .andWhere("job.userId = :userId", { userId })
        .set({ ownerConfirm: true })
        .execute();
      this.checkStatus(id);
      return "success";
    } catch (e) {

      throw new HttpException(
        "Oops, something happen wrong try later",
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async approveJobFreelancer(id, userId): Promise<string> {
    try {
      const job = await this.jobRepository
        .createQueryBuilder("job")
        .where("job.id = :id", { id })
        .leftJoinAndSelect("job.bids", "bids")
        .where("bids.isApproved = :isApproved", { isApproved: true })
        .getOne();

      if (job.bids[0].userId != userId) throw new Error();

      await this.jobRepository
        .createQueryBuilder("job")
        .update(Job)
        .where("job.id = :id", { id })
        .set({ freelancerConfirm: true })
        .execute();

      this.checkStatus(id);
      return "success";
    } catch (e) {
      console.log(e)
      throw new HttpException(
        "Oops, something happen wrong try later",
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async checkStatus(id) {
    const job = await this.jobRepository
      .createQueryBuilder("job")
      .where("job.id = :id", { id })
      .getOne();

    if (job.ownerConfirm == true && job.freelancerConfirm == true) {
      await this.jobRepository
        .createQueryBuilder("job")
        .update(Job)
        .where("job.id = :id", { id })
        .set({ status: "finished" })
        .execute();
    }
  }

  async payJob(id): Promise<object> {
    try {
      const job = await this.jobRepository
        .createQueryBuilder("job")
        .where("job.id = :id", { id })
        .leftJoinAndSelect("job.bids", "bids")
        .where("bids.isApproved = :isApproved", { isApproved: true })
        .getOne();

      const userId = job.bids[0].userId;

      const { user } = await this.userService.getOneUser(userId);

      return await this.payService.generateQr(user.cardNumber);
    } catch (e) {
      
      return e;
    }
  }

  async sendFile(id, file): Promise<string> {
    try {
      const fileName = await this.fileService.createFile(file);

      await this.jobRepository
        .createQueryBuilder("job")
        .update(Job)
        .where("job.id = :id", { id })
        .set({ fileFreelancer: fileName })
        .execute();

      return "success";
    } catch (e) {
      return e;
    }
  }

  // async getApprovedJobs(id): Promise<Job[]> {
  //   try {
  //     const bids: any = await this.bidService.getAllBids(id, 1);
  //     const jobsId = [];
  //     await bids.forEach((e) => {
  //       jobsId.push(e.Bid_jobId);
  //     });

  //     const jobs = await this.jobRepository.find({ where: { id: In(jobsId) } });
  //     return jobs;
  //   } catch (e) {
  //     return e;
  //   }
  // }
}
