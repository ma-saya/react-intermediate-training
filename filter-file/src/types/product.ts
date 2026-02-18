export type Category = "すべて" | "野菜" | "果物" | "肉";

export type Product = {
  id: number;
  name: string;
  category: Category;
  price: number;
};

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "🍎 りんご", category: "果物", price: 150 },
  { id: 2, name: "🍌 バナナ", category: "果物", price: 100 },
  { id: 3, name: "🥕 にんじん", category: "野菜", price: 50 },
  { id: 4, name: "🥬 キャベツ", category: "野菜", price: 200 },
  { id: 5, name: "🥩 牛肉", category: "肉", price: 1000 },
  { id: 6, name: "🍗 鶏肉", category: "肉", price: 500 },
  { id: 7, name: "🍇 ぶどう", category: "果物", price: 400 },
  { id: 8, name: "🧅 玉ねぎ", category: "野菜", price: 80 },
  { id: 9, name: "🥓 豚肉", category: "肉", price: 700 },
  { id: 10, name: "🍅 トマト", category: "野菜", price: 120 },
];