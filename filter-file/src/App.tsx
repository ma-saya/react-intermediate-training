import { useState } from 'react';
import type { Category } from './types/product';
import { MOCK_PRODUCTS } from './types/product';
import { SearchBar } from './components/SearchBar';
import { ProductTable } from './components/ProductTable';

export default function App() {
  const [filterText, setFilterText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("すべて");

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const isCategoryMatch =
      selectedCategory === "すべて" || product.category === selectedCategory;;

    const isTextMatch =
      product.name.includes(filterText);
    return isCategoryMatch && isTextMatch;
  });
  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <h1>商品検索システム</h1>
      <SearchBar
        filterText={filterText}
        category={selectedCategory}
        onFilterTextChange={setFilterText}
        onCategoryChange={setSelectedCategory}
      />
      <ProductTable products={filteredProducts} />
    </div>
  )
}