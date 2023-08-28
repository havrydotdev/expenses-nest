import ResponseExpenseDto from 'src/expenses/dto/response-expense.dto';
import Expense from 'src/expenses/entities/expense.entity';

const fromExpenseToResponse = (exp: Expense): ResponseExpenseDto => {
  const { user, ...rest } = exp;
  return {
    ...rest,
    userId: user.id,
  };
};

export default fromExpenseToResponse;
