import { UsersService } from 'src/users/service/users/users.service';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import Expense from '../entities/expense.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
@EventSubscriber()
export class ExpenseSubsctiber implements EntitySubscriberInterface {
  constructor(
    @InjectDataSource() readonly dataSource: DataSource,
    private usersService: UsersService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Expense;
  }

  async afterInsert(event: InsertEvent<Expense>) {
    await this.usersService.updateBalance(event.entity.user.id, {
      value: -event.entity.value,
    });
  }
}
