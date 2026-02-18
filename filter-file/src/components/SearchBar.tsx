import type { Category } from "../types/product";

type Props = {
  filterText: string;
  category: Category;
  onFilterTextChange: (text: string) => void;
  onCategoryChange: (category: Category) => void;
};

export const SearchBar = ({ filterText, category, onFilterTextChange, onCategoryChange }: Props) => {
  return (
    <div style={{ background: "#f0f0f0", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
      <input 
      type="text"
      value={filterText}
      onChange={(e) => onFilterTextChange(e.target.value)}
      placeholder="商品名を検索..."
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      />
      <div>
        <label style={{ marginRight: "10px", fontWeight: "bold"  }}>カテゴリ:</label>
        <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as Category)}
          style={{ padding: "5px", fontSize: "16px" }}
        >
          <option value="すべて">すべて</option>
          <option value="野菜">野菜</option>
          <option value="果物">果物</option>
          <option value="肉">肉</option>
        </select>
      </div>
    </div>
  )
}
  