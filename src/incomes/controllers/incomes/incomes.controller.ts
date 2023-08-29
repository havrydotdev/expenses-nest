import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import IncomeDto from 'src/incomes/dto/income.dto';
import { IncomesService } from 'src/incomes/services/incomes/incomes.service';
import { Request as ExpressReq } from 'express';
import { CreateExpenseDto } from 'src/expenses/dto/create-expense.dto';
import fromIncomeToResponse from 'src/converters/response-income.converter';

@Controller('incomes')
export class IncomesController {
  constructor(private incomesService: IncomesService) {}

  @Get()
  async findAll(@Request() req: ExpressReq): Promise<IncomeDto[]> {
    const incomes = await this.incomesService.findAll(req.user.id);
    return incomes.map((exp) => fromIncomeToResponse(exp));
  }

  @Post()
  async create(
    @Request() req: ExpressReq,
    @Body() createDto: CreateExpenseDto,
  ): Promise<IncomeDto[]> {
    createDto.userId = req.user.id;
    const incomes = await this.incomesService.create([createDto]);
    return incomes;
  }

  @Get(':id')
  async findOneById(
    @Request() req: ExpressReq,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IncomeDto> {
    const income = await this.incomesService.findOneById(req.user.id, id);
    return fromIncomeToResponse(income);
  }
}
