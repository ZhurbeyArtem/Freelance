import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Bid } from 'src/entities/bid.entity';
import { BidService } from './bid.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { BidDto } from './dto/bid.dto';
import { approveBidDto } from './dto/aprove.dto';

@ApiTags('Bid')
@Controller('bid')
export class BidController {
  constructor(private bidService: BidService) { }

  @ApiOperation({ summary: 'Getting all bids' })
  @ApiResponse({ status: 200, type: [Bid] })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAll(@Req() req, @Query() status): Promise<Bid[]> {
    return this.bidService.getAllBids(req.user.id, status);
  }

  @ApiOperation({ summary: 'Getting all bids with checked false' })
  @ApiResponse({ status: 200, type: [Bid] })
  @UseGuards(JwtAuthGuard)
  @Get('/countBids/user')
  countBidsUser(@Req() req): Promise<number> {
    return this.bidService.getCountBidUser(req.user.id);
  }

  @ApiOperation({ summary: 'Getting all bids with checked false' })
  @ApiResponse({ status: 200, type: [Bid] })
  @Get('/countBids/job/:id')
  countBids(@Param('id', ParseIntPipe) jobId: number): Promise<number> {
    return this.bidService.getCountBid(jobId);
  }

  @ApiOperation({ summary: 'Create new bid ' })
  @ApiResponse({ status: 200, type: [Bid] })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: BidDto, @Req() req): Promise<Bid | string> {
    return this.bidService.createBid(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Delete  bid ' })
  @ApiResponse({ status: 200, type: [Bid] })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delBid(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.bidService.deleteBid(id);
  }

  @ApiOperation({ summary: 'Delete  bid ' })
  @ApiResponse({ status: 200, type: [Bid] })
  @UseGuards(JwtAuthGuard)
  @Patch('/approve')
  approve(@Body() dto: approveBidDto): Promise<string> {
    return this.bidService.approveBid(dto);
  }
}
