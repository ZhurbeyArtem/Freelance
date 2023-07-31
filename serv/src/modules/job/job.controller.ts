import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { JobService } from "./job.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Job } from "../../entities/job.entity";
import { JobDto, PaginationWithStatus, PaginationWithTags } from "./dto/job.dto";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";


@ApiTags("Jobs")
@Controller("jobs")
export class JobController {
  constructor(private jobService: JobService) { }

  @ApiOperation({ summary: "Create new job post" })
  @ApiResponse({ status: 200, type: [Job] })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  create(
    @Body() dto: JobDto,
    @Req() req,
    @UploadedFile() file,
  ): Promise<Job | string> {
    console.log(dto);
    const data = { ...dto, userId: req.user.id, file: file };
    return this.jobService.createJob(data);
  }

  @ApiOperation({ summary: "Getting all jobs" })
  @ApiResponse({ status: 200, type: [Job] })
  @Get("/getAll")
  getAll(@Query() dto: PaginationWithTags): Promise<[Job[], number]> {
    return this.jobService.getAllJobs(dto);
  }



  @ApiOperation({ summary: "Getting all jobs" })
  @ApiResponse({ status: 200, type: [Job] })
  @UseGuards(JwtAuthGuard)
  @Get("/getOwner")
  getAllOwner(
    @Query() dto: PaginationWithStatus,
    @Req() req,
  ): Promise<[Job[], number]> {
    return this.jobService.getAllJobsOwner(dto, req.user.id);
  }

  @ApiOperation({ summary: "Getting all jobs" })
  @ApiResponse({ status: 200, type: [Job] })
  @UseGuards(JwtAuthGuard)
  @Get("/getFreelancer")
  getAllFreelancer(
    @Query() dto: PaginationWithStatus,
    @Req() req,
  ): Promise<[Job[], number]> {
    return this.jobService.getAllJobsFreelancer(dto, req.user.id);
  }

  @ApiOperation({ summary: "Getting a job by id" })
  @ApiResponse({ status: 200, type: Job })
  @Get("/title")
  getOneByTitle(@Query() title: string): Promise<Job> {
    return this.jobService.getJobByTitle(title);
  }

  @ApiOperation({ summary: "Getting a job by id" })
  @ApiResponse({ status: 200, type: Job })
  @Get(":id")
  getOneById(@Param("id", ParseIntPipe) id: number): Promise<Job> {
    return this.jobService.getJobById(id);
  }

  @ApiOperation({ summary: "Owner approve job" })
  @ApiResponse({ status: 200, type: Job })
  @UseGuards(JwtAuthGuard)
  @Patch("/owner/:id")
  approveOwner(
    @Param("id", ParseIntPipe) id: number,
    @Req() req,
  ): Promise<string> {
    return this.jobService.approveJobOwner(id, req.user.id);
  }

  @ApiOperation({ summary: "Freelancer approve job" })
  @ApiResponse({ status: 200, type: Job })
  @UseGuards(JwtAuthGuard)
  @Patch("/freelancer/:id")
  approveFreelancer(
    @Param("id", ParseIntPipe) id: number,
    @Req() req,
  ): Promise<string> {
    return this.jobService.approveJobFreelancer(id, req.user.id);
  }

  @ApiOperation({ summary: "generate QR" })
  @ApiResponse({ status: 200, type: Job })
  @UseGuards(JwtAuthGuard)
  @Get("/pay/:id")
  payForJob(@Param("id", ParseIntPipe) id: number): Promise<object> {
    return this.jobService.payJob(id);
  }

  @ApiOperation({ summary: "Employer approve job" })
  @ApiResponse({ status: 200, type: Job })
  @UseGuards(JwtAuthGuard)
  @Patch("/sendFile/:id")
  @UseInterceptors(FileInterceptor("file"))
  sendFile(
    @Param("id", ParseIntPipe) id: number,
    @UploadedFile() file,
  ): Promise<string> {
    return this.jobService.sendFile(id, file);
  }
}
