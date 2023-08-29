import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { Request as ExpressReq } from 'express';
import CreateScheduleDto from 'src/schedules/dto/create-schedule.dto';
import ScheduleDto from 'src/schedules/dto/schedule.dto';
import { SchedulesService } from 'src/schedules/services/schedules/schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Request() req: ExpressReq,
    @Body() createDto: CreateScheduleDto,
  ): Promise<ScheduleDto> {
    return this.schedulesService.create(req.user.id, createDto);
  }
}
