export type Transaction = {
  id: number;
  date: string;
  content: string;
  amount: number;
  type: 'income' | 'expense';
};