import { useProducts } from "../context/ProductContext";

export default function FiltersBar() {
  const { filters, setFilters, clearFilters } = useProducts();

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center border border-gray-200">
      <input
        name="search"
        placeholder="Search..."
        value={filters.search}
        onChange={handleChange}
        className="border p-2 rounded flex-1 min-w-[200px]"
      />
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="all">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Home">Home</option>
      </select>
      <select
        name="sort"
        value={filters.sort}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="none">Sort By</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
      </select>
      <button
        onClick={clearFilters}
        className="text-red-500 hover:underline text-sm font-medium"
      >
        Clear Filters
      </button>
    </div>
  );
}
