import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import ResponseExpenseDto from 'src/expenses/dto/response-expense.dto';
import { ExpensesService } from 'src/expenses/services/expenses/expenses.service';
import { Request as ExpressReq } from 'express';
import fromExpenseToResponse from 'src/converters/response-expense.converter';
import { CreateExpenseDto } from 'src/expenses/dto/create-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get()
  async findAll(@Request() req: ExpressReq): Promise<ResponseExpenseDto[]> {
    const expenses = await this.expensesService.findAll(req.user.id);
    return expenses.map((exp) => fromExpenseToResponse(exp));
  }

  @Post()
  async create(
    @Request() req: ExpressReq,
    @Body() createDto: CreateExpenseDto,
  ): Promise<ResponseExpenseDto> {
    const expense = await this.expensesService.create(req.user.id, createDto);
    return fromExpenseToResponse(expense);
  }

  @Get(':id')
  async findOneById(
    @Request() req: ExpressReq,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseExpenseDto> {
    const expense = await this.expensesService.findOneById(req.user.id, id);
    return fromExpenseToResponse(expense);
  }
}
