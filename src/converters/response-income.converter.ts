import IncomeDto from 'src/incomes/dto/income.dto';
import Income from 'src/incomes/entities/income.entity';

const fromIncomeToResponse = (exp: Income): IncomeDto => {
  const { user, ...rest } = exp;
  return {
    ...rest,
    userId: user.id,
  };
};

export default fromIncomeToResponse;
