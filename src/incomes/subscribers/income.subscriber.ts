import { UsersService } from 'src/users/service/users/users.service';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import Income from '../entities/income.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
@EventSubscriber()
export class IncomeSubscriber implements EntitySubscriberInterface {
  constructor(
    @InjectDataSource() readonly dataSource: DataSource,
    private usersService: UsersService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Income;
  }

  afterInsert(event: InsertEvent<Income>) {
    this.usersService.updateBalance(event.entity.user.id, {
      value: event.entity.value,
    });
  }
}
