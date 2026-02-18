import type { Product } from "../types/product";

type Props = {
  products: Product[];
};

export const ProductTable = ({ products }: Props) => {
  if (products.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        該当する商品がありません
      </p>
    );
  }
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#eee", textAlign: "left" }}>
          <th style={{padding: "10px"}}>商品名</th>
          <th style={{padding: "10px"}}>価格</th>
          <th style={{padding: "10px"}}>カテゴリ</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "10px" }}>{product.name}</td>
            <td style={{ padding: "10px" }}>
              <span style={{
                padding: "4px 8px", 
                borderRadius: "4px", 
                fontSize: "12px",
                background: product.category === "野菜" ? "#e8f5e9" : 
                            product.category === "肉" ? "#ffebee" : "#fff3e0",
                color: "#333"
              }}>
                {product.category}
              </span>
            </td>
            <td style={{ padding: "10px" }}>{product.price}円</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
