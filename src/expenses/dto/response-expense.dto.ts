export default class ResponseExpenseDto {
  id: number;
  title: string;
  desc?: string;
  value: number;
  date: Date;
  userId: number;
}
