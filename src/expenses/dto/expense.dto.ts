export default class ExpenseDto {
  id: number;
  title: string;
  desc?: string;
  value: number;
  date: Date;
  userId: number;
}
