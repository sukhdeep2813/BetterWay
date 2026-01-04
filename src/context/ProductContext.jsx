import { createContext, useContext, useState, useMemo } from "react";
import { products as productData } from "../data/product";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    sort: "none",
  });

  const clearFilters = () => {
    setFilters({ search: "", category: "all", sort: "none" });
  };

  const filteredProducts = useMemo(() => {
    let list = [...productData];
    if (filters.search)
      list = list.filter((p) =>
        p.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    if (filters.category !== "all")
      list = list.filter((p) => p.category === filters.category);
    if (filters.sort === "low-high") list.sort((a, b) => a.price - b.price);
    if (filters.sort === "high-low") list.sort((a, b) => b.price - a.price);
    return list;
  }, [filters]);

  return (
    <ProductContext.Provider
      value={{ products: filteredProducts, filters, setFilters, clearFilters }}
    >
      {children}
    </ProductContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => useContext(ProductContext);
